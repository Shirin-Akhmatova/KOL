import './feedbacks.scss';

import starIcon from '../../assets/icons/star.svg';

const feedbacks = [
  {
    image: 'https://cdnn21.img.ria.ru/images/92455/99/924559904_145:0:2422:1708_1920x0_80_0_0_6926c90cf66d8e4dca9bcad638e7099b.jpg',
    name: 'Рустам',
    since: '11 лет на KÖL',
    time: 'Май 2025г.',
    text: 'Красивое пространство, высотное здание, очень просторное, красивый маленький балкон, очень отзывчивые хозяева.',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEM9pXaI1HvNPnddwbUtgLkK21MggGGWeF_Q&s',
    name: 'Бахтияр',
    since: '5 лет на KÖL',
    time: '1 неделю назад',
    text: 'Очень приятный опыт. Бассейн потрясающий. И все закусочные поблизости.',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4dukM-b5F1twMDbTY22uJGuOT4_1OrMW0rw&s',
    name: 'Малика',
    since: 'Берлин, Германия',
    time: '4 дня назад',
    text: 'Потрясающий вид на город, идеальное расположение. Здесь у меня было одно из лучших пребываний.',
  },
  {
    image: 'https://st3.depositphotos.com/1177973/17288/i/450/depositphotos_172887004-stock-photo-young-man-near-car.jpg',
    name: 'Эрик',
    since: 'Бишкек, Кыргызстан',
    time: '3 недели назад',
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
              <img src={item.image} alt='avatar' />
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