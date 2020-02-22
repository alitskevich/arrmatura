import commonPipes from '../../commons/pipes'
// filters metadata
const then = (cond, left = '', right = '') => cond ? left : right
const upper = s => ('' + s).toUpperCase()
const capitalize = s => !s ? '' : s[0].toUpperCase() + s.slice(1);

export default {
    sitemap: [
        { id: 'main', name: 'Main', label: '1' },
        {
            id: 'todo', name: 'To-Do', subs: [
                { id: 'main', name: 'Main' },
                { id: 'todo', name: 'To-Do', label: '2' },
            ]
        },
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
    ...commonPipes,
};