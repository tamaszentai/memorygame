import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'

import './App.css'

import StartForm from './components/StartForm'
import EndModal from './components/EndModal'
import Card from './components/Card'
import theme from './assets/pokemontheme.mp3'
import pick from './assets/pick.mp3'
import matched from './assets/matched.mp3'
import victory from './assets/victory.mp3'
import lose from './assets/lose.mp3'

function App() {
  const [difficulty, setDifficulty] = useState()
  const [showStartForm, setShowStartForm] = useState(true)
  const [requiredTime, setRequiredTime] = useState()
  const [requiredCards, setRequiredCards] = useState()
  const [runGame, setRungame] = useState(false)
  const [allPokemon, setAllPokemon] = useState([])
  const [doubledArray, setDoubledArray] = useState([])
  const [picked, setPicked] = useState([])
  const [clickable, setClickable] = useState(true)
  const [matchedCard, setMatchedCard] = useState([])
  const [endGame, setEndGame] = useState(false)
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
    setDifficulty(difficulty)
  }

  useEffect(() => {
    switch (difficulty) {
      case 'easy':
        setRequiredTime(60)
        setRequiredCards(8)
        break
      case 'medium':
        setRequiredTime(120)
        setRequiredCards(18)
        break
      case 'hard':
        setRequiredTime(100)
        setRequiredCards(18)
        break
      default:
        setRequiredTime(60)
        setRequiredCards(8)
    }
  }, [difficulty])

  useEffect(() => {
    const pokemonArray = []
    for (let i = 1; i <= requiredCards; i++) {
      const helper = numberGenerator()
      const object = {
        type: helper,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${helper}.png`,
      }
      pokemonArray.push(object)
    }
    setAllPokemon(pokemonArray)
    setDoubledArray([...shuffler(pokemonArray), ...shuffler(pokemonArray)])
    setTimer(requiredTime)
    // console.log(chosenDifficulty, timerForDifficulty)
  }, [requiredCards])

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
      setTimeout(() => playMatched(), 400)
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
    setShowStartForm(false)
    setRungame(true)
  }

  useEffect(() => {
    if (runGame === true) playTheme()
  }, [runGame])

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000)
  }, [runGame && timer])

  useEffect(() => {
    setRungame(false)
    if (matchedCard.length === requiredCards * 2) {
      setTimeout(() => {
        stop()
        playVictory()
        setEndGame(true)
      }, 600)
    }
  }, [matchedCard.length === requiredCards * 2])

  useEffect(() => {
    if (timer === 0) {
      setTimeout(() => {
        setEndGame(true)
        setRungame(false)
        stop()
        playLose()
      }, 600)
    }
  }, [timer === 0])

  const newGameHandler = () => {
    setDifficulty()
    setShowStartForm(true)
    setRungame(false)
    setEndGame(false)
    setRequiredCards(8)
    setMatchedCard([])
    setRequiredTime(60)
    setPicked([])
    setTimer(60)
    setRounds(0)
    stop()
  }

  return (
    <>
      <div className='App'>
        <EndModal
          newGameHandler={newGameHandler}
          endGame={endGame}
          timer={timer}
          rounds={rounds}
        />
        {showStartForm && (
          <StartForm
            runGame={runGame}
            onStart={startGameHandler}
            win={win}
            getDifficulty={getDifficulty}
          />
        )}
        <div className='stats'>
          <h1 className='round'>Rounds: {rounds} </h1>
          <div className='spacer'></div>
          <h1 className='timer'>Time: {timer} </h1>
        </div>
        <div className='container'>
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
      </div>
    </>
  )
}

export default App
