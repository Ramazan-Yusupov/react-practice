import type { CSSProperties, ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib';

type BoxProps<T extends ElementType = 'div'> = {
  as?: T;
  text?: ReactNode;
  border?: string;
  ref?: React.Ref<HTMLDivElement>;
  rounded?: string;
  borderColor?: string;
  color?: CSSProperties['color'];
  background?: CSSProperties['background'];
  className?: string;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  minWidth?: CSSProperties['minWidth'];
  minHeight?: CSSProperties['minHeight'];
  maxWidth?: CSSProperties['maxWidth'];
  maxHeight?: CSSProperties['maxHeight'];
  size?: CSSProperties['width'];
  display?: CSSProperties['display'];
  position?: CSSProperties['position'];
  top?: CSSProperties['top'];
  right?: CSSProperties['right'];
  bottom?: CSSProperties['bottom'];
  left?: CSSProperties['left'];
  padding?: CSSProperties['padding'];
  margin?: CSSProperties['margin'];
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'color' | 'children' | 'style' | 'className'>;

export function Box<T extends ElementType = 'div'>({
  as,
  text,
  size,
  width,
  ref,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  border,
  children,
  className,
  borderColor,
  background,
  color = 'white',
  display,
  position,
  top,
  right,
  bottom,
  left,
  padding,
  margin,
  style,
  rounded = '16px',
  ...props
}: BoxProps<T>) {
  const Component = as || 'div';
  const boxStyle: CSSProperties = {
    width: size ?? width,
    height: size ?? height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    display,
    position,
    top,
    right,
    bottom,
    left,
    padding,
    margin,
    border: border ? `${border} solid ${borderColor ?? color}` : undefined,
    borderRadius: rounded,
    background: background,
    color,
    ...style,
  };

  return (
    <Component ref={ref} className={cn('flex-center', className)} style={boxStyle} {...props}>
      {text || children}
    </Component>
  );
}
