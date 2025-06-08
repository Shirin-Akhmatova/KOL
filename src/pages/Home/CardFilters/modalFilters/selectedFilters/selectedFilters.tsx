import SelectBtn from "@/shared/ui/buttons/selectBtn/selectBtn";
import styles from "./selectedFilters.module.scss";
import globalStyles from "../../cardFilters.module.scss";
import useFilters from "@/shared/hooks/useFilters";

interface ISelectedFiltersProps<T extends object> {
  data: T[];
  filterName: string;
  title: string;
}

interface IFilter {
  title: string;
  icon: string;
}

function SelectedFilters<T extends object>({
  data,
  filterName,
  title,
}: ISelectedFiltersProps<T>) {
  const { getFilter, setFilters } = useFilters();

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

  const isExistFilter = (item: string, idx: number) => {
    const filters = getFilter(`${filterName}_${idx}`) || [];
    return filters.includes(item);
  };

  const clickHandler = (item: IFilter, idx: number) => {
    const isExist = isExistFilter(item.title, idx);
    setFilters({
      [`${filterName}_${idx}`]: isExist ? "" : item.title,
    });
  };

  return (
    <div className={styles.selectedFilters}>
      <h3 className={`${globalStyles.title} ${globalStyles.mb20}`}>{title}</h3>
      <div className={styles.selectedFiltersList}>
        {dataTransform.map((item, idx) => (
          <SelectBtn
            key={item.title}
            icon={item.icon}
            active={isExistFilter(item.title, idx)}
            onClick={() => clickHandler(item, idx)}
          >
            {item.title}
          </SelectBtn>
        ))}
      </div>
    </div>
  );
}

export default SelectedFilters;
