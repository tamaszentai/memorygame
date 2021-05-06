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
    <div className={props.requiredCards === 8 ? 'sceneeasy' : 'scene'}>
      <div
        className={props.flipped || props.solved ? 'card' : 'card is-flipped' }
        onClick={clickHandler}
      >
        <div className={props.requiredCards === 8 ? 'card__face card__face--fronteasy' : 'card__face card__face--front'}>
          <img src={props.url} alt='card front'/>
        </div>
        <div className={props.requiredCards === 8 ? 'card__face card__face--backeasy' : 'card__face card__face--back'}>
          <div className={props.requiredCards === 8 ? 'card__face--back-img-containereasy' : 'card__face--back-img-container'}>
            <img src={PokeLogo} alt='Pokemon logo'/>
            <img src={GottaLogo} alt='Gotta catchem all'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
