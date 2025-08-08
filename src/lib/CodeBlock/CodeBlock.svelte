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
