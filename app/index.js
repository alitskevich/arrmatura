import { launch } from '../lib/index.js'
import components from './components/index.js'
import modules from './modules/index.js'
import { MyApplication } from './app.js'

launch(MyApplication, ...components, ...modules)
