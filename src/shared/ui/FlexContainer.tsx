import clsx from "clsx";

interface FlexContainerProps {
  gap?: number;
  flex?: boolean;
  className?: string;
  children: React.ReactNode;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  items?: "start" | "end" | "center" | "stretch";
  direction?: "row" | "row-reverse" | "col" | "col-reverse";
  justify?: "start" | "end" | "center" | "between" | "around";
  alignContent?: "start" | "end" | "center" | "between" | "around" | "stretch";
}

export function FlexContainer(props: FlexContainerProps) {
  const {
    gap,
    flex,
    wrap,
    items,
    justify,
    children,
    direction,
    className,
    alignContent,
  } = props;

  const classes = clsx(className, {
    flex: flex,
    [`flex-${direction}`]: direction,
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
