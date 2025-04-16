<script lang="ts">
    import toast, { Toaster } from "svelte-hot-french-toast"

    const makeToast = () => {
        toast.success("Hello, World!")
    }
</script>

<Toaster />

<button onclick={makeToast}>Toast</button>
