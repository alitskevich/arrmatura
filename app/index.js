import { launch } from '../lib'
import templates from './app.html'
import resources from './res'
import { Store } from './store.js'

const types = [
  templates,
  Store
]

const pipes = {
}

launch({ template: '<App />', types, resources, pipes })
