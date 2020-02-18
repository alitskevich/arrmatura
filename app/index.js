import { launch, loadTemplates } from '../index.js';
import templates from './app.html';
import res from './res';
import { Store } from './store.js';

const types = [
    ...window.commonTypes,
    ...loadTemplates(templates),
    Store
]

const resources = {
    ...window.commonPipes,
    ...res
} 

launch({ template: '<App/>', types, resources });