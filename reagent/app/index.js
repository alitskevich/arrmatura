import templates from './app.html';
import resources from './res';
import { TodoStore } from './TodoStore';

export const loadTemplates = (...args) => {
    const R = [];
    args.forEach(s => s.replace(/<template\sid="(.+)">([\s\S]*?)<\/template>/gm,
        (_, id, templ) => R.push({ NAME: id, TEMPLATE: `<ui:fragment>${templ.trim()}</ui:fragment>` })));
    return R;
}


// load components from templates
const types = [
    TodoStore,
    ...loadTemplates(templates)
]

// launch with types and resources 
export const app = { template: '<App/>', types, resources };