import toast from "./core/toast.js"

export type {
    ToastOptions,
    ToastPosition,
    Toast,
    Renderable,
    ValueOrFunction,
    DefaultToastOptions,
    PromiseToastOptions,
    IconTheme,
    ToastType,
    ValueFunction,
} from "./core/types.js"

export { default as useToaster } from "./core/useToaster.svelte.js"
export { useToasterState } from "./core/state.svelte.js"
export { default as ToastBar } from "./components/ToastBar.svelte"
export { default as ToastIcon } from "./components/ToastIcon.svelte"
export { default as Toaster } from "./components/Toaster.svelte"
export * from "./components/icons/index.js"
export { resolveValue } from "./core/types.js"

export { toast }
export default toast
