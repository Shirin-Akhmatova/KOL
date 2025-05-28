import { footerSocials } from "./footer.data";
import styles from "./footer.module.scss";

function FooterBottom() {
  return (
    <div className={styles.footerBottomHr}>
      <div className={`container ${styles.footerBottom}`}>
        <ul className={styles.companyTerms}>
          <li key={"kol_2025"}>© 2025 KÖL Platform</li>
          <li key={"privacy_policy"}>Политика конфиденциальности</li>
          <li key={"user_agreement"}>Пользовательское соглашение</li>
        </ul>
        <img src="/imgs/logo.svg" className={styles.companyLogo} alt="logo" />
        <div className={styles.companySocials}>
          {footerSocials.map((item) => (
            <FooterSocial
              key={`${item.link}_${item.title}`}
              icon={item.icon}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterSocial({
  title,
  icon,
  link,
}: {
  title?: string;
  icon: string;
  link?: string;
}) {
  return (
    <a
      target={link ? "_blank" : undefined}
      href={link || "#"}
      className={styles.socialLable}
    >
      <img className={styles.socialLableImg} src={icon} alt={title} />
      {title}
    </a>
  );
}

export default FooterBottom;
