<script lang="ts">
    import type { Snippet } from "svelte"
    import type { DOMToast, ToastOptions, ToastPosition } from "../core/types"
    import useToaster from "../core/useToaster.svelte"
    import ToastWrapper from "./ToastWrapper.svelte"

    let {
        reverseOrder,
        position = "top-center",
        toastOptions,
        gutter = 8,
        style,
        class: class_,
        children,
    }: {
        reverseOrder?: boolean
        position?: ToastPosition
        toastOptions?: ToastOptions
        gutter?: number
        style?: string
        class?: string
        children?: Snippet<[{ toasts: DOMToast[] }]>
    } = $props()

    const toaster = useToaster(toastOptions)

    const toasts: DOMToast[] = $derived(
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
    {#if children}
        {@render children({ toasts })}
    {:else}
        {#each toasts as toast (toast.id)}
            <ToastWrapper
                {toast}
                setHeight={(height) => {
                    return toaster.handlers.updateHeight(toast.id, height)
                }}
            />
        {/each}
    {/if}
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
