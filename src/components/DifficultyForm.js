import React from 'react'

import './DifficultyForm.css'

const DifficultyForm = (props) => {

  const onSelectedHandler = (event) => {
    props.getDifficulty(event.target.value)
  }

  const submitFormHandler = (event) => {
    event.preventDefault()
    props.onStart()
  }

  return (
    <div className='starting-page'>
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

export default DifficultyForm
