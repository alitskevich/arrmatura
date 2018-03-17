
export class List {
  TEMPLATE () {
    return /* html */`
    <ul class="ui list">
        <li ui:each="item of data"
          click="{{update}}"
          data-value="{{item.id}}">
          <span>{{item.name}}</span>
        </li>
    </ul>`
  }
}
