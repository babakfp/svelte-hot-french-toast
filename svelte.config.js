import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import("@sveltejs/kit").Config} */
export default {
    kit: {
        adapter: adapter(),
        alias: {
            "~": ".",
            "svelte-hot-french-toast": "src/svelte-hot-french-toast/index.ts",
        },
    },
    preprocess: vitePreprocess(),
}
