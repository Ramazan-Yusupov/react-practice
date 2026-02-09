import { CodeBlock } from "@/shared/ui/CodeBlock";

/*
s - afn
const fn = () => {
  console.log("Fn");
};

s - items
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

s - itemsArr
const itemsArr = ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Design']

s - rtkStore
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    
  },
});

s - useState
const [state, set] = useState();

s - #endregion
//#endregion

s - #region
//#region
  
s - ac
document.appendChild(elem);

s - ae
document.addEventListener('load', function (e) {
    // body
});

s - afn
function(arguments) {
    // body
}

s - al
alert('msg');

s - anfn
(first) => { second }

s - apply
method.apply(context, [arguments]);

s - assync arrow function
async (params:type) => {
    
}

s - async function
async function name(params:type) {
    
}

bnd
this.first = this.first.bind(this)

s - c
console.log()

s - ca
document.classList.add('class');

s - call
method.call(context, arguments);

s - cas
console.assert(first, second)

s - ccl
console.clear()

s - cco
console.count(first)

s - cd
console.dir();

s - cdf
document.createDocumentFragment();

s - cdi
console.dir(first)

s - cdm
componentDidMount() { first }

s - cdup
componentDidUpdate(prevProps, prevState) { first} 

s -  ce
console.error();

s - cel
document.createElement(elem);

s - cer
console.error(first)

s - cge
console.groupEnd()

s - cgr
console.group('first')

s - ci
console.info();

s - cin
console.info(first)

s - cl
console.log();

s - class
class name {
    constructor(parameters) {
        
    }
}

s - clg
console.log(first)

s - clj
console.log('first', JSON.stringify(first, null, 2))

s - clo
console.log('first', first)

*/

// s - cmmb
/**
 * first
 */

/* 
s - cnc
'use client'

interface Props {}

export function Snippets({}: Props) {
    return <div>Snippets</div>
}

s - co
confirm('msg');

s - cp
const { first } = this.props

s - cr
document.classList.remove('class');

s - cref
this.firstRef = React.createRef()

s - cs
const { first } = this.state

s - ct
document.classList.toggle('class');

s - cte
console.timeEnd('first')

s - ctl
console.table([first])

s - ctm
console.time('first')

s - ctor
/**
 *
 */
