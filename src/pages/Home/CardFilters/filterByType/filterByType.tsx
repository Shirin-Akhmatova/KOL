import {
  useEffect,
  useState,
  type HTMLAttributes,
  type MouseEvent,
} from "react";
import styles from "./filterByType.module.scss";
import type { IRoomTypeFilter } from "../cardFilters.interface";
import useFilters from "@/shared/hooks/useFilters";

interface RoomTypeFilterProp
  extends IRoomTypeFilter,
    HTMLAttributes<HTMLDivElement> {}

const filterName = "roomType";

function FilterByType({ filters }: { filters: IRoomTypeFilter[] }) {
  const { getFilter, setFilter } = useFilters();
  const currentFilter = getFilter(filterName) as string;
  const [active, setActive] = useState<string>(currentFilter);

  const clickFilterHandler = (
    e: MouseEvent<HTMLButtonElement>,
    filterName: string
  ) => {
    e.preventDefault();
    if (filterName !== active) {
      setActive(filterName);
    } else {
      setActive("");
    }
  };

  useEffect(() => {
    setFilter(filterName, active);
  }, [active]);

  return (
    <div className={styles.roomTypeFiltersBlock}>
      {filters.map((type) => (
        <button
          key={type.filterName}
          style={{ height: "auto" }}
          onClick={(e) => clickFilterHandler(e, type.filterName)}
        >
          <RoomTypeFilter
            filterName={type.filterName}
            icon={type.icon}
            className={active === type.filterName ? styles.active : ""}
          />
        </button>
      ))}
    </div>
  );
}
function RoomTypeFilter({
  icon,
  filterName,
  className,
  ...props
}: RoomTypeFilterProp) {
  return (
    <div className={`${styles.roomTypeFilter} ${className}`} {...props}>
      <img className={styles.roomTypeFilterImage} src={icon} alt={filterName} />
      <span className={styles.roomTypeFilterTitle}>{filterName}</span>
    </div>
  );
}

export default FilterByType;
