import React from 'react'

import './Card.css'
import PokeLogo from '../assets/pokelogo.png'
import GottaLogo from '../assets/gotta.png'

const Card = (props) => {
  return (
    <div className='scene'>
      <div
        className={props.flipped || props.solved ? 'card is-flipped' : 'card'}
        onClick={ props.runGame && (props.clickable ? props.flipped || props.solved ? null : () => props.onPick(props.index) : null)}
      >
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
