import React from 'react'
import './map.scss'
import mapImage from '../../assets/images/map.png'
function Map() {
  return (
    <div className='map'>
        <div className='text'>
            <h3>Где вы будете</h3>
            <p>Карван , Иссык-Кол</p>
        </div>
      <div className='image'>
        <img src={mapImage}/>
      </div>
    </div>
  )
}

export default Map
