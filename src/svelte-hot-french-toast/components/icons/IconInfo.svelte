<script lang="ts">
    import type { IconTheme } from "../../core/types"

    let { primary, secondary }: Partial<IconTheme> = $props()
</script>

<div style:--primary={primary} style:--secondary={secondary}>
    <div class="circle"></div>
    <!-- prettier-ignore -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 484 484"><path fill="currentColor" fill-rule="evenodd" d="M242 124c11.046 0 20 8.866 20 19.803v130.394c0 10.937-8.954 19.803-20 19.803s-20-8.866-20-19.803V143.803c0-10.937 8.954-19.803 20-19.803Z" clip-rule="evenodd"/><path fill="currentColor" d="M242 310c13.798 0 25 11.202 25 25s-11.202 25-25 25-25-11.202-25-25 11.202-25 25-25Z"/></svg>
</div>

<style>
    div {
        width: 20px;
        height: 20px;
        position: relative;
    }

    div::before {
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: 2px solid var(--primary, #0096ff);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: outline-animation 300ms forwards;
        animation-delay: 100ms;
    }

    @keyframes outline-animation {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        20% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.25);
            opacity: 0;
        }
    }

    div .circle {
        opacity: 0;
        border-radius: 10px;
        background: var(--primary, #0096ff);
        animation: circle-animation 200ms
            cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        animation-delay: 160ms;
    }

    @keyframes circle-animation {
        from {
            transform: scale(0);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    svg {
        color: var(--secondary, #fff);
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        transform: scale(1.1);
    }
</style>
