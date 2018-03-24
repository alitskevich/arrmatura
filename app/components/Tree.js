
export class Tree {
  TEMPLATE () {
    return /* html */`
    <div class="ui list tree">
        <div ui:each="item of data" click="{{update}}" class="item {{itemClass}}" data-value="{{item.id}}">
          <i class="icon folder"></i>
          <div class="content">
            <li click="{{update}}" data-value="{{id}}">
              <div class="header">{{name}}</div>
              <div class="description">{{dname}}</div>
            </li>
            <Tree ui:if="item.children" data="{{item.children}}"/>
          </div>
        </div>
    </div>`
  }
}
