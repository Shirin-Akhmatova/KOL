import SelectBtn from "@/shared/ui/buttons/selectBtn/selectBtn";
import styles from "./selectedFilters.module.scss";
import globalStyles from "../cartFilters.module.scss";
import { useState } from "react";

interface ISelectedFiltersProps<T extends object> {
  data: T[];
  filter: string;
  title: string;
}
interface IFilter {
  title: string;
  icon: string;
}

function SelectedFilters<T extends object>({
  data,
  filter,
  title,
}: ISelectedFiltersProps<T>) {
  const [selectedFilters, setSelectedFilters] = useState<IFilter[]>([]);

  const dataTransform: IFilter[] = data.map((item) => {
    const titleKey = Object.keys(item).find((key) =>
      key.toLowerCase().includes("title")
    );
    const iconKey = Object.keys(item).find((key) =>
      key.toLowerCase().includes("icon")
    );
    return {
      title: item[titleKey as keyof typeof item] as string,
      icon: item[iconKey as keyof typeof item] as string,
    };
  });
  const isExistFilter = (item: IFilter) => {
    return selectedFilters.some(
      (filter) => filter.title === item.title && filter.icon === item.icon
    );
  };
  const clickHandler = (item: IFilter) => {
    const isExist = isExistFilter(item);
    if (isExist) {
      setSelectedFilters((prev) =>
        prev.filter((filter) => JSON.stringify(filter) !== JSON.stringify(item))
      );
    } else {
      setSelectedFilters((prev) => [...prev, item]);
    }
  };
  return (
    <div className={styles.selectedFilters}>
      <h3 className={`${globalStyles.title} ${globalStyles.mb20}`}>{title}</h3>
      <div className={styles.selectedFiltersList}>
        {dataTransform.map((item) => (
          <SelectBtn
            key={item.title}
            icon={item.icon}
            active={isExistFilter(item)}
            onClick={() => clickHandler(item)}
          >
            {item.title}
          </SelectBtn>
        ))}
      </div>
    </div>
  );
}

export default SelectedFilters;
