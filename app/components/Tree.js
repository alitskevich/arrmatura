export class Item {
  TEMPLATE () {
    return `<li
            click="{{update}}"
            data-value="{{id}}">
                        <div class="header">{{name}}</div>
                        <div class="description">{{dname}}</div>
          </li>
      </ul>`
  }
  getEmptyMessage () {
    return this.emptyMessage || 'Empty list'
  }
}
export class Tree {
  TEMPLATE () {
    return `
    <div class="ui list tree">
        <div ui:each="item of data" click="{{update}}" class="item {{itemClass}}" data-value="{{item.id}}">
          <i class="icon folder"></i>
          <div class="content">
            <ui:itemType ui:props="{{item}}"/>
            <Tree ui:if="item.children" data="{{item.children}}" valueChanged="{{valueChanged}}"/>
          </div>
          <ui:empty><small class="empty"><b>Empty tree</b></small></ui:empty>
        </div>
    </div>`
  }
  getItemClass () {
    return this.item.id === this.value ? 'selected' : ''
  }
}
