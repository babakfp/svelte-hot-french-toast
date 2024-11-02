import toast from "./core/toast"

export type {
    ToastOptions,
    ToastPosition,
    Toast,
    Renderable,
    ValueOrFunction,
    DefaultToastOptions,
    IconTheme,
    ToastType,
    ValueFunction,
} from "./core/types"

export { default as useToaster } from "./core/useToaster.svelte.js"
export { useToasterStore } from "./core/store.svelte.js"
export { default as ToastBar } from "./components/ToastBar.svelte"
export { default as ToastIcon } from "./components/ToastIcon.svelte"
export { default as Toaster } from "./components/Toaster.svelte"
export * from "./components/icons"
export { resolveValue } from "./core/types"

export { toast }
export default toast
