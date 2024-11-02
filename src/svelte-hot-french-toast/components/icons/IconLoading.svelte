<script lang="ts">
    import type { IconTheme } from "../../core/types"

    let { primary, secondary }: Partial<IconTheme> = $props()
</script>

<div style:--primary={primary} style:--secondary={secondary}></div>

<style>
    div {
        width: 12px;
        height: 12px;
        box-sizing: border-box;
        border: 2px solid;
        border-radius: 100%;
        border-color: var(--secondary, #e0e0e0);
        border-inline-end-color: var(--primary, #616161);
        animation: rotate 1s linear infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
