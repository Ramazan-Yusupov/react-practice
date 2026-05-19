import styles from "./CardStyles.module.scss";

export function CardStyles() {
  return (
    <div className={styles.card}>
      <div className={styles.title}>CardStyles</div>
      <div className={styles.text}>
        Frontend Developer with React, TypeScript, Tailwind CSS
      </div>
    </div>
  );
}
