import { CodeBlock } from "@/shared/ui/CodeBlock";

// !s - cmmb
/**
 * first
 */

/* 
!s - afn
const functionName = (params) => {
  
};

!s - items
const items = [
  {
    id: 1,
    title: '',
    text: '',
  },
  {
    id: 2,
    title: '',
    text: '',
  },
  {
    id: 3,
    title: '',
    text: '',
  },
]

!s - itemsArr
const itemsArr = ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Design']

!s - rtkStore
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    
  },
});

!s - useState
const [state, set] = useState();

!s - afn
function(arguments) {
    // body
}

!s - anfn
(first) => { second }

!s - async arrow function
async (params:type) => {
    
}

!s - async function
async function name(params:type) {
    
}

!s - c
console.log()

!s - cl
console.log();

!s - clg
console.log(first)

!s - clo
console.log('first', first)

!s - redux
import { connect } from 'react-redux'

!s - rxconst
export const first = 'first'

!s - sc
export function Snippets() {
  return <div>Snippets</div>
}

!s - sci
interface Props {}

export function Snippets({}: Props) {
  return <div>Snippets</div>
}

!s - setinterval
setInterval(() => {
  
}, interval);

!s - settimeout
setTimeout(() => {
  
}, timeout);

!s - si
setInterval(function() {
  // body
}, 1000);

!s - sti
setInterval(() => { first }, second)

!s - sto
setTimeout(() => { first }, second)

!s - usea
const {} = useAuth()

!s - useCallbackSnippet
useCallback(
  () => {
    first
  },
  [second],
)

!s - useContextSnippet
const first = useContext(second)

!s - useEffectSnippet
useEffect(() => {
  first

  return () => {
    second
  }
}, [third])

!s - useLayoutEffectSnippet
useLayoutEffect(() => {
  first

  return () => {
    second
  };
}, [third])

!s - useMemoSnippet
useMemo(() => first, [second])

!s - useReducerSnippets
const [state, dispatch] = useReducer(first, second, third)

!s - useRefSnippet
const first = useRef(second)

!s - useStateSnippet
const [first, setfirst] = useState(second)

!s - trycatch
try {
  
} catch (error) {
  
}

*/

export function Snippets() {
  return (
    <CodeBlock isBordered codeL="TypeScript" codeR="tsx" codeTitle="Snippets" />
  );
}
