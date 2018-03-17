import { Table } from './Table.js'
import { Tree } from './Tree.js'
import { List } from './List.js'
const components = {

  Toast: /* html */`
  <div class="toast toast-primary" style="position:fixed; right:5rem; bottom:1rem; width: 20rem;">
    <button class="btn btn-clear float-right" click="->" data-touch="{{text}}"></button>
    <p>{{top.ts}}</p>
  </div>
  `,

  Home: /* html */`
  <p>Home</p>
  `,

  Header: /* html */`
  <header class="navbar bg-secondary">
    <section class="navbar-section mx-2">
      <Breadcrumbs/>
    </section>
    <section class="navbar-center">
        <img src="assets/img/spectre-logo.svg" alt="Spectre.css"/>
    </section>
    <section class="navbar-section mx-2">
      <div class="input-group input-inline">
        <input class="form-input" type="text" placeholder="search"/>
        <button class="btn btn-primary input-group-btn">Search</button>
      </div>
    </section>
  </header>
  `,

  Sidebar: /* html */`
  <div class="off-canvas off-canvas-sidebar-show">
    <a class="off-canvas-toggle btn btn-primary btn-action show-lg" href="#sidebar">
      <i class="icon icon-menu"/>
    </a>
    <div id="sidebar" class="off-canvas-sidebar">
      <ui:transclude key="aside"/>
    </div>
    <a class="off-canvas-overlay" href="#close"></a>
    <div class="off-canvas-content">
      <ui:transclude key="content"/>
    </div>
  </div>
  `,

  Tabs: /* html */`
  <ul class="tab tab-block">
    <li class="tab-item" ui:each="item of data">
      <a href="#tab?tab={{item.value}}">{{item.name}}</a>
    </li>
  </ul>
  `,

  UserBar: /* html */`
  <ui:fragment>
    <div class="tile tile-centered">
      <div class="tile-icon">
        <div class="example-tile-icon">
          <i class="icon icon-people centered"></i>
        </div>
      </div>
      <div class="tile-content">
        <div class="tile-title">{{name}}</div>
        <div class="tile-subtitle text-gray">{{balance}} drusk · 1 Jan, 2017</div>
      </div>
      <!-- <div class="tile-action">
        <button class="btn btn-link">
          <i class="icon icon-more-vert"></i>
        </button>
      </div> -->
    </div>
  </ui:fragment>
  `,

  Navs: /* html */`
  <div class="panel" style="height: 100%;">
  <div class="panel-header">
    <div class="panel-title">
      <UserBar ui:props="<- me"/>
    </div>
  </div>
  <div class="panel-nav">
    <!-- navigation components: tabs, breadcrumbs or pagination -->
  </div>
  <div class="panel-body">
    <NavTree data="<- nav"/>
  </div>
  <div class="panel-footer">
    Settings
  </div>
  </div>
  `,

  NavTree: /* html */`
  <ul class="nav">
    <li class="nav-item {{item.cl}}" ui:each="item of data">
      <a href="#module/{{item.id}}"><span>{{item.name}}</span><span ui:if="item.weight" class="label label-error">{{item.weight}}</span></a>
      <NavTree ui:if="item.subs" data="{{item.subs}}"/>
    </li>
  </ul>
  `,

  Breadcrumbs: /* html */`
  <ul class="breadcrumb">
  <li class="breadcrumb-item">
    <a href="#">Home</a>
  </li>
  <li class="breadcrumb-item">
    <a href="#">Settings</a>
  </li>
  <li class="breadcrumb-item">
    <div class="dropdown">
        <a class="btn btn-link dropdown-toggle" tabindex="0">dropdown button <i class="icon icon-caret"></i></a>
        <ul class="menu">
          <li class="menu-item">
            <a href="#dropdowns">
              Slack
            </a>
          </li>
          <li class="menu-item">
            <a href="#dropdowns">
              Hipchat
            </a>
          </li>
          <li class="menu-item">
            <a href="#dropdowns">
              Skype
            </a>
          </li>
        </ul>
      </div>
  </li>
</ul>
`
}
export default [
  Table, Tree, List, ...Object.keys(components).map(name => ({NAME: name, TEMPLATE: components[name]}))
]
