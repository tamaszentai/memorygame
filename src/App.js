import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'

import Backdrop from './components/Backdrop'
import Card from './components/Card'
import './App.css'
import theme from './assets/pokemontheme.mp3'
import pick from './assets/pick.mp3'
import matched from './assets/matched.mp3'
import victory from './assets/victory.mp3'
import lose from './assets/lose.mp3'

function App() {
  const [showBackdrop, setShowBackdrop] = useState(true)
  const [chosenDifficulty, setChosenDifficulty] = useState()
  const [timerForDifficulty, setTimerForDifficulty] = useState()
  const [runGame, setRungame] = useState(false)
  const [allPokemon, setAllPokemon] = useState([])
  const [doubledArray, setDoubledArray] = useState([])
  const [picked, setPicked] = useState([])
  const [clickable, setClickable] = useState(true)
  const [matchedCard, setMatchedCard] = useState([])
  const [win, setWin] = useState(false)
  const [playTheme, { stop }] = useSound(theme)
  const [playPick] = useSound(pick)
  const [playMatched] = useSound(matched)
  const [playVictory] = useSound(victory)
  const [playLose] = useSound(lose)
  const [rounds, setRounds] = useState(0)
  const [timer, setTimer] = useState()

  const numberGenerator = () => Math.ceil(Math.random() * 600)
  const shuffler = (array) => array.sort(() => Math.random() - 0.5)

  const getDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        setChosenDifficulty(8)
        setTimerForDifficulty(60)
        break
      case 'medium':
        setChosenDifficulty(18)
        setTimerForDifficulty(120)
        break
      case 'hard':
        setChosenDifficulty(18)
        setTimerForDifficulty(90)
        break
      default:
        setChosenDifficulty(8)
        setTimerForDifficulty(60)
        break
    }
  }

  useEffect(() => {
    const pokemonArray = []
    for (let i = 1; i <= chosenDifficulty; i++) {
      const helper = numberGenerator()
      const object = {
        type: helper,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${helper}.png`,
      }
      pokemonArray.push(object)
    }
    setAllPokemon(pokemonArray)
    setDoubledArray([...shuffler(pokemonArray), ...shuffler(pokemonArray)])
    setTimer(timerForDifficulty)
    console.log(chosenDifficulty, timerForDifficulty)
  }, [chosenDifficulty])

  const pickCard = (index) => {
    playPick()
    setPicked((picked) => [...picked, index])
    if (picked.length === 1) setClickable(false)
  }

  const unlockAndClearPicked = (emptyPickedTimer, clickableTimer) => {
    setTimeout(() => setPicked([]), emptyPickedTimer)
    setTimeout(() => setClickable(true), clickableTimer)
  }

  const isMatch = () => {
    if (doubledArray[picked[0]].type === doubledArray[picked[1]].type) {
      setMatchedCard([...matchedCard, picked[0], picked[1]])
      unlockAndClearPicked(600, 400)
    } else {
      unlockAndClearPicked(600, 600)
    }
  }

  useEffect(() => {
    if (picked.length === 2) {
      isMatch()
      setTimeout(() => setRounds(rounds + 1), 500)
    }
  }, [picked])

  const startGameHandler = () => {
    setShowBackdrop(false)
    setRungame(true)
  }

  useEffect(() => {
    if (runGame === true) playTheme()
  }, [runGame])

  useEffect(() => {
    setTimeout(() => playMatched(), 400)
  }, [matchedCard])

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000)
  }, [runGame && timer])

  useEffect(() => {
    setRungame(false)
    if (matchedCard.length === chosenDifficulty * 2) {
      setTimeout(() => {
        stop()
        playVictory()
        console.log(`Time: ${timer - 1}, Rounds: ${rounds + 1}`)
      }, 600)
    }
  }, [matchedCard.length === chosenDifficulty * 2])

  useEffect(() => {
    if (timer === 0) {
      setTimeout(() => {
        setRungame(false)
        stop()
        playLose()
      }, 600)
    }
  }, [timer === 0])

  return (
    <>
    <div className='App'>
      {showBackdrop && (
        <Backdrop
          onStart={startGameHandler}
          win={win}
          getDifficulty={getDifficulty}
        />
      )}
      <div className="stats">
      <h1 className="round">Rounds: {rounds} </h1>
      <div className="spacer"></div>
      <h1 className="timer">Remaining time: {timer} </h1>
      </div>
      <div className="container">
        {doubledArray.map((data, index) => {
          return (
            <Card
              key={index}
              url={data.url}
              flipped={picked.includes(index)}
              clickable={clickable}
              solved={matchedCard.includes(index)}
              index={index}
              onPick={pickCard}
              runGame={runGame}
            />
          )
        })}
        </div>
        <button className="newgame-button">New Game</button>
      </div>
      </>
  )
}

export default App
