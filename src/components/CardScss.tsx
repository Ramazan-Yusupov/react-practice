import styles from "./CardScss.module.scss";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function CardScss({ children, className }: CardProps) {
  return <div className={`${styles.card} ${className || ""}`}>{children}</div>;
}
