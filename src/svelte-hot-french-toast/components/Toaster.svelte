<script lang="ts">
    import type { DOMToast, ToastOptions, ToastPosition } from "../core/types"
    import useToaster from "../core/useToaster.svelte.js"
    import ToastWrapper from "./ToastWrapper.svelte"

    let {
        reverseOrder,
        position = "top-center",
        toastOptions,
        gutter = 8,
        style,
        class: class_,
    }: {
        reverseOrder?: boolean
        position?: ToastPosition
        toastOptions?: ToastOptions
        gutter?: number
        style?: string
        class?: string
    } = $props()

    const toaster = useToaster(toastOptions)

    const toasts_: DOMToast[] = $derived(
        toaster.toasts.map((toast) => ({
            ...toast,
            position: toast.position || position,
            offset: toaster.handlers.calculateOffset(toast, toaster.toasts, {
                reverseOrder,
                gutter,
                defaultPosition: position,
            }),
        })),
    )
</script>

<div
    class="toaster {class_}"
    {style}
    onmouseenter={toaster.handlers.pause}
    onmouseleave={toaster.handlers.resume}
    role="alert"
>
    {#each toasts_ as toast (toast.id)}
        <ToastWrapper
            {toast}
            setHeight={(height) =>
                toaster.handlers.updateHeight(toast.id, height)}
        />
    {/each}
</div>

<style>
    .toaster {
        --default-offset: 16px;

        position: fixed;
        z-index: 9999;
        inset: var(--default-offset);
        pointer-events: none;
    }
</style>
