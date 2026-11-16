import type { BundledLanguage } from "shiki"
import toast from "svelte-hot-french-toast"
import RichContent from "./RichContent.svelte"
import richContent from "./RichContent.svelte?raw"

type Example = {
    title: string
    action: () => void
    emoji: string
    snippet:
        | { lang: BundledLanguage; code: string }
        | { lang: BundledLanguage; code: string }[]
    html?: boolean
}

export default [
    {
        title: "Success",
        emoji: "✅",
        snippet: {
            lang: "js",
            code: `toast.success("Successfully toasted!")`,
        },
        action: () => {
            toast.success("Successfully toasted!")
        },
    },
    {
        title: "Error",
        emoji: "❌",
        snippet: {
            lang: "js",
            code: `toast.error("This didn't work.")`,
        },
        action: () => {
            toast.error("This didn't work.")
        },
    },
    {
        title: "Promise",
        emoji: "⏳",
        snippet: {
            lang: "js",
            code: `toast.promise(
	saveSettings(settings),
	{
		loading: "Saving...",
		success: "Settings saved!",
		error: "Could not save!",
	}
)`,
        },
        action: () => {
            const promise = new Promise((resolve, reject) => {
                setTimeout(Math.random() < 0.8 ? resolve : reject, 1000)
            })

            toast.promise(promise, {
                loading: "Saving...",
                success: "Settings saved!",
                error: "Could not save!",
            })
        },
    },
    {
        title: "Multiline",
        emoji: "↩️",
        snippet: {
            lang: "js",
            code: `toast(
	"This toast is super big. I don't think anyone could eat it in one bite.\\n\\nIt's larger than you expected. You eat it but it does not seem to get smaller.",
	{
		duration: 6000,
	}
)`,
        },
        action: () => {
            toast(
                "This toast is super big. I don't think anyone could eat it in one bite.\n\n It's larger than you expected. You eat it but it does not seem to get smaller.",
                {
                    duration: 6000,
                },
            )
        },
    },
    {
        title: "Emoji",
        emoji: "👏",
        snippet: {
            lang: "js",
            code: `toast("Good Job!", {
	icon: "👏",
})`,
        },
        action: () => {
            toast("Good Job!", {
                icon: "👏",
            })
        },
    },
    {
        title: "Dark mode",
        emoji: "🌚",
        snippet: {
            lang: "js",
            code: `toast("Hello Darkness!", {
	icon: "👏",
	style: "border-radius: 200px; background: #333; color: #fff;"
})`,
        },
        action: () => {
            toast("Hello Darkness!", {
                icon: "👏",
                style: "border-radius: 200px; background: #333; color: #fff;",
            })
        },
    },
    {
        title: "Rich content",
        emoji: "🔩",
        snippet: [
            {
                lang: "svelte",
                code: `<script lang="ts">
	import toast from "svelte-hot-french-toast"
    import RichContent from "./RichContent.svelte"

	toast(RichContent, { props: { myText: "bold" } })
</script>`,
            },
            {
                lang: "svelte",
                code: `// RichContent.svelte

${richContent}`,
            },
        ],
        html: true,
        action: () => {
            toast(RichContent, { props: { myText: "bold" } })
        },
    },
    {
        title: "Themed",
        emoji: "🎨",
        snippet: {
            lang: "js",
            code: `toast.success("Look at me!", {
	style: "border: 1px solid #713200; color: #713200;",
	iconTheme: {
		primary: "#713200",
		secondary: "#FFFAEE"
	}
})`,
        },

        action: () => {
            toast.success("Look at me!", {
                style: "border: 1px solid #713200; color: #713200;",
                iconTheme: {
                    primary: "#713200",
                    secondary: "#FFFAEE",
                },
            })
        },
    },
    {
        title: "Positioning",
        emoji: "⬆️",
        snippet: {
            lang: "js",
            code: `toast.success("Always at the bottom.", {
	position: "bottom-center"
})`,
        },
        action: () => {
            toast.success("Always at the bottom.", {
                position: "bottom-center",
                duration: 10000,
            })
        },
    },
    {
        title: "Warning",
        emoji: "⚠️",
        snippet: {
            lang: "js",
            code: `toast.warning("Be careful!")`,
        },
        action: () => {
            toast.warning("Be careful!")
        },
    },
    {
        title: "Info",
        emoji: "ℹ️",
        snippet: {
            lang: "js",
            code: `toast.info("This is some info.")`,
        },
        action: () => {
            toast.info("This is some info.")
        },
    },
] satisfies Example[]
