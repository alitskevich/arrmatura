import Component from '../../ui/Component.js'

export default class List extends Component {
  static TEMPLATE =
    `<ul class="ui list">
        <li each="item of data"
          click="{{update}}"
          data-value="{{item.id}}">
          <span>{{item.name}}</span>
        </li>
        <block if="data.length">
          <transclude/>
          <else><small class="empty">{{$emptyMessage}}</small></else>
        </block>
    </ul>`;

  get $emptyMessage () {
    return this.$emptyMessage || 'Empty list'
  }
}
