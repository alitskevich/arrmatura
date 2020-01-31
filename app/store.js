export class Store {
    onSelect ({ id, value, key='tab' }) {
        return {
            [key]: value || id
        }
    }
 }