<script lang="ts">
    import type { BundledLanguage } from "shiki"
    import toast, { type ToastPosition } from "svelte-hot-french-toast"
    import { CodeBlock } from "./CodeBlock"

    const positions = [
        "top-start",
        "top-center",
        "top-end",
        "bottom-start",
        "bottom-center",
        "bottom-end",
    ] as const

    let selected = $state<ToastPosition>("top-center")

    const example: {
        title: string
        action: (position: ToastPosition) => void
        snippet: (position: ToastPosition) => {
            lang: BundledLanguage
            code: string
        }
        html?: boolean
    } = {
        title: "Positioning",
        snippet: (position: ToastPosition) => ({
            lang: "js",
            code: `toast.success("Position set to ${position}", {
	position: "${position}"
})`,
        }),
        action: (position: ToastPosition) => {
            toast.success(`Position set to ${position}`, {
                position: position,
            })
        },
    }
</script>

<div class="mb-5 grid grid-cols-2 gap-4 rounded-xl md:grid-cols-3">
    {#each positions as position}
        <label
            for={position}
            class={[
                "rounded-xl border-2 border-transparent bg-gray-200 p-2 transition-colors hover:border-blue-500",
                { "border-blue-500 font-bold": position === selected },
            ]}
        >
            <input
                class="appearance-none"
                type="radio"
                id={position}
                name="examples"
                value={position}
                onclick={() => {
                    example.action(position)
                }}
                bind:group={selected}
            />
            <span class="font-medium">{position}</span>
        </label>
    {/each}
</div>

{#each positions as position}
    {@const code = example.snippet(position)}
    <div class="space-y-4" class:hidden={position !== selected}>
        <CodeBlock code={code.code} lang={code.lang} />
    </div>
{/each}
