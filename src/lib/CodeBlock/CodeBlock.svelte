<script lang="ts">
    import { codeToHtml, type BundledLanguage } from "shiki"
    import Copy from "./Copy.svelte"

    let { code, lang }: { code: string; lang: BundledLanguage } = $props()

    const htmlPromise = codeToHtml(code, { lang, theme: "github-dark-dimmed" })
</script>

{#await htmlPromise}
    <p>Loading...</p>
{:then html}
    <div class="group relative">
        {@html html}
        <Copy text={code} />
    </div>
{:catch error}
    <p>{error}</p>
{/await}

<style lang="postcss">
    :global pre {
        @apply -mx-4 block select-text overflow-x-auto p-4 selection:bg-white/10 sm:mx-0 sm:rounded-xl sm:p-6;
    }
</style>
