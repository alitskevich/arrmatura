import { launch, loadTemplates } from '../index.js';
import templates from './app.html';
import resources from './res';
import { TodoStore } from './TodoStore';


// load components from templates
const types = [
    ...window.commonTypes,
    TodoStore,
    ...loadTemplates(templates)
]

// launch with types and resources 
launch({ template: '<App/>', types, resources });