<script>
    import AddTodo from '$root/components/AddTodo.svelte'
    import Todo from '$root/components/Todo.svelte'
    import TodosLeft from '$root/components/TodosLeft.svelte'
    import FilterTodos from '$root/components/FilterTodos.svelte'
    import ClearTodos from '$root/components/ClearTodos.svelte'
    import { useStorage } from '$root/stores/useStorage'
    import { tick } from 'svelte'

    //using stores
    let todos = useStorage('todos', [])
    //using localstorage
    // let todos = JSON.parse(localStorage.getItem('todos')) ?? []

    // $: {
    //     localStorage.setItem('todos', JSON.stringify(todos))
    // }

    let selectedFilter = 'all'
    let filtering = false
    //debug
    $: console.log(todos)

    //computed values
    $: todosAmount = $todos.length
    $: incompleteTodos = $todos.filter((todo) => !todo.completed).length
    $: filteredTodos = filterTodos($todos, selectedFilter)
    $: completedTodos = $todos.filter((todo) => todo.completed).length
    $: duration = filtering ? 0 : 250

    //methods
    function generateRandomId() {
        return Math.random().toString(16).slice(2)
    }

    function addTodo(todo) {
        let newTodo = {
            id: generateRandomId(),
            text: todo,
            completed: false,
        }
        $todos = [...$todos, newTodo]
    }

    function toggleCompleted(event) {
        let { checked } = event.target
        $todos = $todos.map((todo) => ({
            ...todo,
            completed: checked,
        }))
    }

    function completeTodo(id) {
        $todos = $todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
    }

    function removeTodo(id) {
        $todos = $todos.filter((todo) => todo.id !== id)
    }

    function editTodo(id, newTodo) {
        let currentTodo = $todos.findIndex((todo) => todo.id === id)
        $todos[currentTodo].text = newTodo
    }

    async function setFilter(newFilter) {
        filtering = true
        await tick()
        selectedFilter = newFilter
        await tick()
        filtering = false
    }

    function filterTodos(todos, filter) {
        switch (filter) {
            case 'all':
                return todos
            case 'active':
                return todos.filter((todo) => !todo.completed)
            case 'completed':
                return todos.filter((todo) => todo.completed)
        }
    }

    function clearCompleted() {
        $todos = $todos.filter((todo) => todo.completed !== true)
    }
</script>

<main>
    <h1 class="title">todos</h1>
    <section class="todos">
        <AddTodo {addTodo} {toggleCompleted} {todosAmount} />
        {#if todosAmount}
            <ul class="todo-list">
                {#each filteredTodos as todo (todo.id)}
                    <Todo
                        {todo}
                        {completeTodo}
                        {removeTodo}
                        {editTodo}
                        {duration}
                    />
                {/each}
            </ul>
            <div class="actions">
                <TodosLeft {incompleteTodos} />
                <FilterTodos {selectedFilter} {setFilter} />
                <ClearTodos {clearCompleted} {completedTodos} />
            </div>
        {/if}
    </section>
</main>

<style>
    /* Todos */

    .title {
        font-size: var(--font-80);
        font-weight: inherit;
        text-align: center;
        color: var(--color-title);
    }

    .todos {
        --width: 500px;
        --todos-bg: hsl(0 0% 98%);
        --todos-text: hsl(220 20% 14%);

        width: var(--width);
        color: var(--todos-text);
        background-color: var(--todos-bg);
        border-radius: var(--radius-base);
        border: 1px solid var(--color-gray-90);
        box-shadow: 0 0 4px var(--shadow-1);
    }

    .todo-list {
        list-style: none;
    }

    .actions {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-8) var(--spacing-16);
        font-size: 0.9rem;
        border-top: 1px solid var(--color-gray-90);
    }

    .actions:before {
        content: '';
        height: 40px;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        box-shadow:
            0 1px 1px hsla(0, 0%, 0%, 0.2),
            0 8px 0 -3px hsl(0, 0%, 96%),
            0 9px 1px -3px hsla(0, 0%, 0%, 0.2),
            0 16px 0 -6px hsl(0, 0%, 96%),
            0 17px 2px -6px hsla(0, 0%, 0%, 0.2);
        z-index: -1;
    }
</style>
