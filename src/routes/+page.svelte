<script lang="ts">
    import IconCheckBold from "phosphor-icons-svelte/IconCheckBold.svelte"
    import IconSparkleFill from "phosphor-icons-svelte/IconSparkleFill.svelte"
    import toast, { Toaster } from "svelte-hot-french-toast"
    import ChangePositionExamples from "$lib/ChangePositionExamples.svelte"
    import { CodeBlock } from "$lib/CodeBlock"
    import Examples from "$lib/Examples.svelte"
    import usageCode from "$lib/UsageCode.svelte?raw"

    const makeToast = () => {
        toast.promise(
            new Promise((resolve, reject) => {
                setTimeout(Math.random() < 0.8 ? resolve : reject, 1000)
            }),
            {
                loading: "Toasting bread...",
                success: "Here’s your toast!",
                error: "Your toast burned :(",
            },
        )
    }
</script>

<Toaster />

<section class="bg-amber-50 py-24">
    <div class="container flex max-w-xl flex-col items-center text-center">
        <img class="mb-10 h-16" src="favicon.png" alt="" />
        <div
            class="mb-10 flex flex-col items-center space-y-3 text-white md:flex-row md:space-y-0 md:space-x-3"
        >
            <div
                class="-rotate-2 rounded-xl bg-gray-700 p-4 text-xl font-extrabold tracking-widest uppercase shadow-lg md:text-2xl"
            >
                Svelte
            </div>
            <div
                class="rotate-3 rounded-xl bg-orange-500 p-4 text-xl font-extrabold tracking-widest uppercase shadow-lg md:text-2xl"
            >
                Hot French
            </div>
            <div
                class="-rotate-2 rounded-xl bg-gray-700 p-4 text-xl font-extrabold tracking-widest uppercase shadow-lg md:text-2xl"
            >
                Toast
            </div>
        </div>
        <h1 class="text-3xl font-bold md:text-5xl">
            Buttery smooth toast notifications.
        </h1>
        <p class="mt-10 max-w-prose text-lg md:text-xl">
            Lightweight, customizable, and beautiful by default.
        </p>
        <div class="mt-10 flex items-center space-x-4">
            <button
                onclick={makeToast}
                class="flex items-center space-x-2 rounded-xl border-2 border-amber-400 bg-amber-300 px-5 py-2 text-lg font-bold shadow"
            >
                <IconSparkleFill class="text-xl" />
                <span>Make toast</span>
            </button>
            <a
                href="https://github.com/babakfp/svelte-hot-french-toast"
                class="flex items-center space-x-2 rounded-xl border-2 border-gray-100 bg-gray-50 px-5 py-2 text-lg"
            >
                <span>Source</span>
            </a>
        </div>
        <div
            class="mt-10 grid grid-cols-2 gap-4 self-stretch font-medium md:grid-cols-3"
        >
            {#each ["Emoji Support", "Customizable", "Promise API", "Pause on hover", "Accessible", "Headless use"] as feature}
                <div class="flex space-x-2">
                    <IconCheckBold class="text-xl text-green-600" />
                    <p>{feature}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<div class="h-8 bg-gradient-to-b from-amber-50 to-gray-100"></div>

<div class="container max-w-2xl space-y-24 pt-24">
    <section class="space-y-8">
        <div>
            <h2 class="mb-4 text-xl font-bold">Installation</h2>
            <CodeBlock
                code="pnpm add -D svelte-hot-french-toast"
                lang="shell"
            />
        </div>
        <div>
            <h2 class="mb-4 text-xl font-bold">Usage</h2>
            <CodeBlock code={usageCode} lang="svelte" />
        </div>
    </section>

    <section>
        <h2 class="mb-4 text-xl font-bold">Examples</h2>
        <Examples />
    </section>

    <section>
        <h2 class="mb-4 text-xl font-bold">Change Position</h2>
        <ChangePositionExamples />
    </section>
</div>

<div class="h-8 bg-gradient-to-b from-gray-100 to-white"></div>

<footer class="bg-white pt-24 pb-4">
    <div class="container max-w-2xl space-y-2 text-center">
        <a
            class="underline"
            href="https://github.com/babakfp/svelte-hot-french-toast"
        >
            GitHub
        </a>
    </div>
</footer>
