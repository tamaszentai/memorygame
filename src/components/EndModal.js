import React from 'react'

import './EndModal.css'

const EndModal = (props) => {
 const endGameCondition = () => {
    if (props.success) return (
      <div className='win'>
      <h1>Congratulations!</h1>
      <h2>
        You finished in <p>{props.time - props.timer}</p> seconds with{' '}
        <p>{props.rounds} </p>rounds!
      </h2>
    </div>
    )
    if (!props.success) return (
      <div className='lose'>
      <h1>You ran out of time!</h1>
      <h2>
       Better luck next time!
      </h2>
    </div>
    )
 } 
  return (
    <div className={props.endGame ? 'endmodal show' : 'endmodal'}>
     {endGameCondition()}
      <button
        className='newgame-endgame-button'
        onClick={props.endGame ? props.newGameHandler : null}
      >
        New Game
      </button>
    </div>
  )
}

export default EndModal
