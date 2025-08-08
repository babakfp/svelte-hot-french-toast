<script lang="ts">
    import type { Toast } from "../core/types"

    let {
        toast,
    }: {
        toast: Toast
    } = $props()
</script>

<div class="svelte-hot-french-toast__message" {...toast.ariaProps}>
    {#if typeof toast.message === "string"}
        {toast.message}
    {:else}
        <toast.message {toast} {...toast.props} />
    {/if}
</div>

<style>
    .svelte-hot-french-toast__message {
        display: flex;
        justify-content: center;
        margin: 4px 10px;
        color: inherit;
        flex: 1 1 auto;
        white-space: pre-line;
    }
</style>
