// ───────── Card ─────────
export const CARD_CONFIG = {
  title: 'Frontend',
  defaults: {
    border: '0px',
    rounded: '16px',
    borderColor: 'currentColor',
  },
  classes: {
    wrapper: '',
    root: 'flex flex-col gap-4 p-5',
    content: 'flex flex-col gap-4 overflow-hidden overflow-y-auto scrollbar-none',
  },
  maxWidth: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  },
} as const;

// ───────── CodeBlock ─────────
export const CODE_BLOCK_CONFIG = {
  defaults: {
    border: '2px',
    rounded: '16px',
    colorL: 'green',
    colorR: 'green',
    colorTitle: 'white',
    borderColor: 'currentColor',
  },
  locale: 'en-US',
  editTitle: 'Edit',
  classes: {
    root: 'flex-between gap-10 p-3',
    clickable: 'cursor-pointer outline-none',
    left: 'flex items-center gap-2',
    right: 'flex items-center gap-3',
    code: 'flex-center',
  },
  colors: {
    red: 'text-red-300',
    white: 'text-white',
    green: 'text-green-300',
    yellow: 'text-yellow-300',
  },
} as const;

// ───────── Avatar ─────────
export const AVATAR_CONFIG = {
  defaults: { alt: 'Avatar', size: 'md', initials: '?' },
  base: 'rounded-full border-2 bg-gray-300 flex items-center justify-center font-semibold text-gray-700 overflow-hidden shrink-0',
  imageClass: 'w-full h-full object-cover',
  sizes: {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  },
} as const;

// ───────── Badge ─────────
export const BADGE_CONFIG = {
  defaults: { color: 'gray' },
  base: 'text-sm font-medium w-fit border-2 rounded-lg px-3 py-1 h-min',
  deleteWrapper: 'flex items-center gap-2',
  deleteButton: 'hover:opacity-80',
  colors: {
    white: 'text-white border-white',
    red: 'text-red-600 border-red-600',
    blue: 'text-blue-600 border-blue-600',
    gray: 'text-gray-500 border-gray-500',
    green: 'text-green-600 border-green-600',
    yellow: 'text-yellow-600 border-yellow-600',
  },
} as const;

// ───────── Box ─────────
export const BOX_CONFIG = {
  defaults: { rounded: '16px', color: 'white', as: 'div' },
  base: 'flex-center',
} as const;

// ───────── Button ─────────
export const BUTTON_CONFIG = {
  defaults: { variant: 'outline', size: 'md', type: 'button' },
  base: 'font-semibold rounded-lg transition-all flex items-center justify-center gap-2 outline-none whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed!',
  variants: {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md disabled:hover:bg-blue-500',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-900 disabled:hover:bg-gray-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white disabled:hover:bg-red-500',
    outline:
      'border-2 hover:border-white/50 border-white text-white bg-transparent disabled:border-gray-600',
    ghost: 'hover:bg-white/10 text-white disabled:bg-white/10',
  },
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
} as const;

// ───────── IconButton ─────────
export const ICON_BUTTON_CONFIG = {
  defaults: { size: 'md', variant: 'default' },
  base: 'rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  sizes: {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
  },
  variants: {
    default: 'bg-gray-800 text-white hover:bg-gray-700',
    ghost: 'bg-transparent hover:bg-gray-800 text-gray-300',
    destructive: 'bg-red-100 text-red-600 hover:bg-red-200',
  },
} as const;

// ───────── Image ─────────
export const IMAGE_CONFIG = {
  defaults: { alt: '', sizes: 'auto' },
  containerClass: 'overflow-hidden',
  imageClass: 'w-full h-full object-cover transition-transform hover:scale-105',
} as const;

// ───────── Input ─────────
export const INPUT_CONFIG = {
  defaults: { type: 'text' },
  clearLabel: 'Clear input',
  clearIconSize: 18,
  classes: {
    wrapper: 'relative w-full group',
    inner: 'relative flex items-center w-full',
    iconLeft: 'absolute left-3 text-gray-400 pointer-events-none z-10',
    iconRight: 'absolute right-3 text-gray-400 z-10',
    clearButton: 'absolute right-3 text-gray-400 hover:text-white transition-colors z-10',
    error: 'text-xs text-red-400 mt-1 ml-1 block',
    input: [
      'w-full bg-transparent text-white placeholder:text-gray-500 outline-none transition-all',
      'border-2 rounded-xl px-4 py-2.5',
      'focus:border-slate-500 focus:ring-2 focus:ring-blue-500/20',
    ].join(' '),
    inputOk: 'border-white/10',
    inputError: 'border-red-500 focus:ring-red-500/20',
    withIconLeft: 'pl-10',
    withIconRight: 'pr-10',
    range: 'p-0 h-2 accent-slate-500',
    checkbox: 'w-5 h-5 accent-slate-500 cursor-pointer',
  },
} as const;

// ───────── Loading ─────────
export const LOADING_CONFIG = {
  defaults: { text: 'Loading...', fullScreen: false },
  classes: {
    content: 'flex flex-col items-center justify-center gap-3 animate-pulse',
    spinner: 'w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin',
    text: 'text-sm text-gray-400 font-medium',
    fullScreen: 'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center',
  },
} as const;

// ───────── Error ─────────
export const ERROR_CONFIG = {
  defaults: { text: 'Error' },
  classes: {
    wrapper: 'flex justify-center',
    badge: 'border-2 border-red-800 p-1 rounded-full text-center w-32 px-4',
  },
} as const;

// ───────── Единая точка доступа ─────────
export const CONFIG = {
  card: CARD_CONFIG,
  codeBlock: CODE_BLOCK_CONFIG,
  avatar: AVATAR_CONFIG,
  badge: BADGE_CONFIG,
  box: BOX_CONFIG,
  button: BUTTON_CONFIG,
  iconButton: ICON_BUTTON_CONFIG,
  image: IMAGE_CONFIG,
  input: INPUT_CONFIG,
  loading: LOADING_CONFIG,
  error: ERROR_CONFIG,
} as const;
