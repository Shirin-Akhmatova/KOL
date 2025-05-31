import styles from "./SearchModal.module.scss";
import LocationIcon from "../../assets/icons/tourism.png";

type SearchResultItem = {
  name: string;
  description?: string;
  icon?: string;
};

type SearchModalProps = {
  onClose: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  results?: SearchResultItem[];
  onSelect: (item: SearchResultItem) => void;
  placeholder?: string;
  title?: string;
};

function SearchModal({
  onClose,
  searchValue,
  onSearchChange,
  results = [],
  onSelect,
  placeholder = "Поиск...",
  title = "Результаты поиска",
}: SearchModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h4>{title}</h4>
        </div>

        <div className={styles.destinations}>
          {results.length === 0 ? (
            <p className={styles.noResults}>Ничего не найдено</p>
          ) : (
            results.map((item) => (
              <div
                key={item.name}
                className={styles.destination}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <img src={item.icon || LocationIcon} alt={item.name} />
                <div className={styles.info}>
                  <strong className={styles.name}>{item.name}</strong>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
