import type { DefaultToastOptions, Toast, ToastType } from "./types"

const TOAST_LIMIT = 20
const TOAST_EXPIRE_DISMISS_DELAY = 1000

type State = {
    toasts: Toast[]
    pausedAt: number
}

let toasts: State["toasts"] = $state([])
let pausedAt: State["pausedAt"] = $state(0)

const toastTimeouts = new Map<Toast["id"], ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
    if (toastTimeouts.has(toastId)) {
        return
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId)
        remove(toastId)
    }, TOAST_EXPIRE_DISMISS_DELAY)

    toastTimeouts.set(toastId, timeout)
}

const clearFromRemoveQueue = (toastId: string) => {
    const timeout = toastTimeouts.get(toastId)
    if (timeout) {
        clearTimeout(timeout)
    }
}

export const update = (toast: Partial<Toast>, clearTimeout = true) => {
    if (clearTimeout && toast.id) {
        clearFromRemoveQueue(toast.id)
    }
    toasts = toasts.map((t) => (t.id === toast.id ? { ...t, ...toast } : t))
}

export const add = (toast: Toast) => {
    toasts.unshift(toast)
    toasts = toasts.slice(0, TOAST_LIMIT)
}

export const upsert = (toast: Toast) => {
    if (toasts.find((t) => t.id === toast.id)) {
        update(toast)
    } else {
        add(toast)
    }
}

export const dismiss = (toastId?: Toast["id"]) => {
    if (toastId) {
        addToRemoveQueue(toastId)
    } else {
        toasts.forEach((toast) => {
            addToRemoveQueue(toast.id)
        })
    }

    toasts = toasts.map((t) =>
        t.id === toastId || toastId === undefined ?
            { ...t, visible: false }
        :   t,
    )
}

export const remove = (toastId?: Toast["id"]) => {
    if (toastId === undefined) {
        toasts = []
    }

    toasts = toasts.filter((t) => t.id !== toastId)
}

export const pause = (time: number) => {
    pausedAt = time
}

export const resume = (time: number) => {
    const timeSincePaused = time - pausedAt

    toasts = toasts.map((t) => ({
        ...t,
        pauseDuration: t.pauseDuration + timeSincePaused,
    }))

    pausedAt = 0
}

const defaultTimeouts: {
    [key in ToastType]: number
} = {
    blank: 4000,
    error: 4000,
    success: 2000,
    loading: Infinity,
    custom: 4000,
    warning: 4000,
    info: 4000,
}

export const useToasterState = (
    toastOptions: DefaultToastOptions = {},
): State => {
    const mergedToasts = $derived(
        toasts.map((t) => ({
            ...toastOptions,
            ...toastOptions[t.type],
            ...t,
            duration:
                t.duration
                || toastOptions[t.type]?.duration
                || toastOptions?.duration
                || defaultTimeouts[t.type],
            style: [
                toastOptions.style,
                toastOptions[t.type]?.style,
                t.style,
            ].join(";"),
        })),
    )

    return {
        get toasts() {
            return mergedToasts
        },
        get pausedAt() {
            return pausedAt
        },
    }
}
