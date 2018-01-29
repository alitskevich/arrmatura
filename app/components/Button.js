export default class Button {
  TEMPLATE () {
    return `<button class="ui primary button btn {{class}}" click="{{click}}" title="{{title}}"><block>{{text}}</block></button>`
  }
  getText () {
    return this.text || '…'
  }
  getTitle () {
    return this.title || this.text || ''
  }
  getClick () {
    return (data, ev) => {
      this.log('click', data, ev)
    }
  }
}
