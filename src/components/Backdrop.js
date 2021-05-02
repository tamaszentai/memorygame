import React from 'react'

import './Backdrop.css';

const Backdrop = (props) => {
  return <div className='backdrop'>
    <button onClick={props.onShow}>PLAY GAME</button>
  </div>
}

export default Backdrop
