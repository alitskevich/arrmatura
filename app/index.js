import { launch, commons } from '../index.js'
import templates from './app.html'
import resources from './res'
import { Store } from './store.js'

const types = [
  ...commons.types,
  templates,
  Store
]

const pipes = {
  ...commons.pipes
}

launch({ template: '<App />', types, resources, pipes })
