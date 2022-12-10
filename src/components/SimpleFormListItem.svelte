<script lang="ts">
    import EmptyFormListItem from "./EmptyFormListItem.svelte";
    import { createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();

    export let sticky: boolean = false;
    export let animationKey: any | undefined = undefined;

    function forwardSubmit(event: any) {
        dispatch("submit", event);
    }
</script>

<template>
    <EmptyFormListItem bind:sticky bind:animationKey on:submit={forwardSubmit}>
        <slot />
        <button
            type="submit"
            class="hidden group-hover:flex bg-transparent px-4 outline-none justify-center items-center border-l border-white/30"
        >
            <slot name="button" />
        </button>
    </EmptyFormListItem>
</template>
