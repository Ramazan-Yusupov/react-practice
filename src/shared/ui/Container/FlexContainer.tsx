import clsx from "clsx";

interface FlexContainerProps {
  gap?: number;
  className?: string;
  children: React.ReactNode;
  width?: "full" | "fit";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  items?: "start" | "end" | "center" | "stretch";
  direction?: "row" | "row-reverse" | "col" | "col-reverse";
  justify?: "start" | "end" | "center" | "between" | "around";
  alignContent?: "start" | "end" | "center" | "between" | "around" | "stretch";
}

export function FlexContainer(props: FlexContainerProps) {
  const {
    gap,
    wrap,
    width,
    items,
    justify,
    children,
    direction,
    className,
    alignContent,
  } = props;

  const classes = clsx(className, "flex", {
    [`flex-${direction}`]: direction,
    [`w-${width}`]: width,
    [`flex-${wrap}`]: wrap,
    [`items-${items}`]: items,
    [`justify-${justify}`]: justify,
    [`content-${alignContent}`]: alignContent,
  });

  return (
    <div className={classes} style={{ gap }}>
      {children}
    </div>
  );
}
