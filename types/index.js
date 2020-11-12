import elements from './elements.html'
import table from './table.html'
import inputs from './inputs.html'
import fields from './fields.html'
import layouts from './layouts.html'
import viewport from './viewport.html'

import { NavigationService } from './NavigationService'
import { ServiceWorker } from './ServiceWorker'

import * as formTypes from './Form'
import * as services from './services'

export default [
  ServiceWorker,
  NavigationService,
  ...Object.values(formTypes),
  ...Object.values(services),
  elements, table, fields, viewport, layouts, inputs
]
