import { CardPage } from "./ui/CardPage/CardPage";

export function ReactComponents() {
  return (
    <div className="m-10">
      <CardPage
        id={1}
        rating={4}
        price={500}
        title="Frontend"
        image="/frontend.jpg"
        className="w-100"
      />
    </div>
  );
}
