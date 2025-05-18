import { useState, type ButtonHTMLAttributes } from "react";
import type { IRecommendationFilter } from "../cardFilters.interface";
import styles from "./recommendationFilters.module.scss";
import globalStyles from "../cardFilters.module.scss";
interface IRecommendationFiltersProps {
  recommendation: IRecommendationFilter[];
  title: string;
}

function RecommendationFilters({
  recommendation,
  title,
}: IRecommendationFiltersProps) {
  const [activeRecommendation, setActiveRecommendation] = useState<
    IRecommendationFilter[]
  >([]);
  const isExist = (recommendation: IRecommendationFilter) => {
    return activeRecommendation.some(
      (item) =>
        item.recommendationTitle === recommendation.recommendationTitle &&
        item.recommendationDescription ===
          recommendation.recommendationDescription &&
        item.icon === recommendation.icon
    );
  };
  const clickHandler = (recommendation: IRecommendationFilter) => {
    if (isExist(recommendation)) {
      setActiveRecommendation(
        activeRecommendation.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(recommendation)
        )
      );
    } else {
      setActiveRecommendation([...activeRecommendation, recommendation]);
    }
  };
  return (
    <div>
      <h3 className={`${globalStyles.title} ${globalStyles.mb20}`}>{title}</h3>
      <div className={styles.recommendationFilters}>
        {recommendation.map((item) => (
          <RecommendationBtn
            recommendation={item}
            isActive={isExist(item)}
            onClick={() => clickHandler(item)}
          />
        ))}
      </div>
    </div>
  );
}

interface IRecommendationBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  recommendation: IRecommendationFilter;
  isActive: boolean;
}

const RecommendationBtn = ({
  recommendation,
  isActive,
  ...props
}: IRecommendationBtnProps) => {
  return (
    <button
      className={`${styles.recommendationFilter} ${
        isActive ? styles.recommendationFilterActive : ""
      }`}
      key={recommendation.recommendationTitle}
      {...props}
    >
      <img
        className={styles.recommendationFilterIcon}
        src={recommendation.icon}
        alt={recommendation.recommendationTitle}
      />
      <div className={styles.recommendationFilterContent}>
        <h3 className={styles.recommendationFilterTitle}>
          {recommendation.recommendationTitle}
        </h3>
        <p className={styles.recommendationFilterDescription}>
          {recommendation.recommendationDescription}
        </p>
      </div>
    </button>
  );
};

export default RecommendationFilters;
