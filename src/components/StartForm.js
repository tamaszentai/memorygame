import React from 'react'

import './StartForm.css'
import logo from '../assets/pokelogo.png';
import psyduck from '../assets/psyduck.png';

const StartForm = (props) => {

  const onSelectedHandler = (event) => {
    props.getDifficulty(event.target.value)
  }

  const submitFormHandler = (event) => {
    event.preventDefault()
    props.onStart()
  }

  return (
    <div className='startform'>
      <img className="start-logo" src={logo} alt="Pokemon logo"/>
    <img className="psyduck" src={psyduck} alt="Psyduck" />
    <h1 className="memorylogo">Memory</h1>
      <form onSubmit={submitFormHandler}>
        <select
          name='game-mode'
          id='game-mode'
          onChange={onSelectedHandler}
          required
        >
          <option value='' selected disabled hidden>
            Choose Difficulty
          </option>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
        <button className='startgame-button'>Start Game</button>
      </form>
    </div>
  )
}

export default StartForm
