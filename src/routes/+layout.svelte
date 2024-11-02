<script lang="ts">
    import "../app.css"
    import "@fontsource-variable/recursive/mono.css"
    import type { Snippet } from "svelte"

    let {
        children,
    }: {
        children?: Snippet
    } = $props()
</script>

<svelte:head>
    <title>Svelte Hot French Toast</title>
    <meta name="title" content="Svelte Hot French Toast" />
    <meta
        name="description"
        content="Buttery smooth toast notifications for Svelte 5. Lightweight, customizable, and beautiful by default."
    />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta
        property="og:url"
        content="https://svelte-hot-french-toast.vercel.app"
    />
    <meta property="og:title" content="Svelte Hot French Toast" />
    <meta
        property="og:description"
        content="Buttery smooth toast notifications for Svelte 5. Lightweight, customizable, and beautiful by default."
    />
    <meta
        property="og:image"
        content="https://svelte-hot-french-toast.vercel.app/og-image.png"
    />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta
        property="twitter:url"
        content="https://svelte-hot-french-toast.vercel.app/"
    />
    <meta property="twitter:title" content="Svelte Hot French Toast" />
    <meta
        property="twitter:description"
        content="Buttery smooth toast notifications for Svelte 5. Lightweight, customizable, and beautiful by default."
    />
    <meta
        property="twitter:image"
        content="https://svelte-hot-french-toast.vercel.app/og-image.png"
    />
</svelte:head>

{@render children?.()}
