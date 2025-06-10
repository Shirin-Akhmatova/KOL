import styles from "./SearchModal.module.scss";
import LocationIcon from "../../assets/icons/tourism.png";

type SearchResultItem = {
  name: string;
  description?: string;
  icon?: string;
};

type SearchModalProps = {
  onClose: () => void;
  results?: SearchResultItem[];
  onSelect: (item: SearchResultItem) => void;
  title?: string;
  placeholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

function SearchModal({
  onClose,
  results = [],
  onSelect,
  title = "Результаты поиска",
  placeholder = "Поиск...",
  searchValue = "",
  onSearchChange,
}: SearchModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h4>{title}</h4>
          {/* Добавляем поле поиска */}
          <input
            type="search"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className={styles.input}
            autoComplete="off"
          />
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
