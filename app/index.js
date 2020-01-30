import { launch, loadTemplates } from '../index.js';
import templates from './app.html';
import res from './res';

const types = [
    ...window.commonTypes,
    ...loadTemplates(templates)
]

const resources = {
    ...window.commonPipes,
    ...res
}

launch({ template: '<App/>', types, resources });