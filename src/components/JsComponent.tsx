import { useJsHook } from "@/hooks/useJsHook";
import { Card } from "./Card";

export function JsComponent() {
  const { user, checkAge, message } = useJsHook();
  return (
    <Card className="max-w-150 *:border-b-2 *:pb-5">
      <div>{user("Frontend", 23)}</div>
      <div>{message()}</div>
      <div>{checkAge(23)}</div>
    </Card>
  );
}
