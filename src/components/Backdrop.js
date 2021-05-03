import React from 'react'
import './Backdrop.css';

import Win from './Win';

const Backdrop = (props) => {
  return <div className='backdrop'>
    {props.win ? <Win /> : <button onClick={props.onShow}>PLAY GAME</button>}
  </div>
}

export default Backdrop
