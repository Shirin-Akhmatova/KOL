import { useState, type ButtonHTMLAttributes } from "react";
import type { IRecommendationFilter } from "../../cardFilters.interface";
import styles from "./recommendationFilters.module.scss";
import globalStyles from "../../cardFilters.module.scss";
import useFilters from "@/shared/hooks/useFilters";

interface IRecommendationFiltersProps {
  recommendation: IRecommendationFilter[];
  title: string;
}

const filterName = "recommendation";

function RecommendationFilters({
  recommendation,
  title,
}: IRecommendationFiltersProps) {
  const { getFilter, setFilters } = useFilters();
  const isExist = (recommendation: string, idx: number) => {
    const filters = getFilter(`${filterName}_${idx}`) || [];
    return filters.includes(recommendation);
  };

  const clickHandler = (recommendation: IRecommendationFilter, idx: number) => {

    if (isExist(recommendation.recommendationTitle, idx)) {
      console.log(`${filterName}_${idx}, уже существует`);

      setFilters({
        [`${filterName}_${idx}`]: "",
      });
    } else {
      setFilters({
        [`${filterName}_${idx}`]: recommendation.recommendationTitle,
      });
    }
  };
  return (
    <div>
      <h3 className={`${globalStyles.title} ${globalStyles.mb20}`}>{title}</h3>
      <div className={styles.recommendationFilters}>
        {recommendation.map((item, index) => (
          <RecommendationBtn
            key={item.recommendationTitle}
            recommendation={item}
            isActive={isExist(item.recommendationTitle, index)}
            onClick={() => clickHandler(item, index)}
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
