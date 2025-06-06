<script lang="ts">
    import type { Snippet } from "svelte"
    import type { Toast, ToastPosition } from "../core/types"
    import { prefersReducedMotion } from "../core/utils"
    import ToastIcon from "./ToastIcon.svelte"
    import ToastMessage from "./ToastMessage.svelte"

    let {
        toast,
        position,
        style,
        children,
    }: {
        toast: Toast
        position?: ToastPosition
        style?: string
        children?: Snippet<
            [
                {
                    toast: Toast
                    ToastIcon: typeof ToastIcon
                    ToastMessage: typeof ToastMessage
                },
            ]
        >
    } = $props()

    const factor = $derived.by(() => {
        const top = (toast.position || position || "top-center").includes("top")
        return top ? 1 : -1
    })

    const animation = $derived.by(() => {
        const [enter, exit] =
            prefersReducedMotion() ? ["fade-in", "fade-out"] : ["enter", "exit"]
        return toast.visible ? enter : exit
    })
</script>

<div
    class="base {toast.height ? animation : 'transparent'} {toast.class}"
    style="{style}; {toast.style}"
    style:--factor={factor}
>
    {#if children}
        {@render children({
            toast,
            ToastIcon,
            ToastMessage,
        })}
    {:else}
        <ToastIcon
            type={toast.type}
            icon={toast.icon}
            iconTheme={toast.iconTheme}
        />
        <ToastMessage {toast} />
    {/if}
</div>

<style>
    .base {
        display: flex;
        align-items: center;
        background: #fff;
        color: #363636;
        line-height: 1.3;
        will-change: transform;
        box-shadow:
            0 3px 10px rgba(0, 0, 0, 0.1),
            0 3px 3px rgba(0, 0, 0, 0.05);
        max-width: 350px;
        pointer-events: auto;
        padding: 8px 10px;
        border-radius: 8px;
    }

    .transparent {
        opacity: 0;
    }

    .enter {
        animation: enter-animation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1)
            forwards;
    }

    .exit {
        animation: exit-animation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1)
            forwards;
    }

    .fade-in {
        animation: fade-in-animation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1)
            forwards;
    }

    .fade-out {
        animation: fade-out-animation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1)
            forwards;
    }

    @keyframes enter-animation {
        0% {
            transform: translate3d(0, calc(var(--factor) * -200%), 0) scale(0.6);
            opacity: 0.5;
        }
        100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 1;
        }
    }

    @keyframes exit-animation {
        0% {
            transform: translate3d(0, 0, -1px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate3d(0, calc(var(--factor) * -150%), -1px)
                scale(0.6);
            opacity: 0;
        }
    }

    @keyframes fade-in-animation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes fade-out-animation {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>
