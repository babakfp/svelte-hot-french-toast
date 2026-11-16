import type { PluginConfig as SortImports } from "@ianvs/prettier-plugin-sort-imports"
import type { Config as Prettier } from "prettier"
import type { PluginConfig as Svelte } from "prettier-plugin-svelte"
import type { PluginOptions as TailwindCSS } from "prettier-plugin-tailwindcss"

export default {
    semi: false,
    tabWidth: 4,
    htmlWhitespaceSensitivity: "ignore",
    experimentalTernaries: true,
    experimentalOperatorPosition: "start",
    plugins: [
        "prettier-plugin-svelte",
        "@ianvs/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss",
    ],
    importOrder: ["^@", "<THIRD_PARTY_MODULES>", "^\\$", "^#", "^[.]"],
} satisfies Prettier & Svelte & SortImports & TailwindCSS