/* constructor() {
    super();
    
} 
s - ctr
console.trace(first)

s - cw
console.warn();

s - cwa
console.warn(first)

s - cwun
componentWillUnmount() {first }

s - dar
const [second] = first

s - de
debugger;

s - desc
describe('first', () => { second })

s - dob
const {second} = first

s - dowhile
do {
    
} while (condition);

s - edf
export default (first) => {second}

s - ednf
export default function first(second) {third}

s - enf
export const first = (second) => {third}

s - error
console.error();

s - est
state = { first }

s - exa
export { second as third } from 'first'

s - exd
export { second } from 'first'

s - exp
export default first

s - expint
export interface first {second}

s - exptp
export type first = {second}

s - fe
array.forEach(function(item) {
    // body
});

s - fin
for(let first in second) {third}

s - fn
function methodName (arguments) {
    // body
}

s - fof
for(let first of second) {third}

s - for
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
}

s - forawaitof
for await (const element of object) {
    
}

s - foreach =>
array.forEach(element => {
    
});

s - forin
for (const key in object) {
    if (!Object.hasOwn(object, key)) continue;
    
    const element = object[key];
    
    
}

s - forof
for (const element of object) {
    
}

s - fre
first.forEach(second => {third})

s - function
function name(params:type) {
    
}

s - ga
document.getAttribute('attr');

s - gc
document.getElementsByClassName('class');

s - gdsfp
static getDerivedStateFromProps(props, state) {first}

s - get
public get value() : string {
    return 
}

s - gi
document.getElementById('id');

s - gmd
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
} : {
  params: { ${slug} }
}): Promise<Metadata> {
  const product = await ${getData}(${slug})
  return { title: product.title }
}

s - gsbu
getSnapshotBeforeUpdate = (prevProps, prevState) => {first}

s - gsp
export async function generateStaticParams() {
  const posts = await fetch("${fetch url}").then(res => res.json())

  return posts.map(post => ({
    slug: post.slug,
  }))
}

s - gt
document.getElementsByTagName('tag');

s - hoc

import React from 'react'
import PropTypes from 'prop-types'

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />

  hocComponent.propTypes = {}

  return hocComponent
}

s - hocredux
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export const mapStateToProps = state => ({})

export const mapDispatchToProps = {}

export const first = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />

  hocComponent.propTypes = {}

  return hocComponent
}

export default WrapperComponent => connect(mapStateToProps, mapDispatchToProps)(first(WrapperComponent))

s - if
if (condition) {
    
}

s - ifelse
if (condition) {
    
} else {
    
}

s - iife
(function(window, document) {
    // body
})(window, document);

s - ima
import { second as third } from 'first'

s - imbr
import { BrowserRouter as Router } from 'react-router-dom'

s - imbrc
import { Route, Switch, NavLink, Link } from 'react-router-dom'

s - imbrl
import { Link } from 'react-router-dom'

s - imbrnl
import { NavLink } from 'react-router-dom'

s - imbrs
import { Switch } from 'react-router-dom'

s - imc
import cn from 'clsx'

s - imd
import { second } from 'first'

s - ime
import * as second from 'first'

s - imm
import { m } from 'framer-motion'

s - imn
import 'first'

s - imp
import second from 'first'

s - import
import {  } from "module";

s - impt
import PropTypes from 'prop-types'

s - imr
import React from 'react'

s - imrc
import React, { Component } from 'react'

s - imrcp
import React, { Component } from 'react'
import PropTypes from 'prop-types'

s - imrd
import ReactDOM from 'react-dom'

s - imrm
import React, { memo } from 'react'

s - imrmp
import React, { memo } from 'react'
import PropTypes from 'prop-types'

s - imrn
import { first } from 'react-native'

s - imrpc
import React, { PureComponent } from 'react'

s - imrpcp
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

s - imrr
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

s - imrs
import styles from './Snippets.module.scss'

s - inter
interface Props { 
    
}

s - jp
JSON.parse(obj);

s - js 
JSON.stringify(obj);

s - lnc
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return <div>{children}</div>
}

s - log
console.log();

s - md
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '',
    description: ''
}

s - met
first = (second) => {third}

s - new
const name = new type(arguments);

s - newpromise
new Promise<void>((resolve, reject) => {
    
})

s - nfn
const first = (second) => { third }

s - ofn
functionName: function(arguments) {
    // body
}

s - pge
get first() {
  return this.second
}

s - pm
prompt('msg');

s - pnc
import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
    title: '',
    ...NO_INDEX_PAGE
}

export default function Page() {
    return <div></div>
}

s - pncs 
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '',
  description: ''
}

export default function Page() {
  return <div></div>
}

s - pr
object.prototype.method = function(arguments) {
  // body
}

s - private method
private name() {
  
}

s - prom
return new Promise((resolve, reject) => { first })

s - prop

private _value : string;
public get value() : string {
  return this._value;
}
public set value(v : string) {
  this._value = v;
}

s - props
this.props.first

s - pse
set first(second) {third}

s - pta
PropTypes.array

s - ptany
PropTypes.any

s - ptao
PropTypes.arrayOf()

s - ptaor
PropTypes.arrayOf().isRequired

s - ptar
PropTypes.array.isRequired

s - ptb
PropTypes.bool

s - ptbr
PropTypes.bool.isRequired

s - pte
PropTypes.oneOf([''])

s - ptel
PropTypes.element

s - ptelr
PropTypes.element.isRequired

s - pter
PropTypes.oneOf(['']).isRequired

s - ptet
PropTypes.oneOfType([
  
])

s - ptetr
PropTypes.oneOfType([
  
]).isRequired

s - ptex
PropTypes.exact({
  
})

s - ptexr
PropTypes.exact({
  
}).isRequired

s - ptf
PropTypes.func

s - ptfr
PropTypes.func.isRequired

s - pti
PropTypes.instanceOf()

s - ptir
PropTypes.instanceOf().isRequired

s - ptn
PropTypes.number

s - ptnd
PropTypes.node

s - ptndr
PropTypes.node.isRequired

s - ptnr
PropTypes.number.isRequired

s - pto
PropTypes.object

s - ptoo
PropTypes.objectOf()

s - ptoor
PropTypes.objectOf().isRequired

s - pts
PropTypes.string

s - ptsh
PropTypes.shape({
  
})

s - ptshr
PropTypes.shape({
  
}).isRequired

*/

