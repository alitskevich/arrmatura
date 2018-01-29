import { bootstrap } from './src/index.js'
import components from './components/index.js'
import Application from './Application.js'
bootstrap(Application, ...components)()
