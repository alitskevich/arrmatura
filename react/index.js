import { REGISTRY } from './utils'
import { TemplateComponent } from './component.template'
import { createClassResolver } from './styles'

const getName = ctr => ctr.WrappedComponent ? getName(ctr.WrappedComponent) : ctr.NAME || ctr.displayName || ctr.name

export const registerComponent = ctr => {
  const name = getName(ctr)
  const ctor = ctr.TYPE ? ctr.TYPE : ctr
  if (!ctor) {
    throw new Error('Component not defined: ' + name)
  }
  if (typeof ctor === 'object') {
    Object.entries(ctor).forEach(([k, v]) => v ? registerComponent({ NAME: name + '.' + k, TYPE: v }) : null)
  } else if (typeof ctor === 'string') {
    ctor.replace(/<component\sid="(.+)">([\s\S]*?)<\/component>/gm, (_, _name, templ) => {
      const type = class extends TemplateComponent {
        get template () {
          return templ.trim()
        }
      }
      type.displayName = `Template(${_name})`
      REGISTRY.set(_name, type)
    })
  } else if (ctor.prototype && ctor.prototype.isReactComponent) {
    REGISTRY.set(name, ctor)
  } else {
    REGISTRY.set(name, class C extends TemplateComponent {
      get template () {
        return ctor.template || ctor.prototype.template
      }

      get ImplType () {
        return ctor
      }
    })
  }
}

export class Arreact extends TemplateComponent {
  constructor (props) {
    super(props)
    Object.assign(this, props)
    this.types.forEach(registerComponent)
    this.resolveClass = createClassResolver(this.styles)
  }
}
