<script lang="ts">
    import type { Toast } from "../core/types"
    import { IconError, IconLoading, IconSuccess } from "./icons"

    let {
        type,
        icon,
        iconTheme,
    }: {
        type: Toast["type"]
        icon: Toast["icon"]
        iconTheme: Toast["iconTheme"]
    } = $props()
</script>

{#if typeof icon === "string"}
    <div class="animated">{icon}</div>
{:else if typeof icon !== "undefined"}
    {@const SvelteComponent = icon}
    <SvelteComponent />
{:else if type !== "blank"}
    <div class="indicator">
        <IconLoading {...iconTheme} />
        {#if type !== "loading"}
            <div class="status">
                {#if type === "error"}
                    <IconError {...iconTheme} />
                {:else}
                    <IconSuccess {...iconTheme} />
                {/if}
            </div>
        {/if}
    </div>
{/if}

<style>
    .indicator {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        min-height: 20px;
    }

    .status {
        position: absolute;
    }

    .animated {
        position: relative;
        transform: scale(0.6);
        opacity: 0.4;
        min-width: 20px;
        animation: enter 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
    }

    @keyframes enter {
        from {
            transform: scale(0.6);
            opacity: 0.4;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>
