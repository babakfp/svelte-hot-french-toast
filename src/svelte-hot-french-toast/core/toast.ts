import { dismiss, remove, upsert } from "./state.svelte"
import {
    resolveValue,
    type DefaultToastOptions,
    type Renderable,
    type Toast,
    type ToastOptions,
    type ToastType,
    type ValueOrFunction,
} from "./types"
import { genId } from "./utils"

type Message<T extends Record<string, unknown> = Record<string, unknown>> =
    Renderable<T>

type ToastHandler = <
    T extends Record<string, unknown> = Record<string, unknown>,
>(
    message: Message<T>,
    options?: ToastOptions<T>,
) => string

const createToast = <
    T extends Record<string, unknown> = Record<string, unknown>,
>(
    message: Message<T>,
    type: ToastType = "blank",
    opts?: ToastOptions<T>,
): Toast<T> => ({
    createdAt: Date.now(),
    visible: true,
    type,
    ariaProps: {
        role: "status",
        "aria-live": "polite",
    },
    message,
    pauseDuration: 0,
    ...opts,
    id: opts?.id || genId(),
})

const createHandler = (type?: ToastType): ToastHandler => {
    return (message, options) => {
        const toast = createToast(message, type, options)
        // @ts-expect-error: TODO: I have no idea how to fix this.
        upsert(toast)
        return toast.id
    }
}

const toast = <T extends Record<string, unknown> = Record<string, unknown>>(
    message: Message<T>,
    opts?: ToastOptions<T>,
) => createHandler("blank")(message, opts)

toast.error = createHandler("error")
toast.success = createHandler("success")
toast.loading = createHandler("loading")
toast.custom = createHandler("custom")
toast.warning = createHandler("warning")
toast.info = createHandler("info")

toast.dismiss = (toastId?: string) => {
    dismiss(toastId)
}

toast.remove = (toastId?: string) => remove(toastId)

toast.promise = <T>(
    promise: Promise<T>,
    msgs: {
        loading: Renderable
        success: ValueOrFunction<Renderable, T>
        error: ValueOrFunction<Renderable, unknown>
    },
    opts?: DefaultToastOptions,
) => {
    const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading })

    promise
        .then((p) => {
            toast.success(resolveValue(msgs.success, p), {
                id,
                ...opts,
                ...opts?.success,
            })
            return p
        })
        .catch((e) => {
            toast.error(resolveValue(msgs.error, e), {
                id,
                ...opts,
                ...opts?.error,
            })
        })

    return promise
}

export default toast
