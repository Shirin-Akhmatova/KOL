import create from "@/assets/images/createImg.svg";
import starIcon from "@/assets/icons/star.svg";
import scss from "./ObjectsModal.module.scss";
import { Link } from "react-router-dom";

const blocks = [
  {
    image:
      "https://a0.muscache.com/im/pictures/b82c0a78-ff1e-44bf-ab79-3174b51c03c3.jpg?im_w=720",
    title: "Karven Four Seasons",
    description: "Центр отдыха «Карвен Четыре Сезона",
    price: 289,
    rating: 4.91,
    feedbacks: 259,
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/b82c0a78-ff1e-44bf-ab79-3174b51c03c3.jpg?im_w=720",
    title: "Karven Four Seasons",
    description: "Центр отдыха «Карвен Четыре Сезона",
    price: 289,
    rating: 4.91,
    feedbacks: 259,
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/b82c0a78-ff1e-44bf-ab79-3174b51c03c3.jpg?im_w=720",
    title: "Karven Four Seasons",
    description: "Центр отдыха «Карвен Четыре Сезона",
    price: 289,
    rating: 4.91,
    feedbacks: 259,
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/b82c0a78-ff1e-44bf-ab79-3174b51c03c3.jpg?im_w=720",
    title: "Karven Four Seasons",
    description: "Центр отдыха «Карвен Четыре Сезона",
    price: 289,
    rating: 4.91,
    feedbacks: 259,
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/b82c0a78-ff1e-44bf-ab79-3174b51c03c3.jpg?im_w=720",
    title: "Karven Four Seasons",
    description: "Центр отдыха «Карвен Четыре Сезона",
    price: 289,
    rating: 4.91,
    feedbacks: 259,
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/b82c0a78-ff1e-44bf-ab79-3174b51c03c3.jpg?im_w=720",
    title: "Karven Four Seasons",
    description: "Центр отдыха «Карвен Четыре Сезона",
    price: 289,
    rating: 4.91,
    feedbacks: 259,
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/b82c0a78-ff1e-44bf-ab79-3174b51c03c3.jpg?im_w=720",
    title: "Karven Four Seasons",
    description: "Центр отдыха «Карвен Четыре Сезона",
    price: 289,
    rating: 4.91,
    feedbacks: 259,
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/b82c0a78-ff1e-44bf-ab79-3174b51c03c3.jpg?im_w=720",
    title: "Karven Four Seasons",
    description: "Центр отдыха «Карвен Четыре Сезона",
    price: 289,
    rating: 4.91,
    feedbacks: 259,
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ObjectsModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className={scss.ObjectsModal} onClick={onClose}>
      <div className={scss.modal} onClick={(e) => e.stopPropagation()}>
        <h1>Your object’s</h1>

        <div className={scss.content}>
          <Link to="/create-service" className={scss.create}>
            <img src={create} alt="create" />
            <button>Create a Service</button>
          </Link>
          {blocks.map((block, index) => (
            <Link to="/cardPage" className={scss.card} key={index}>
              <img src={block.image} alt="block" />
              <div className={scss.info}>
                <div>
                  <h3>{block.title}</h3>
                  <div className={scss.rating}>
                    <img src={starIcon} alt="star" />
                    <span>{block.rating}</span>
                    <span>{`(${block.feedbacks})`}</span>
                  </div>
                </div>
                <p>{block.description}</p>
                <span>{block.price} сом/ночь</span>
              </div>
            </Link>
          ))}
        </div>

        <div className={scss.gradient}></div>
      </div>
    </div>
  );
};

export default ObjectsModal;
