import { Card, CodeBlock, PostsList } from "@/shared";
import { decrement, increment } from "@/store/features/counter/counterSlice";
import { toggleTheme } from "@/store/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function Home() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);
  const counter = useAppSelector((s) => s.counter.value);

  return (
    <Card border="2px" maxWidth="xl">
      <CodeBlock
        border="2px"
        title={"Theme"}
        onClick={() => dispatch(toggleTheme())}
        codeL={mode === "dark" ? "Light" : "Dark"}
        borderColor={mode === "dark" ? "red" : "white"}
      />
      <CodeBlock
        border="2px"
        title={"Increment"}
        onClick={() => dispatch(increment())}
      />
      <CodeBlock border="2px" title={"Count:"} codeL={counter || "0"} />
      <CodeBlock
        border="2px"
        title={"Decrement"}
        onClick={() => dispatch(decrement())}
      />
      <PostsList />
    </Card>
  );
}
