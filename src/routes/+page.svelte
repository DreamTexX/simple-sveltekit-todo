<script lang="ts">
    import type { Readable } from "svelte/store";
    import { browser } from "$app/environment";
    import { liveQuery } from "dexie";
    import StyledList from "../components/StyledList.svelte";
    import SimpleFormListItem from "../components/SimpleFormListItem.svelte";
    import EmptyFormListItem from "../components/EmptyFormListItem.svelte";
    import { TaskDB, type Task } from "../databases/task.db";
    import { crossfade } from "svelte/transition";

    let content: string;
    let [send, receive] = crossfade({});
    
    //@ts-ignore (Ignore because otherwise vs code yells a bunch of errors at me,
    //            because observable is not directly comatible with svelte subscribers,
    //            at least not type wise)
    let tasks: Readable<Array<Task>> = liveQuery(
        (): Promise<Array<Task>> =>
            browser ? TaskDB.tasks.toArray() : Promise.resolve([])
    );
</script>

<main
    class="flex flex-row max-w-7xl p-5 py-20 max-md:flex-col w-full max-h-screen overflow-auto text-white fill-white stroke-white gap-12"
>
    <StyledList title="Active Tasks">
        <SimpleFormListItem
            on:submit={() => { if (content.trim().length > 0) TaskDB.tasks.add({ content, done: false }); content = "" }}
            sticky={true}
        >
            <input
                type="text"
                name="task"
                placeholder="Type your new task here..."
                bind:value={content}
                class="bg-transparent px-4 outline-none w-full placeholder-white/50"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                slot="button"
            >
                <line x1="12" y1="5" x2="12" y2="19" /><line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                />
            </svg>
        </SimpleFormListItem>
        {#if $tasks}
            {#each $tasks.filter((task) => !task.done) as task (task.id)}
                <SimpleFormListItem
                    on:submit={() => TaskDB.tasks.update(task, { done: true })}
                    animationKey={task.id}
                >
                    <p class="px-4 w-full">
                        {task.content}
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        slot="button"
                    >
                        <polyline points="20 6 9 17 4 12" /></svg
                    >
                </SimpleFormListItem>
            {/each}
        {/if}
    </StyledList>
    <StyledList title="Done Tasks">
        {#if $tasks}
            {#each $tasks.filter((task) => task.done) as task (task.id)}
                <EmptyFormListItem animationKey={task.id}>
                    <p class="px-4 w-full">
                        {task.content}
                    </p>
                    <div class="border-l border-white/30 hidden group-hover:flex gap-4 px-4">
                        <button
                            type="submit"
                            class="bg-transparent outline-none flex justify-center items-center"
                            on:click={() => TaskDB.tasks.update(task, { done: false })}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <polyline points="1 4 1 10 7 10" />
                                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                            </svg>
                        </button>
                        <button
                            type="submit"
                            class="bg-transparent outline-none flex justify-center items-center"
                            on:click={() => task.id ? TaskDB.tasks.delete(task.id) : undefined}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <polyline points="3 6 5 6 21 6" />
                                <path
                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                />
                            </svg>
                        </button>
                    </div>
                </EmptyFormListItem>
            {/each}
        {/if}
    </StyledList>
</main>
