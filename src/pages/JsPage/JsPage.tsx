import { Button } from "@/shared/ui/Button";
import { CardBlockScss } from "../HooksPage/ui/CardBlockScss/CardBlockScss";

export const JsPage = () => {
  return (
    <CardBlockScss title="Title">
      <img src="/frontend.jpg" alt="" className="w-30" />

      <div className="">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo iusto
        laborum aliquid qui, ipsam eum officiis inventore quae aspernatur
        quaerat quo optio. Voluptatum saepe ipsum ipsa fugiat eum, dolorem
        numquam.
      </div>
      <Button>Result</Button>
    </CardBlockScss>
  );
};
