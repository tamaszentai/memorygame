import React, { useState, useEffect } from 'react'

import Image from './components/Image';
import './App.css'

function App() {
  const [allPokemon, setAllPokemon] = useState([])
  const [doubledArray, setDoubledArray] = useState([])
  const [picked, setPicked] = useState([])
  const [matchedCard, setMatchedCard] = useState([])

  const numberGenerator = () => Math.ceil(Math.random() * 600)
  const shuffler = (array) => (array.sort(() => Math.random() - 0.5));

  useEffect(() => {
    const pokemonArray = []
    for (let i = 1; i <= 8; i++) {
      const helper = numberGenerator()
      const object = {
        type: helper,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${helper}.png`
      }
      pokemonArray.push(object)
    }
    setAllPokemon(pokemonArray)
    setDoubledArray([
      ...shuffler(pokemonArray),
      ...shuffler(pokemonArray),
    ])
  }, [])

  const pickCard = (index) => {
    setPicked((picked) => [...picked, index])
  }

  const isMatch = () => {
    if (doubledArray[picked[0]].type === doubledArray[picked[1]].type) {
      setMatchedCard([...matchedCard,picked[0], picked[1]])
      setTimeout(() => setPicked([]), 600)
    } else {
      setTimeout(() => setPicked([]), 600)
    }
  }

  useEffect(() => {
    if (picked.length === 2) isMatch();
  }, [picked])
  
    

  return (
    <div className='App'>
      <div className='container'>
        {doubledArray.map((data, index) => {
          return (
            <Image key={index} url={data.url} flipped={picked.includes(index)} solved={matchedCard.includes(index)} index={index} onPick={pickCard}/>
          )
        })}
      </div>
    </div>
  )
}

export default App
