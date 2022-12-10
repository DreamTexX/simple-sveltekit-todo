<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { quintOut } from "svelte/easing";
    import { crossfade } from "svelte/transition";
    const dispatch = createEventDispatcher();

    export let sticky: boolean = false;
    export let animationKey: any | undefined = undefined;

    let [send, receive] = crossfade({
        duration: (d) => Math.sqrt(d * 200),
        fallback(node, params) {
            console.log(node, params);
            return {
                duration: 600,
                easing: quintOut,
                css: (t) => `
                    opacity: ${t}
                `,
            };
        },
    });

    function forwardSubmit(event: any) {
        dispatch("submit", event);
    }
</script>

<template>
    <li class:sticky class:z-10={sticky} class="top-0">
        <form
            class="flex flex-row w-full bg-white/10 rounded-xl py-4 backdrop-blur-lg group"
            on:submit|preventDefault={forwardSubmit}
            in:receive={{ key: animationKey }}
            out:send={{ key: animationKey }}
        >
            <slot />
        </form>
    </li>
</template>
