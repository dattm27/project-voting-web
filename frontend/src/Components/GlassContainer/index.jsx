import styles from "./GlassContainer.module.css";


function GlassContainer({ children }) {
  return <div className={styles.glass_card}>{children}</div>;
}

export default GlassContainer;
