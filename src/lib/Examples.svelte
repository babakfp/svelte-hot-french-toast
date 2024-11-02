<script lang="ts">
    import { CodeBlock } from "./CodeBlock"
    import examples from "./examples"

    let selected = $state("Success")
</script>

<div class="mb-5 grid grid-cols-2 gap-4 rounded-xl md:grid-cols-3">
    {#each examples as example (example.title)}
        <label
            for={example.title}
            class="cursor-pointer rounded-xl border-2 border-transparent bg-gray-200 p-2 transition-colors hover:border-blue-500"
            class:checked={example.title === selected}
        >
            <input
                type="radio"
                id={example.title}
                name="examples"
                value={example.title}
                onclick={() => {
                    example.action()
                }}
                bind:group={selected}
            />
            <span class="mr-1">{example.emoji}</span>
            <span class="font-medium">{example.title}</span>
        </label>
    {/each}
</div>
{#each examples as example}
    <div class="space-y-4" class:hidden={example.title !== selected}>
        {#if Array.isArray(example.snippet)}
            {#each example.snippet as snippet}
                <div>
                    <CodeBlock code={snippet.code} lang={snippet.lang} />
                </div>
            {/each}
        {:else}
            <CodeBlock
                code={example.snippet.code}
                lang={example.snippet.lang}
            />
        {/if}
    </div>
{/each}

<style lang="postcss">
    input[type="radio"] {
        @apply appearance-none;
    }
    .checked {
        @apply border-blue-500 font-bold;
    }
</style>
