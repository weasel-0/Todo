<script>
    export let addTodo
    export let toggleCompleted
    export let todosAmount

    let todo = ''

    function handleSubmit() {
        addTodo(todo)
        todo = ''
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    {#if todosAmount > 0}
        <input
            on:click={toggleCompleted}
            type="checkbox"
            id="toggle-all"
            class="toggle-all"
        />
        <label aria-label="Mark all as complete" for="toggle-all">
            Mark all as complete</label
        >
    {/if}
    <!-- svelte-ignore a11y-autofocus -->
    <input
        bind:value={todo}
        id="new-todo"
        class="new-todo"
        type="text"
        placeholder="what needs to be done"
        autofocus
    />
</form>

<style>
    /* Add todo */

    .toggle-all {
        width: 1px;
        height: 1px;
        position: absolute;
        opacity: 0;
    }

    .toggle-all + label {
        position: absolute;
        font-size: 0;
    }

    .toggle-all + label:before {
        content: '❯';
        display: block;
        padding: var(--spacing-16);
        font-size: var(--font-24);
        color: var(--color-gray-58);
        transform: rotate(90deg);
    }

    .toggle-all:checked + label:before {
        color: var(--color-gray-28);
    }

    .new-todo {
        width: 100%;
        padding: var(--spacing-16);
        padding-left: 60px;
        font-size: var(--font-24);
        border: none;
        border-bottom: 1px solid var(--shadow-1);
    }
</style>
