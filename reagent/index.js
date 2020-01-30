import { launch } from './lib';
import templates from './app/app.html';
import resources from './app/res';
import { TodoStore } from './app/TodoStore';
// import './ultis';
// export * from './commons';

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
launch({ template: '<App/>', types, resources });