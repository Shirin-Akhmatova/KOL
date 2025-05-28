import styles from "./footer.module.scss";
import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";

function Footer() {
  return (
    <div className={styles.footer}>
      <FooterTop />
      <FooterBottom />
    </div>
  );
}

export default Footer;
