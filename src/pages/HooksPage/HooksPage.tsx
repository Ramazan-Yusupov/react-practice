import { UseContext } from "./ui/UseContext";
import { UseEffectPage } from "./ui/UseEffectPage";
import { UseLayoutEffect } from "./ui/UseLayoutEffect";
import { UseRef } from "./ui/UseRef";
import { UseRefVsUseState } from "./ui/UseRefVsUseState";
import { UseStatePage } from "./ui/UseStatePage";

export function HooksPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="text-3xl font-semibold">useState</div>
        <UseStatePage />
      </div>
      <div className="border-4 rounded-2xl w-full"></div>
      <div className="flex flex-col gap-5">
        <div className="text-3xl font-semibold">useEffect</div>
        <UseEffectPage />
      </div>
      <div className="border-4 rounded-2xl w-full"></div>
      <div className="flex flex-col gap-5">
        <div className="text-3xl font-semibold">useLayoutEffect</div>
        <UseLayoutEffect />
      </div>
      <div className="border-4 rounded-2xl w-full"></div>
      <div className="flex flex-col gap-5">
        <div className="text-3xl font-semibold">useRef</div>
        <UseRef />
      </div>
      <div className="border-4 rounded-2xl w-full"></div>
      <div className="flex flex-col gap-5">
        <div className="text-3xl font-semibold">useRefVsUseState</div>
        <UseRefVsUseState />
      </div>
      <div className="border-4 rounded-2xl w-full"></div>
      <div className="flex flex-col gap-5">
        <div className="text-3xl font-semibold">useContext</div>
        <UseContext state="Hello Context" />
      </div>
      <div className="border-4 rounded-2xl w-full"></div>
    </div>
  );
}
