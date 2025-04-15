<script lang="ts">
    import IconCopySimpleFill from "phosphor-icons-svelte/IconCopySimpleFill.svelte"
    import toast from "svelte-hot-french-toast"

    let {
        text,
    }: {
        text: string
    } = $props()

    const copy = (text: string) => {
        const promise = navigator.clipboard.writeText(text)
        toast.promise(promise, {
            loading: "Copying...",
            success: "Copied!",
            error: "Could not copy!",
        })
    }
</script>

<button
    class="invisible absolute top-0 -right-4 flex bg-white/10 p-2 text-white group-[&:focus-within]:visible group-[&:hover]:visible hover:bg-white/15 sm:top-2 sm:right-2 sm:rounded-md"
    onclick={() => copy(text)}
>
    <IconCopySimpleFill />
</button>
