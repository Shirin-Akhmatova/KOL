import './hotelGallerry.scss';

import hotel1 from '../../assets/images/hotel1.png';
import hotel2 from '../../assets/images/hotel2.png';
import hotel3 from '../../assets/images/hotel3.png';
import hotel4 from '../../assets/images/hotel4.png';
import hotel5 from '../../assets/images/hotel5.png';

const images = [hotel1, hotel2, hotel3, hotel4, hotel5];

export const HotelGallery = () => {
  return (
    <div className="gallery-wrapper container">
      <h1 className="title">Роскошный и захватывающий дух KARVEN</h1>

      <div className="grid">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`grid-item ${idx === 0 ? 'large' : ''}`}
          >
            <img src={src} alt={`Hotel ${idx + 1}`} />
            {idx === 4 && (
              <button className="show-more">Показать все фото</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
