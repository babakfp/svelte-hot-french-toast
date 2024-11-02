<script lang="ts">
    import pkg from "~/package.json"
    import IconCheckBold from "phosphor-icons-svelte/IconCheckBold.svelte"
    import IconCodeBold from "phosphor-icons-svelte/IconCodeBold.svelte"
    import IconSparkleFill from "phosphor-icons-svelte/IconSparkleFill.svelte"
    import toast, { Toaster } from "svelte-hot-french-toast"
    import { CodeBlock } from "$lib/CodeBlock"
    import demoCode from "$lib/demoCode"
    import Examples from "$lib/Examples.svelte"

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
            class="mb-10 flex flex-col items-center space-y-3 text-white md:flex-row md:space-x-3 md:space-y-0"
        >
            <div
                class="-rotate-2 rounded-xl bg-[#322f35] p-4 text-xl font-extrabold uppercase tracking-widest shadow-lg md:text-2xl"
            >
                Svelte
            </div>
            <div
                class="rotate-3 rounded-xl bg-[#fd6819] p-4 text-xl font-extrabold uppercase tracking-widest shadow-lg md:text-2xl"
            >
                Hot French
            </div>
            <div
                class="-rotate-2 rounded-xl bg-[#322f35] p-4 text-xl font-extrabold uppercase tracking-widest shadow-lg md:text-2xl"
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
                class="flex items-center space-x-2 text-gray-500"
            >
                <IconCodeBold class="text-xl" />
                <span>Source</span>
            </a>
        </div>
        <a
            class="mt-5 rounded-full border px-2 py-1 text-sm text-gray-500"
            href="https://npmjs.com/package/svelte-hot-french-toast"
        >
            Version {pkg.version}
        </a>
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
            <CodeBlock code={demoCode} lang="svelte" />
        </div>
    </section>

    <section>
        <h2 class="mb-4 text-xl font-bold">Examples</h2>
        <Examples />
    </section>
</div>

<div class="h-8 bg-gradient-to-b from-gray-100 to-white"></div>

<footer class="bg-white pb-4 pt-24">
    <div class="container max-w-2xl space-y-2 text-center">
        <a
            class="underline"
            href="https://github.com/babakfp/svelte-hot-french-toast"
        >
            GitHub
        </a>
    </div>
</footer>
