import adapter from "@sveltejs/adapter-static"
import { sveltekit } from "@sveltejs/kit/vite"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit({
            preprocess: vitePreprocess(),
            adapter: adapter(),
            alias: {
                "svelte-hot-french-toast":
                    "src/svelte-hot-french-toast/index.ts",
            },
        }),
    ],
})
