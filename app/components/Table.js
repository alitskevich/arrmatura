
export class Table {
  TEMPLATE () {
    return /* html */`
    <table class="table table-scroll">
        <thead>
        <tr>
            <th><a href="#sort?field={{col1.id}}">{{col1.name}}</a></th>
            <th ui:each="col of columns"><a href="#sort?field={{col.id}}">{{col.name}}</a></th>
        </tr>
        </thead>
        <tbody>
        <tr ui:each="item of data.items">
            <td><a href="#detail?id={{item.id}}">{{cell1}}</a></td>
            <td ui:each="col of columns"><ui:type>{{cell}}</ui:type></td>
        </tr>
        </tbody>
    </table>`
  }

  setColumns (v) {
    this.col1 = v[0]
    this.columns = v.slice(1)
  }
  getCell1 () {
    return this.item[this.col1.id]
  }
  getCell () {
    return this.item[this.col.id]
  }
  getType () {
    return this.itemIndex % 2 === 0 ? 'b' : 'i'
  }
}
