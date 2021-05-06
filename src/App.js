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
  const [requiredCards, setRequiredCards] = useState()
  const [time, setTime] = useState()
  const [runGame, setRungame] = useState(false)
  const [success, setSuccess] = useState()
  const [allPokemon, setAllPokemon] = useState([])
  const [picked, setPicked] = useState([])
  const [clickable, setClickable] = useState(true)
  const [matchedCard, setMatchedCard] = useState([])
  const [endGame, setEndGame] = useState(false)
  const [rounds, setRounds] = useState(0)
  const [timer, setTimer] = useState()
  const [playTheme, { stop }] = useSound(theme, {volume: 0.25})
  const [playPick] = useSound(pick, {volume: 0.30})
  const [playMatched] = useSound(matched, {volume: 0.30})
  const [playVictory] = useSound(victory, {volume: 0.25})
  const [playLose] = useSound(lose, {volume: 0.25})

  const numberGenerator = () => Math.ceil(Math.random() * 600)
  const shuffler = (array) => array.sort(() => Math.random() - 0.5)

  const getDifficulty = (difficulty) => {
    setDifficulty(difficulty)
  }

  useEffect(() => {
    switch (difficulty) {
      case 'easy':
        setTimer(60)
        setRequiredCards(8)
        setTime(60)
        break
      case 'medium':
        setTimer(140)
        setRequiredCards(18)
        setTime(140)
        break
      case 'hard':
        setTimer(110)
        setRequiredCards(18)
        setTime(110)
        break
      // default:
      //   setRequiredTime(60)
      //   setRequiredCards(8)
      //   break;
    }
  }, [difficulty])

  useEffect(() => {
    let pokemonArray = []
    for (let i = 1; i <= requiredCards; i++) {
      const helper = numberGenerator()
      const object = {
        type: helper,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${helper}.png`,
      }
      pokemonArray.push(object)
    }
    pokemonArray = [...pokemonArray, ...pokemonArray]
    setAllPokemon(shuffler(pokemonArray))
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
    if (allPokemon[picked[0]].type === allPokemon[picked[1]].type) {
      setMatchedCard([...matchedCard, picked[0], picked[1]])
      setTimeout(() => playMatched(), 400)
      unlockAndClearPicked(600, 600)
    } else {
      unlockAndClearPicked(600, 800)
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
    if (matchedCard.length === requiredCards * 2) {
      setRungame(false)
      setSuccess(true)
      setTimeout(() => {
        stop()
        playVictory()
        setEndGame(true)
      }, 600)
    }
  }, [matchedCard.length === requiredCards * 2])

  useEffect(() => {
    if (timer === 0 && matchedCard.length !== requiredCards * 2) {
      setTimeout(() => {
        setSuccess(false)
        setEndGame(true)
        setRungame(false)
        stop()
        playLose()
      }, 600)
    }
  }, [timer === 0])

  const newGameHandler = () => {
    setDifficulty()
    setAllPokemon([])
    setShowStartForm(true)
    setRungame(false)
    setEndGame(false)
    setRequiredCards()
    setPicked([])
    setMatchedCard([])
    setTimer()
    setRounds(0)
    setClickable(true)
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
          time={time}
          success={success}
        />
        {showStartForm && (
          <StartForm
            runGame={runGame}
            onStart={startGameHandler}
            getDifficulty={getDifficulty}
          />
        )}
        <div className='stats'>
          <h1 className='round'>Rounds: {rounds} </h1>
          <div className='spacer'></div>
          <h1 className='timer'>Time: {timer} </h1>
        </div>
        <div className={requiredCards === 8 ? 'container-easy' : 'container'}>
          {allPokemon.map((data, index) => {
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
                requiredCards={requiredCards}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
