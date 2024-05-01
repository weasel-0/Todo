<script>
    export let incompleteTodos
</script>

<span class="todo-count">
    {incompleteTodos}
    {incompleteTodos === 1 ? 'item' : 'items'} left
</span>
