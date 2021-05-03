import React, { useState, useEffect } from 'react'

import './Card.css'
import PokeLogo from '../assets/pokelogo.png';
import GottaLogo from '../assets/gotta.png';

const Card = (props) => {
  
  return (
    <div className='scene'>
      <div className={props.flipped || props.solved ? 'card' : 'card is-flipped'} onClick={props.clickable ? (props.flipped ? null : () => props.onPick(props.index)) : null}>
        <div className='card__face card__face--front'>
          <img src={props.url} />
        </div>
        <div className='card__face card__face--back'>
          <div className='card__face--back-img-container'>
          <img src={PokeLogo} />
          <img src={GottaLogo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
