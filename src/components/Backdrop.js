import React from 'react'
import './Backdrop.css';
import logo from '../assets/pokelogo.png';
import psyduck from '../assets/psyduck.png';

import DifficultyForm from './DifficultyForm';

const Backdrop = (props) => {
  return <div className='backdrop'>
    <img className="backdrop-logo" src={logo} />
    <img className="psyduck" src={psyduck} />
    <h1 className="memorylogo">Memory</h1>
    <DifficultyForm onStart={props.onStart} getDifficulty={props.getDifficulty}/>
  </div>
}

export default Backdrop
