import * as effectsTypes from './effects.js'

import elements from './elements.html'
import table from './table.html'
import inputs from './inputs.html'
import fields from './fields.html'
import layouts from './layouts.html'
import viewport from './viewport.html'
import { NavigationService } from './NavigationService'
import { ServiceWorker } from './ServiceWorker'
import { pipes } from 'ultimus'
import * as formTypes from './Form'

export * from './services'

export const commons = {
  pipes,
  types: [
    ServiceWorker,
    NavigationService,
    ...Object.values(effectsTypes),
    ...Object.values(formTypes),
    elements, table, fields, viewport, layouts, inputs
  ]
}

if (typeof window === 'object') {
  window.commons = commons
}
