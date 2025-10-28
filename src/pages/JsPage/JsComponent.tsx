interface Props {
  label?: React.ReactNode;
  children?: React.ReactNode;
}

export function JsComponent({ label, children }: Props) {
  return (
    <div className="border-2 rounded-2xl px-3 py-2">
      {label && <div>{label}</div>}
      {children}
    </div>
  );
}
