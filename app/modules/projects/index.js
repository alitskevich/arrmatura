const components = {
  Projects: /* html */`
  <ui:fragment>
    <Tabs data=":TABS"/>
    <Filter/>
    <Table data="<- issues" columns=":COLUMNS" value="{{current}}" valueChanged="{{onItemSelected}}"/>
    <Pagination/>
    <button class="btn tooltip tooltip-left round" style="position:fixed; right:1rem; bottom:1rem; width: 2rem;" data-tooltip="Lorem ipsum dolor sit amet">+{{touch}}</button>
  </ui:fragment>`,

  Filter: /* html */`
  <div class="form-autocomplete">
    <!-- autocomplete input container -->
    <div class="form-autocomplete-input form-input">

      <!-- autocomplete chips -->
      <div class="chip">
        <img src="assets/img/avatar-1.png" class="avatar avatar-sm" alt="Thor Odinson"/>
        <span>Thor Odinson</span>
        <a href="#" class="btn btn-clear" aria-label="Close" role="button"></a>
      </div>

      <!-- autocomplete real input box -->
      <input class="form-input" type="text" placeholder="typing here"/>
    </div>

    <!-- autocomplete suggestion list -->
    <ul class="menu hide-lg">
      <!-- menu list chips -->
      <li class="menu-item">
        <a href="#">
          <div class="tile tile-centered">
            <div class="tile-icon">
              <img src="assets/img/avatar-1.png" class="avatar avatar-sm" alt="Steve Rogers"/>
            </div>
            <div class="tile-content">
              Steve Rogers
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>`,

  Pagination: /* html */`
  <ul class="pagination">
    <li class="page-item disabled">
      <a href="#" tabindex="-1">Previous</a>
    </li>
    <li class="page-item active">
      <a href="#?page=1" click="-> paginate?page=1">1</a>
    </li>
    <li class="page-item">
      <a href="#">2</a>
    </li>
    <li class="page-item">
      <a href="#">3</a>
    </li>
    <li class="page-item">
      <span>...</span>
    </li>
    <li class="page-item">
      <a href="#">12</a>
    </li>
    <li class="page-item">
      <a href="#">Next</a>
    </li>
  </ul>`
}
export default Object.keys(components).map(name => ({NAME: name, TEMPLATE: components[name]}))
