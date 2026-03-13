import { cn } from "@/lib";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  size?: string;
  border?: string;
  rounded?: string;
  className?: string;
  borderColor?: string;
  width?: number | string;
  height?: number | string;
}

export function Image({
  src,
  alt,
  size,
  width,
  height,
  border,
  rounded,
  className,
  borderColor = "currentColor",
  ...rest
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size || width}
      height={size || height}
      className={cn(className)}
      {...rest}
      style={{
        border: `${border} solid ${borderColor}`,
        borderRadius: rounded,
      }}
    />
  );
}
