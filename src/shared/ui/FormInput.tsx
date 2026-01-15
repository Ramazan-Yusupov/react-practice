import { Button } from "./Button";
import { Input } from "./Input";

interface FormInputProps {
  value?: string;
  titleButton?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormInput({
  value,
  onChange,
  onSubmit,
  titleButton,
}: FormInputProps) {
  return (
    <form className="flex gap-3" onSubmit={onSubmit}>
      <Input value={value} placeholder="Add Position" onChange={onChange} />
      <Button title={titleButton} type="submit" />
    </form>
  );
}
