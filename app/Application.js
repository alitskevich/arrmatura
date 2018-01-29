// import Store from './Store.js'
import { COLUMNS } from './const.js'

const TEMPL = `<div class="stack">
<h3 title="{{version}}">{{name}}, {{version}}</h3>
<div class="buttonGroup">
  <Button caption="++" click="{{increment}}"/>
  <Button caption="--" click="{{decrement}}"/>
</div>
<ui:listType *="{{list}}" columns="{{columns}}" value="{{current}}" valueChanged="{{onItemSelected}}"><b>Count '{{counter}}'</b></ui:listType>
<p if="current">Selected: {{current}}</p>
<span>{{counter}}</span>
</div>`

export default class Application {
  static get TEMPLATE () {
    return `<div class="buttonGroup">
      <Button text="++" click="{{increment}}"/>
      <Button text="--" click="{{decrement}}"/>
    </div>`
  };

  onInit () {
    // Store.addObserver((event) => this.invalidate(), this._id)
  }

  onDone () {
    // Store.removeObserver(this._id)
  }

  get columns () {
    return COLUMNS
  }

  get counter () {
    return Store.counter
  }

  get list () {
    return Store.list
  }

  get odd () {
    return this.counter % 2 === 1
  }

  get listType () {
    return 'List'
		// this.o dd ? 'SuperTable' : 'Tree';
  }

  increment () {
    this.log('Store.incCounter()')
  }

  decrement () {
    Store.incCounter(-1)
  }

  onItemSelected ({ value }) {
    this.current = value
  }
}
