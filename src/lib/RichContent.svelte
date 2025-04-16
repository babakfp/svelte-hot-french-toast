<script lang="ts">
    import toast_, { type Toast } from "svelte-hot-french-toast"

    let {
        toast,
        myText,
    }: {
        toast: Toast
        myText: string
    } = $props()
</script>

<span>
    Custom and <b>{myText}</b>
    <button onclick={() => toast_.dismiss(toast.id)}>Dismiss</button>
</span>