// s - public method
// /**
//  * name
//  */
// public name() {

// }

/* 
s - qs
document.querySelector('selector');

s - qsa
document.querySelectorAll('selector');

s - ra
document.removeAttribute('attr');

s - rafc
import React from 'react'

export const Snippets = () => {
  return (
    <div>Snippets</div>
  )
}

s - rafce
import React from 'react'

const Snippets = () => {
  return (
    <div>Snippets</div>
  )
}

export default Snippets

s - rafcp

import React from 'react'
import PropTypes from 'prop-types'

const Snippets = props => {
  return (
    <div>Snippets</div>
  )
}

Snippets.propTypes = {}

export default Snippets

s - rc
document.removeChild(elem);

s - rcc
import React, { Component } from 'react'

export default class Snippets extends Component {
  render() {
    return (
      <div>Snippets</div>
    )
  }
}

s - rccp
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Snippets extends Component {
  static propTypes = {second: third}

  render() {
    return (
      <div>Snippets</div>
    )
  }
}

s - rce
import React, { Component } from 'react'

export class Snippets extends Component {
  render() {
    return (
      <div>Snippets</div>
    )
  }
}

export default Snippets

s - rcep
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class Snippets extends Component {
  static propTypes = {}

  render() {
    return (
      <div>Snippets</div>
    )
  }
}

export default Snippets

s - rconst
constructor(props) {
  super(props)

  this.state = {
     first
  }
}

s - rcontext
const first = React.createContext()

s - rcredux
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Snippets extends Component {
  render() {
    return (
      <div>Snippets</div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Snippets)

s - rcreduxp
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Snippets extends Component {
  static propTypes = {
    second: third
  }

  render() {
    return (
      <div>Snippets</div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Snippets)

s - redux
import { connect } from 'react-redux'

s - reduxmap
const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

s - ref
/// <reference path="" />

s - rfc
import React from 'react'

export default function Snippets() {
  return (
    <div>Snippets</div>
  )
}

s - rfce
import React from 'react'

function Snippets() {
  return (
    <div>Snippets</div>
  )
}

export default Snippets

s - rfcp
import React from 'react'
import PropTypes from 'prop-types'

function Snippets(props) {
  return (
    <div>Snippets</div>
  )
}

Snippets.propTypes = {}

export default Snippets

s - rfcredux
import React from 'react'
import { connect } from 'react-redux'

export const Snippets = (props) => {
  return (
    <div>Snippets</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Snippets)

s - rfcreduxp
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const Snippets = (props) => {
  return (
    <div>Snippets</div>
  )
}

Snippets.propTypes = {
  second: PropTypes.third
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Snippets)

s - rfcreduxp
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const Snippets = (props) => {
  return (
    <div>Snippets</div>
  )
}

Snippets.propTypes = {
  second: PropTypes.third
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Snippets)

s - rmc
import React, { memo } from 'react'

const Snippets = memo(() => {
  return (
    <div>Snippets</div>
  )
})

export default Snippets

s - rmcp
import PropTypes from 'prop-types'
import React, { memo } from 'react'

const Snippets = memo((props) => {
  return (
    <div>Snippets</div>
  )
})

Snippets.propTypes = {}

export default Snippets

s - rnc
import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class Snippets extends Component {
  render() {
    return (
      <View>
        <Text>Snippets</Text>
      </View>
    )
  }
}

s - rnce
import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class Snippets extends Component {
  render() {
    return (
      <View>
        <Text>Snippets</Text>
      </View>
    )
  }
}

export default Snippets

s - rncs
import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class Snippets extends Component {
  render() {
    return (
      <View>
        <Text>Snippets</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})

s - rnf
import { View, Text } from 'react-native'
import React from 'react'

export default function Snippets() {
  return (
    <View>
      <Text>Snippets</Text>
    </View>
  )
}

s - rnfe
import { View, Text } from 'react-native'
import React from 'react'

const Snippets = () => {
  return (
    <View>
      <Text>Snippets</Text>
    </View>
  )
}

export default Snippets

s - rnfes
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Snippets = () => {
  return (
    <View>
      <Text>Snippets</Text>
    </View>
  )
}

export default Snippets

const styles = StyleSheet.create({})

s - rnfs
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Snippets() {
  return (
    <View>
      <Text>Snippets</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

s - rnpc
import { Text, View } from 'react-native'
import React, { PureComponent } from 'react'

export default class Snippets extends PureComponent {
  render() {
    return (
      <View>
        <Text>Snippets</Text>
      </View>
    )
  }
}

s - rnpce
import { Text, View } from 'react-native'
import React, { PureComponent } from 'react'

export class Snippets extends PureComponent {
  render() {
    return (
      <View>
        <Text>Snippets</Text>
      </View>
    )
  }
}

export default Snippets

s - rnstyle
const styles = StyleSheet.create({first})

s - rpc
import React, { PureComponent } from 'react'

export default class Snippets extends PureComponent {
  render() {
    return (
      <div>Snippets</div>
    )
  }
}

s - rpce
import React, { PureComponent } from 'react'

export class Snippets extends PureComponent {
  render() {
    return (
      <div>Snippets</div>
    )
  }
}

export default Snippets

s - rpcp
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

export default class Snippets extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <div>Snippets</div>
    )
  }
}

s - rxaction
export const first = (payload) => ({
  type: second,
  payload
})

s - rxconst
export const first = 'first'

s - rxreducer
const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case first:
    return { ...state, ...payload }

  default:
    return state
  }
}

s - rxselect
import { createSelector } from 'reselect'

export const first = state => state.second

s - rxslice
import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const Snippets = createSlice({
  name: second,
  initialState,
  reducers: {}
});

export const {} = Snippets.actions

export default Snippets.reducer

s - sa
document.setAttribute('attr', value);

s - sc
export function Snippets() {
  return <div>Snippets</div>
}

s - sci
interface Props {}

export function Snippets({}: Props) {
  return <div>Snippets</div>
}

s - scu
shouldComponentUpdate(nextProps, nextState) { first }

s - set
public set value(v : string) {
  this. = v;
}

s - setinterval
setInterval(() => {
  
}, interval);

s - settimeout
setTimeout(() => {
  
}, timeout);

s - si
setInterval(function() {
  // body
}, 1000);

s - snrtest
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import store from '~/store'
import Snippets from '../Snippets'

describe('<Snippets />', () => {
  const defaultProps = {}
  const wrapper = renderer.create(
    <Provider store={store}>
      <Snippets {...defaultProps} />
    </Provider>,
  )

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

s - sntest
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import Snippets from '../Snippets'

describe('<Snippets />', () => {
  const defaultProps = {}
  const wrapper = renderer.create(<Snippets {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

s - srtest
import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import store from '~/store'
import { Snippets } from '../Snippets'

describe('<Snippets />', () => {
  const defaultProps = {}
  const wrapper = renderer.create(
    <Provider store={store}>
     <Snippets {...defaultProps} />
    </Provider>,
  )

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

s - ssf
this.setState((state, props) => { return { first }})

s - sst
this.setState({first})

s - st
setTimeout(function() {
  // body
}, 1000);

s - state
this.state.first

s - stest
import React from 'react'
import renderer from 'react-test-renderer'

import { Snippets } from '../Snippets'

describe('<Snippets />', () => {
  const defaultProps = {}
  const wrapper = renderer.create(<Snippets {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})


s - sti
setInterval(() => { first }, second)

s - sto
setTimeout(() => { first }, second)

s - switch
switch (key) {
  case value:
    
    break;

  default:
    break;
}

s - tc
document.textContent = 'content';

s - test
test('should first', () => { second })

s - testa
test('should first', async () => { second })

s - throw
throw new Error("");

s - tit
it('should first', () => { second })

s - tita
it('should first', async () => { second })

s - tpf
typeof first

s - trycatch
try {
  
} catch (error) {
  
}

s - tsrafc
import React from 'react'

type Props = {}

const Snippets = (props: Props) => {
  return (
    <div>Snippets</div>
  )
}

s - tsrafce
import React from 'react'

type Props = {}

const Snippets = (props: Props) => {
  return (
    <div>Snippets</div>
  )
}

export default Snippets

s - tsrcc
import React, { Component } from 'react'

type Props = {}

type State = {}

export default class Snippets extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>Snippets</div>
    )
  }
}

s - tsrce
import React, { Component } from 'react'

type Props = {}

type State = {}

class Snippets extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>Snippets</div>
    )
  }
}

export default Snippets

s - tsrcredux
import { connect } from 'react-redux'
import React, { Component } from 'react'

type Props = {}

type State = {}

export class Snippets extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>Snippets</div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Snippets)

s - tsrfc
import React from 'react'

type Props = {}

export default function Snippets({}: Props) {
  return (
    <div>Snippets</div>
  )
}

s - tsrfce
import React from 'react'

type Props = {}

function Snippets({}: Props) {
  return (
    <div>Snippets</div>
  )
}

export default Snippets

s - tsrnf
import { View, Text } from 'react-native'
import React from 'react'

type Props = {}

const Snippets = (props: Props) => {
  return (
    <View>
      <Text>Snippets</Text>
    </View>
  )
}

export default Snippets

s - tsrnfs
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const Snippets = (props: Props) => {
  return (
    <View>
      <Text>Snippets</Text>
    </View>
  )
}

export default Snippets

const styles = StyleSheet.create({})

s - tsrpc
import React, { PureComponent } from 'react'

type Props = {}

export default class Snippets extends PureComponent<Props> {
  render() {
    return (
      <div>Snippets</div>
    )
  }
}

s - tsrpce
import React, { PureComponent } from 'react'

type Props = {}

class Snippets extends PureComponent<Props> {
  render() {
    return (
      <div>Snippets</div>
    )
  }
}

export default Snippets

s - us
'use strict';

s - usea
const {} = useAuth()

s - useCallbackSnippet
useCallback(
  () => {
    first
  },
  [second],
)

s - useContextSnippet
const first = useContext(second)

s - useEffectSnippet
useEffect(() => {
  first

  return () => {
    second
  }
}, [third])

s - useImperativeHandleSnippets
useImperativeHandle(
  first,
  () => {
    second
  },
  [third],
)

s - useLayoutEffectSnippet
useLayoutEffect(() => {
  first

  return () => {
    second
  };
}, [third])

s - useMemoSnippet
useMemo(() => first, [second])

s - useReducerSnippets
const [state, dispatch] = useReducer(first, second, third)

s - useRefSnippet
const first = useRef(second)

s - useStateSnippet
const [first, setfirst] = useState(second)

s - warn
console.warn();


s - while
while (condition) {
  
}

*/

export function Snippets() {
  return (
    <CodeBlock isBordered codeL="TypeScript" codeR="tsx" codeTitle="Snippets" />
  );
}
