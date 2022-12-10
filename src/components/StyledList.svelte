<script lang="ts">
    export let title: string;
</script>

<template>
    <section
        class="flex flow-row gap-8 w-full pt-8 pb-1 scroll-pb-10 bg-white/20 backdrop-blur-lg rounded-xl flex-col"
    >
        <h1 class="text-2xl font-black text-center min-w-max">
            { title }
        </h1>
        <ul class="flex flex-col gap-4 overflow-auto px-8 pb-7 relative overflow-x-hidden">
            <slot />
        </ul>
    </section>
</template>