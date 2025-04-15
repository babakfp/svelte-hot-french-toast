<script lang="ts">
    import toast_, { type Toast } from "svelte-hot-french-toast"

    let {
        toast,
        someProp,
    }: {
        toast: Toast
        someProp: string
    } = $props()
</script>

<span>
    Custom and <b>bold</b>
    with props like {someProp}!
    <button onclick={() => toast_.dismiss(toast.id)}>Dismiss</button>
</span>
