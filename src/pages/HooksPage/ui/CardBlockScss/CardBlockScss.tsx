import styles from "./CardBlockScss.module.scss";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  title?: React.ReactNode;
}

export function CardBlockScss({ className, children, title }: CardProps) {
  return (
    <div>
      <div className={`${className} ${styles.container}`}>
        <div className={styles.title}> {title}</div>
        {children}
      </div>
    </div>
  );
}
