import { Button } from "@/shared/ui/Button";
import { JsComponent } from "./JsComponent";
import { useState } from "react";

export const JsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="inline-block max-w-2xl w-full border-2 p-4 rounded-xl">
      <Button onClick={() => setIsVisible((v) => !v)}>Toggle</Button>
      <hr className="border-2 my-4" />
      {isVisible && (
        <JsComponent label="JavaScript Component">
          <p>This is a reusable JavaScript component.</p>
        </JsComponent>
      )}
    </div>
  );
};
