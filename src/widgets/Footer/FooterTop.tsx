import { footerColumns, type IColumnItem } from "./footer.data";
import styles from "./footer.module.scss";

function FooterTop() {
  return (
    <div className={`container ${styles.footerTop}`}>
      <div className={styles.footerTopLeft}>
        <img
          className={styles.footerTopLeftImg}
          src="/imgs/logoAnimation.svg"
          alt="logo KA"
        />
        <p className={styles.footerTopLeftText}>
          Кыргызанимация — студия, создающая мультфильмы на кыргызском языке и
          развивающая национальную культуру.
        </p>
      </div>
      <div className={styles.footerTopRight}>
        {footerColumns.map((column) => (
          <FooterColumn
            key={column.columnTitle}
            columnTitle={column.columnTitle}
            columnItems={column.columnItems}
          />
        ))}
      </div>
    </div>
  );
}

function FooterColumn({
  columnTitle,
  columnItems,
}: {
  columnTitle: string;
  columnItems: IColumnItem[];
}) {
  return (
    <div className={styles.footerColumn}>
      <div className={styles.footerColumnTitle}>
        <h3>{columnTitle}</h3>
      </div>
      <ul className={styles.footerColumnItems}>
        {columnItems.map((item) => (
          <li key={item.title} className={styles.footerColumnItem}>
            <a href={item.link} className={styles.footerColumnItemLink}>
              {item.icon && <img src={item.icon} alt={item.title} />}
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterTop;
