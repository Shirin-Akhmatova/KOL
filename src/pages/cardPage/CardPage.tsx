import React from 'react'
import './cardPage.scss'
import { HotelGallery } from '../../widgets/HotelGallery/HotelGallery'
import Feedbacks from '../../widgets/feedbacks/Feedbacks'
import Map from '../../widgets/map/Map'
function CardPage() {
  return (
    <div className='cardPage'>
      <HotelGallery/>
      <Feedbacks/>
      <Map/>  
    </div>
  )
}

export default CardPage
