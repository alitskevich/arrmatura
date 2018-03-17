const components = {
  News: /* html */`
  <div id="tiles" class="container">
    <h3 class="s-title"><a href="#tiles" class="anchor" aria-hidden="true">#</a><span>News</span></h3>
    <div class="docs-note">
      <p>Most noticed local news aggregation.</p>
    </div>
    <NewsList ui:props="<- news"/>
  </div>`,
  NewsList: /* html */`<div class="columns">
    <div class="column col-9 col-sm-12" ui:each="item of items">
      <div class="tile">
        <div class="tile-icon">
          <figure class="avatar avatar-lg">
            <img src="assets/img/avatar-1.png" alt="Avatar"/>
          </figure>
        </div>
        <div class="tile-content">
          <p class="tile-title">{{item.name}}</p>
          <p class="tile-subtitle text-gray">{{item.content}}</p>
          <p>
            <button class="btn btn-primary btn-sm">Like</button>
            <button class="btn btn-sm">Save</button>
          </p>
        </div>
      </div>
    </div>
  </div>`,
  Feeds: /* html */`  <div id="tiles" class="container">
  <h3 class="s-title"><a href="#tiles" class="anchor" aria-hidden="true">#</a><span>Food</span></h3>
  <div class="docs-note">
    <p>Social networks stream.</p>
  </div>
  <NewsList ui:props="<- feeds"/>
</div>`
}
export default Object.keys(components).map(name => ({NAME: name, TEMPLATE: components[name]}))
