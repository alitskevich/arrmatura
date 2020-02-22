export * from './dom';
import ReactDOM from 'react-dom';
import { createTemplate } from './compile.js';
import { allFragments } from './fragment.js';
import { createElt, register } from './resolve';

allFragments.map(([key, ctr]) => {
    ctr.NAME = key;
    register(ctr)
});

export function launchReact({ types, template, rootElt, ...props } = {}) {
    const root = createTemplate(template);
    [].concat(types).forEach(register);
    const app = createElt(root);
    window.app = props;
    ReactDOM.render(app, rootElt || document.body.firstElementChild || document.body, () => { })
}

window.launchReact = launchReact;
