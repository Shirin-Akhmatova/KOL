import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/services/redux/store";
import { footerColumns, type IColumnItem } from "./footer.data";
import styles from "./footer.module.scss";

interface FooterTopProps {
  onAuthClick: () => void;
}

function FooterTop({ onAuthClick }: FooterTopProps) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleItemClick = (item: IColumnItem) => {
    if (item.id === "auth") {
      onAuthClick();
    } else if (item.id === "create-service") {
      if (isAuthenticated) {
        navigate("/create-service");
      } else {
        onAuthClick();
      }
    }
  };

  return (
    <div className={`container ${styles.footerTop}`}>
      <div className={styles.footerTopLeft}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/kyrgyzanimation/"
        >
          <img
            className={styles.footerTopLeftImg}
            src="/imgs/logoAnimation.svg"
            alt="logo KA"
          />
        </a>
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
            onItemClick={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
}

function FooterColumn({
  columnTitle,
  columnItems,
  onItemClick,
}: {
  columnTitle: string;
  columnItems: IColumnItem[];
  onItemClick?: (item: IColumnItem) => void;
}) {
  return (
    <div className={styles.footerColumn}>
      <div className={styles.footerColumnTitle}>
        <h3>{columnTitle}</h3>
      </div>
      <ul className={styles.footerColumnItems}>
        {columnItems.map((item) => (
          <li key={item.title} className={styles.footerColumnItem}>
            <a
              href={item.link || "#"}
              className={styles.footerColumnItemLink}
              onClick={(e) => {
                e.preventDefault();
                onItemClick?.(item);
              }}
            >
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