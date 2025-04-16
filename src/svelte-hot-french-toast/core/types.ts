import type { Component } from "svelte"

export type ToastType =
    | "success"
    | "error"
    | "info"
    | "loading"
    | "blank"
    | "custom"
    | "warning"

export type ToastPosition =
    | "top-start"
    | "top-center"
    | "top-end"
    | "bottom-start"
    | "bottom-center"
    | "bottom-end"

export type Renderable<
    T extends Record<string, unknown> = Record<string, unknown>,
> = Component<T> | string | undefined

export type IconTheme = {
    primary: string
    secondary: string
}

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>

const isFunction = <TValue, TArg>(
    valOrFunction: ValueOrFunction<TValue, TArg>,
): valOrFunction is ValueFunction<TValue, TArg> =>
    typeof valOrFunction === "function"

export const resolveValue = <TValue, TArg>(
    valOrFunction: ValueOrFunction<TValue, TArg>,
    arg: TArg,
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction)

export type Toast<T extends Record<string, unknown> = Record<string, unknown>> =
    {
        type: ToastType
        id: string
        message: Renderable<T>
        icon?: Renderable
        duration?: number
        pauseDuration: number
        position?: ToastPosition

        // We use `Omit` here in the case that the Component has `let { toast }: { toast: Toast } = $props()`.
        // We are already passing the toast to the component, and it should not be included in props.
        props?: Omit<T, "toast">

        ariaProps: {
            role: "status" | "alert"
            "aria-live": "assertive" | "off" | "polite"
        }

        style?: string
        class?: string
        iconTheme?: IconTheme

        createdAt: number
        visible: boolean
        height?: number
    }

export type DOMToast<
    T extends Record<string, unknown> = Record<string, unknown>,
> = Toast<T> & {
    offset: number
}

export type ToastOptions<
    T extends Record<string, unknown> = Record<string, unknown>,
> = Partial<
    Pick<
        Toast<T>,
        | "id"
        | "icon"
        | "duration"
        | "ariaProps"
        | "class"
        | "style"
        | "position"
        | "iconTheme"
        | "props"
    >
>

export type DefaultToastOptions = ToastOptions & {
    [key in ToastType]?: ToastOptions
}
