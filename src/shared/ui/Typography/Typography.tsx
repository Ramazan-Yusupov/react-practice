import { cn } from '@/shared/lib';

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
type TextAlign = 'start' | 'center' | 'end';

interface TypographyProps {
  as?: TypographyTag;
  text: string | number;
  className?: string;
  align?: TextAlign;
}

const typographyStyles: Record<TypographyTag, string> = {
  h1: 'text-4xl font-bold leading-tight md:text-5xl',
  h2: 'text-3xl font-bold leading-tight md:text-4xl',
  h3: 'text-2xl font-semibold leading-snug md:text-3xl',
  h4: 'text-xl font-semibold leading-snug md:text-2xl',
  h5: 'text-lg font-medium leading-normal',
  h6: 'text-base font-medium leading-normal',
  p: 'text-base leading-relaxed',
};

const alignStyles: Record<TextAlign, string> = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right',
};

export function Typography({
  as: Component = 'p',
  text,
  className,
  align = 'center',
}: TypographyProps) {
  return (
    <Component className={cn(typographyStyles[Component], alignStyles[align], className)}>
      {text}
    </Component>
  );
}
