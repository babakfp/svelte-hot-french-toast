<script lang="ts">
    import { untrack, type Snippet } from "svelte"
    import type { DOMToast } from "../core/types"
    import { prefersReducedMotion } from "../core/utils"
    import ToastBar from "./ToastBar.svelte"
    import ToastMessage from "./ToastMessage.svelte"

    let {
        toast,
        setHeight,
        children,
    }: {
        toast: DOMToast
        setHeight: (height: number) => void
        children?: Snippet<[{ toast: DOMToast }]>
    } = $props()

    let clientHeight = $state<number>()

    $effect(() => {
        untrack(() => {
            if (typeof clientHeight !== "number") return
            setHeight(clientHeight)
        })
        const _dependency = clientHeight
    })

    const top = $derived(toast.position?.includes("top") ? 0 : undefined)
    const bottom = $derived(toast.position?.includes("bottom") ? 0 : undefined)
    const factor = $derived(toast.position?.includes("top") ? 1 : -1)
    const justifyContent = $derived(
        (toast.position?.includes("center") && "center")
            || (toast.position?.includes("end") && "flex-end")
            || undefined,
    )
</script>

<div
    bind:clientHeight
    class="wrapper"
    class:active={toast.visible}
    class:transition={!prefersReducedMotion()}
    style:--factor={factor}
    style:--offset={toast.offset}
    style:top
    style:bottom
    style:justify-content={justifyContent}
>
    {#if toast.type === "custom"}
        <ToastMessage {toast} />
    {:else if children}
        {@render children({ toast })}
    {:else}
        <ToastBar {toast} position={toast.position} />
    {/if}
</div>

<style>
    .wrapper {
        inset-inline: 0;
        display: flex;
        position: absolute;
        transform: translateY(calc(var(--offset, 16px) * var(--factor) * 1px));
    }

    .transition {
        transition: all 230ms cubic-bezier(0.21, 1.02, 0.73, 1);
    }

    .active {
        z-index: 9999;
    }

    .active > :global(*) {
        pointer-events: auto;
    }
</style>
