import './utils.js';
import './url.js';
import './dates.js';

import * as supportTypes from './support.js';
import $pipes from './pipes.js';

import elements from './elements.html';
import table from './table.html';
import inputs from './inputs.html';
import fields from './fields.html';
import layouts from './layouts.html';
import viewport from './viewport.html';
import { NavigationService } from './NavigationService';
import { ServiceWorker } from './ServiceWorker';

import * as formTypes from './Form';

export * from "./Service"

export const loadTemplates = (...args) => {
    const R = [];
    args.forEach(s => s.replace(/<template\sid="(.+)">([\s\S]*?)<\/template>/gm,
        (_, id, templ) => R.push({ NAME: id, TEMPLATE: `<ui:fragment>${templ}</ui:fragment>` })));
    return R;
}

export const commonPipes = $pipes;

export const commonTypes = [
    ServiceWorker, NavigationService,
    ...Object.values(supportTypes),
    ...Object.values(formTypes),
    ...loadTemplates(elements, table, fields, viewport, layouts, inputs)
];

if (typeof window === 'object') {
    window.commonTypes = commonTypes;
    window.loadTemplates = loadTemplates;
    window.commonPipes = commonPipes;
}