const FILTERS = [
    { id: 'all', values: [true, false] },
    { id: 'active', values: [false] },
    { id: 'completed', values: [true] }
]
//pure actions:
const ACTIONS = {
    inverse: ({ items }, { id }) => ({ items: items.map(e => { if (e.id === id) { e.completed = !e.completed } return e }) }),
    save: ({ items }, { id, value }) => ({ items: (!value) ? items.filter(e => e.id !== id) : items.map(e => { if (e.id === id) { e.name = value } return e }) }),
    rm: ({ items }, { id }) => ({ items: items.filter(e => e.id !== id) }),
    filter: (st, { filterId }) => ({ filterId: FILTERS.find(e => e.id === filterId) ? filterId : 'all' }),
    purge: ({ items }) => ({ items: items.filter(e => !e.completed) }),
    toggle: ({ items }, { value }) => ({ items: items.map(e => { e.completed = value; return e }) }),
    add: ({ items, nextId }, { value }) => !value ? null : { nextId: nextId + 1, items: [].concat({ id: nextId, name: value, completed: false }, items) }
}

// service component
export class TodoStore {
    constructor() {
        //load data from storage
        this.data = JSON.parse(localStorage.getItem('TODO:1') || 'null') || { items: [], nextId: 1 }
        // generate action handlers
        Object.entries(ACTIONS).forEach(([key, fn]) => {
            this['on' + String.capitalize(key)] = ({ data: payload }) => {
                const data = Object.assign({}, this.data, fn(this.data, payload))
                localStorage.setItem('TODO:1', JSON.stringify(data))
                return { data }
            }
        })
    }
    // hook on init
    init($) {
        // use hash as a filter key. invoke immediately.
        (onhash => { window.onhashchange = onhash; return onhash })(() => $.emit('this.filter', { filterId: window.location.hash.slice(1) || FILTERS[0].id }))()
    }
    getShownItems() {
        const { filterId, items } = this.data
        const values = !filterId ? [] : FILTERS.find(e => e.id === filterId).values
        return items.filter(e => values.includes(!!e.completed))
    }
    getNotEmpty() {
        return this.data.items.length > 0
    }
    getFilterId() {
        return this.data.filterId
    }
    getItemsLeft() {
        return this.data.items.filter(e => !e.completed).length
    }
    getHasCompleted() {
        return this.data.items.length - this.getItemsLeft()
    }
    getShownItemsCount() {
        return this.getShownItems().length
    }
}