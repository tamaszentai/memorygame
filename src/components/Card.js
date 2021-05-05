import React from 'react'

import './Card.css'
import PokeLogo from '../assets/pokelogo.png'
import GottaLogo from '../assets/gotta.png'

const Card = (props) => {
  const clickHandler = () => {
    if (props.runGame) {
      if (props.clickable) {
        if (!props.flipped && !props.solved) {
          props.onPick(props.index)
        }
      }
    }
  }

  return (
    <div className='scene'>
      <div
        className={props.flipped || props.solved ? 'card is-flipped' : 'card'}
        onClick={clickHandler}
      >
        <div className='card__face card__face--front'>
          <img src={props.url} alt='card front'/>
        </div>
        <div className='card__face card__face--back'>
          <div className='card__face--back-img-container'>
            <img src={PokeLogo} alt='Pokemon logo'/>
            <img src={GottaLogo} alt='Gotta catchem all'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
