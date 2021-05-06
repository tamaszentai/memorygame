import React from 'react'

import './EndModal.css';

const EndModal = (props) => {
  return (
    <div className={props.endGame ? "endmodal show" : "endmodal"}>
      <h1>Congratulations!</h1>
      <h2>You finished in <p>{props.time - props.timer}</p> seconds with <p>{props.rounds} </p>rounds!</h2>
      <button className='newgame-endgame-button' onClick={props.endGame ? props.newGameHandler : null}>New Game</button>
    </div>
  )
}

export default EndModal
