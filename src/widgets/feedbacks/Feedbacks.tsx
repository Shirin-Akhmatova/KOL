import React from 'react';
import './feedbacks.scss';

import profileImage from '../../assets/images/profile.png';
import starIcon from '../../assets/icons/star.svg';

const feedbacks = [
  {
    name: 'Руслан',
    since: '3 лет на KÖL',
    time: '4 дня назад',
    text: 'Красивое пространство, высотное здание, очень просторное, красивый маленький балкон, очень отзывчивые хозяева.',
  },
  {
    name: 'Рустам',
    since: '3 лет на KÖL',
    time: '4 дня назад',
    text: 'Очень приятный опыт. Бассейн потрясающий. И все закусочные поблизости.',
  },
  {
    name: 'Адахан',
    since: '3 лет на KÖL',
    time: '4 дня назад',
    text: 'Потрясающий вид на город, идеальное расположение. Здесь у меня было одно из лучших пребываний.',
  },
  {
    name: 'XXX',
    since: '3 лет на KÖL',
    time: '4 дня назад',
    text: 'Красивое пространство, высотное здание, очень просторное, красивый маленький балкон, очень отзывчивые хозяева.',
  },
];

function Feedbacks() {
  return (
    <div className='feedback'>
      <h1>Отзывы</h1>
      <div className='grid'>
        {feedbacks.map((item, index) => (
          <div className='block1' key={index}>
            <div className='block1-top'>
              <img src={profileImage} alt='avatar' />
              <div className='right'>
                <h4>{item.name}</h4>
                <p>{item.since}</p>
              </div>
            </div>
            <div className='mid'>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={starIcon} alt="star" />
                ))}
              </div>
              <div className='mid-right'>
                <h3>· {item.time}</h3>
              </div>
            </div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="button-wrapper">
  <button className='show-more'>Показать все 60 отзывов</button>
</div>
    </div>
  );
}

export default Feedbacks;