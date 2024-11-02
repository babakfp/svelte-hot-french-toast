import {
    pause as _pause,
    resume as _resume,
    update,
    useToasterStore,
} from "./store.svelte.js"
import toast from "./toast.js"
import type { Toast, ToastOptions, ToastPosition } from "./types.js"

const calculateOffset = (
    toast: Toast,
    toasts: Toast[],
    opts?: {
        reverseOrder?: boolean
        gutter?: number
        defaultPosition?: ToastPosition
    },
) => {
    const { reverseOrder, gutter = 8, defaultPosition } = opts || {}

    const relevantToasts = toasts.filter(
        (t) =>
            (t.position || defaultPosition) ===
                (toast.position || defaultPosition) && t.height,
    )
    const toastIndex = relevantToasts.findIndex((t) => t.id === toast.id)
    const toastsBefore = relevantToasts.filter(
        (toast, i) => i < toastIndex && toast.visible,
    ).length

    const offset = relevantToasts
        .filter((t) => t.visible)
        .slice(...(reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]))
        .reduce((acc, t) => acc + (t.height || 0) + gutter, 0)

    return offset
}

const handlers = {
    pause() {
        _pause(Date.now())
    },
    resume() {
        _resume(Date.now())
    },
    updateHeight: (toastId: string, height: number) => {
        update({ id: toastId, height })
    },
    calculateOffset,
}

export default (toastOptions?: ToastOptions) => {
    const toaster = useToasterStore(toastOptions)
    const timeouts = new Map<Toast["id"], ReturnType<typeof setTimeout>>()

    $effect(() => {
        if (toaster.pausedAt) {
            timeouts.values().forEach((id) => clearTimeout(id))
            timeouts.clear()
        } else {
            const now = Date.now()

            for (const t of toaster.toasts) {
                if (timeouts.has(t.id) || t.duration === Infinity) {
                    continue
                }

                const timeSinceCreated = now - t.createdAt
                const totalDuration = (t.duration || 0) + t.pauseDuration
                const timeLeft = totalDuration - timeSinceCreated
                const hasLifeTime = timeLeft > 0

                if (hasLifeTime) {
                    const timeout = setTimeout(
                        () => toast.dismiss(t.id),
                        timeLeft,
                    )
                    timeouts.set(t.id, timeout)
                } else {
                    if (t.visible) {
                        toast.dismiss(t.id)
                    }
                }
            }
        }
    })

    return {
        get toasts() {
            return toaster.toasts
        },
        handlers,
    }
}
