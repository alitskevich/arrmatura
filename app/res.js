// filters metadata
const then = (cond, left = '', right = '') => cond ? left : right
const upper = s => ('' + s).toUpperCase()
const capitalize = s => !s ? '' : s[0].toUpperCase() + s.slice(1);

export default {
    sitemap: [
        { id: 'main', name: 'Main' },
        { id: 'todo', name: 'To-Do' },
    ],
    title: 'todos',
    items_left: ' item(s) left',
    clear_completed: 'Clear completed',
    hint: 'Double-click to edit a todo',
    new_todo_hint: 'What needs to be done?',
    // filters: FILTERS,
    upper,
    capitalize,
    then,
    ...window.commonPipes,
};