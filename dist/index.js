var Dzi =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.launch = launch;
exports.bootstrap = bootstrap;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var COUNTER = 1;
var doc = window.document;

// ==========
// Bootstrap
// ----------

// type registry
var REGISTRY = new Map();
var register = function register(ctor) {
  // narrow non-function ctor
  ctor = typeof ctor === 'function' ? ctor : Object.assign(function () {}, ctor);
  // narrow name
  var name = ctor.NAME = ctor.NAME || ctor.name || (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || '$C' + COUNTER++;
  // narrow template
  var text = ctor.TEMPLATE || ctor.prototype.TEMPLATE && ctor.prototype.TEMPLATE() || (doc.getElementById(name) || { innerText: '<noop name="' + name + '"/>' }).innerText;
  // compile
  var compiled = compile(parseXML(text, name));
  ctor.$TEMPLATE = function ($) {
    return resolve(new Map(), $, compiled);
  };
  // register
  REGISTRY.set(name, ctor);
};

// bootstap a components tree and render immediately on <body/>
function launch() {
  for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
    types[_key] = arguments[_key];
  }

  bootstrap.apply(undefined, [null].concat(types)).render();
}
// bootstap a components tree
function bootstrap(elt) {
  for (var _len2 = arguments.length, types = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    types[_key2 - 1] = arguments[_key2];
  }

  if (types.length === 0) {
    types = [Application];
  }
  types.forEach(register);
  // register transparent container: <ui:fragment>
  register({ NAME: 'fragment', TEMPLATE: '<ui:transclude/>' });
  // collect and register `bare-template` definitions
  var staticTypes = [].concat([].concat(_toConsumableArray(doc.getElementsByTagName('script')))).filter(function (e) {
    return e.id && !REGISTRY.has(e.id) && e.type === 'text/x-template';
  });
  staticTypes.map(function (e) {
    return { NAME: e.id, TEMPLATE: e.innerText };
  }).forEach(register);
  // use `<body>` as mount element by default
  return new Bootstrap(elt || doc.body, types[0]);
}

var Application = exports.Application = function () {
  function Application() {
    _classCallCheck(this, Application);
  }

  _createClass(Application, [{
    key: 'init',

    // hook on init
    value: function init() {}
    // event-driven:

  }, {
    key: 'dispatch',
    value: function dispatch(key, payload) {}
  }, {
    key: 'subscribe',
    value: function subscribe(key, subscriberId, cb) {}
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(subscriberId) {}
    // resolves properties

  }, {
    key: 'get',
    value: function get(key) {
      return key;
    }
    // resolves static resources

  }, {
    key: 'res',
    value: function res(key) {
      return key;
    }
  }]);

  return Application;
}();

var Bootstrap = function () {
  function Bootstrap(elt, ctor) {
    _classCallCheck(this, Bootstrap);

    this.$elt = elt;
    this.meta = new Map();
    this.meta.set(0, { tag: ctor.NAME, props: {}, subs: [] });
  }

  _createClass(Bootstrap, [{
    key: 'render',
    value: function render() {
      var _this = this;

      window.requestAnimationFrame(function () {
        return _render(_this, _this.meta, _this.$elt);
      });
    }
  }]);

  return Bootstrap;
}();

// ==========
// Virtual DOM Element
// ----------


var values = {
  'true': true,
  'false': false,
  'null': null
};

var setters = {
  '#text': function text(e, k, v) {
    return e.textContent = v == null ? '' : v;
  },
  disabled: function disabled(e, k, v) {
    return e[k] = v ? true : null;
  },
  class: function _class(e, k, v) {
    v = ('' + v).replace(/([a-z0-9]+):([a-z0-9.]*)(=([a-z0-9.]*))?\b/g, function (_, cl, fl, hasEq, eq) {
      var disabled = hasEq ? fl !== eq : ['', '0', 'false', 'off'].indexOf(fl) > -1;
      return disabled ? '' : cl;
    });
    e.setAttribute(k, v);
  },
  selected: function selected(e, k, v) {
    return e[k] = v ? true : null;
  },
  value: function value(e, k, v) {
    return e[k] = v;
  },
  checked: function checked(e, k, v) {
    return e[k] = !!v;
  },
  data: function data(e, k, v) {
    e.$dataset = Object.assign({}, v);
  },
  'data*': function data(e, k, v) {
    (e.$dataset || (e.$dataset = {}))[k.slice(5)] = v in values ? values[v] : v;
  },
  'enter': function enter(e, key, v) {
    var _this2 = this;

    this.setListener('keyup', !v ? null : function (ev) {
      if (ev.keyCode === 13) {
        _this2.$attributes[key].call(_this2.$owner.$, _extends({ value: e.value }, e.$dataset), ev);
      }
      if (ev.keyCode === 13 || ev.keyCode === 27) {
        e.blur();
      }
      return false;
    });
  },
  'toggle': function toggle(e, key, v) {
    var _this3 = this;

    this.setListener('change', !v ? null : function (ev) {
      _this3.$attributes[key].call(_this3.$owner.$, _extends({ value: e.checked }, e.$dataset), ev);
      return false;
    });
  }
};

var Elmnt = function () {
  function Elmnt(m, parentElt) {
    _classCallCheck(this, Elmnt);

    this.$ = m.tag === '#text' ? doc.createTextNode('') : doc.createElement(m.tag);
    this.$attributes = {};
    this.$owner = m.owner;
  }

  _createClass(Elmnt, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'done',
    value: function done() {
      var e = this.$;
      var lstnrs = this.$listeners;
      if (lstnrs) {
        Object.keys(lstnrs).forEach(function (k) {
          return e.removeEventListener(k, lstnrs[k]);
        });
        this.$listeners = null;
      }
      var p = e.parentElement;
      if (p) {
        p.removeChild(e);
      }
      this.$elt = this.$attributes = this.$owner = this.parentElt = null;
    }
  }, {
    key: 'assign',
    value: function assign(delta) {
      if (this.isDone) {
        return;
      }
      var e = this.$;
      var p = this.parentElt;
      if (this.transclude) {
        e.cursor = null;
        _render(this, this.transclude, e);
        e.cursor = null;
      }
      this.applyAttributes(delta);
      var before = p.cursor ? p.cursor.nextSibling : p.firstChild;
      if (!before) {
        p.appendChild(e);
      } else if (e !== before) {
        p.insertBefore(e, before);
      }
      p.cursor = e;
    }
  }, {
    key: 'applyAttributes',
    value: function applyAttributes(theirs) {
      var _this4 = this;

      var e = this.$;
      var mines = this.$attributes;
      for (var key in mines) {
        if (mines.hasOwnProperty(key) && theirs[key] === undefined) {
          theirs[key] = null;
        }
      }

      var _loop = function _loop(_key3) {
        if (theirs.hasOwnProperty(_key3) && theirs[_key3] !== mines[_key3]) {
          var value = theirs[_key3];
          var prefixP = _key3.indexOf('-');
          var setter = setters[prefixP === -1 ? _key3 : _key3.slice(0, prefixP) + '*'];
          if (setter) {
            setter.call(_this4, e, _key3, value);
          } else {
            if (typeof value === 'function' || _this4.listeners && _this4.listeners.has(_key3)) {
              var T = _this4;
              _this4.setListener(_key3, !value ? null : function (ev) {
                T.$attributes[_key3].call(T.$owner.$, _extends({ value: e.value }, e.$dataset), ev);
                return false;
              });
            } else {
              _this4.setAttribute(_key3, value);
            }
          }
        }
      };

      for (var _key3 in theirs) {
        _loop(_key3);
      }
      this.$attributes = theirs;
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(key, value) {
      if (value != null) {
        this.$.setAttribute(key, value);
      } else {
        this.$.removeAttribute(key);
      }
    }
  }, {
    key: 'setListener',
    value: function setListener(key, fn) {
      if (fn) {
        if (!this.listeners) {
          this.listeners = new Map();
        }
        if (!this.listeners.has(key)) {
          this.$.addEventListener(key, fn, false);
          this.listeners.set(key, fn);
        }
      } else {
        if (this.listeners && this.listeners.has(key)) {
          this.$.removeEventListener(key, this.listeners.get(key));
          this.listeners.delete(key);
        }
      }
    }
  }]);

  return Elmnt;
}();

// ==========
// Component
// ----------


var Component = function () {
  function Component(m, Ctor) {
    var _this5 = this;

    _classCallCheck(this, Component);

    this.$ = new Ctor();
    this.$.assign = function (d) {
      return _this5.assign(d);
    };
    this.$.defer = function (fn) {
      if (fn) {
        (_this5.defered || (_this5.defered = [])).push(fn);
      }
    };
  }

  _createClass(Component, [{
    key: 'init',
    value: function init() {
      if (this.$.init) {
        this.$.init(this);
      }
    }
  }, {
    key: 'done',
    value: function done() {
      var _this6 = this;

      if (this.defered) {
        this.defered.forEach(function (f) {
          return f.call(_this6, _this6);
        });
        delete this.defered;
      }
    }
  }, {
    key: 'assign',
    value: function assign(delta) {
      if (!delta || this.isDone) {
        return;
      }
      // prevent recursive invalidations
      this.$assignDepth = (this.$assignDepth || 0) + 1;
      if (delta._) {
        delta = _extends({}, delta._, delta, { _: undefined });
      }
      // iterate payload
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(delta)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var k = _step.value;

          var their = delta[k];
          var mine = this.$[k];
          if (k[0] === '$') {
            their.call(this);
            continue;
          }
          if (their !== undefined && (their !== mine || (typeof their === 'undefined' ? 'undefined' : _typeof(their)) === 'object' && their !== null)) {
            var setter = this.$['set' + k[0].toUpperCase() + k.slice(1)];
            if (setter) {
              setter.call(this.$, their);
            } else {
              this.$[k] = their;
            }
          }
        }
        // prevent recursive invalidations
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      --this.$assignDepth;
      if (this.$assignDepth === 0) {
        this.parentElt.cursor = this.prevElt;
        _render(this, this.$.constructor.$TEMPLATE(this), this.parentElt);
      }
    }
  }, {
    key: 'get',
    value: function get(k) {
      var $ = this.$;
      if ($.get) {
        return $.get(k);
      }
      var posE = k.indexOf('.');
      if (posE === -1) {
        var getter = $['get' + k[0].toUpperCase() + k.slice(1)];
        var v = getter ? getter.call($, k) : $[k];
        return v;
      }
      var posB = 0;
      while (posE !== -1) {
        $ = $[k.slice(posB, posE)];
        if (!$) {
          return;
        }
        posB = posE + 1;
        posE = k.indexOf('.', posB);
      }
      return $[k.slice(posB)];
    }
  }]);

  return Component;
}();

// ==========
// Rendering. MetaTree -> ViewTree(Components,Elements)
// ----------


function _render($, meta, parentElt) {
  if ($.isDone) {
    return;
  }
  // done
  if ($.children) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = $.children.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var c = _step2.value;

        if (!meta.has(c.uid)) {
          done(c);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
  if (meta.size) {
    var ch = $.children || ($.children = new Map());
    // create
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = meta.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _step3$value = _slicedToArray(_step3.value, 2),
            uid = _step3$value[0],
            m = _step3$value[1];

        if (!ch.has(uid)) {
          var componentCtor = REGISTRY.get(m.tag);
          var _c = componentCtor ? new Component(m, componentCtor) : new Elmnt(m);
          _c.uid = uid;
          _c.parentElt = parentElt;
          _c.parent = $;
          _c.app = $.app || _c.$;
          ch.set(uid, _c);
        }
      }
      // assign
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = meta.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _step4$value = _slicedToArray(_step4.value, 2),
            uid = _step4$value[0],
            m = _step4$value[1];

        var _c2 = ch.get(uid);
        _c2.transclude = m.subs;
        _c2.prevElt = parentElt.cursor;
        _c2.assign(m.props);
      }
      // init
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = ch.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _c3 = _step5.value;

        if (!_c3.isInited) {
          _c3.isInited = true;
          _c3.init();
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  }
}
// done
function done(c) {
  if (c.isDone) {
    return;
  }
  c.isDone = true;
  c.done();
  if (c.children) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = c.children.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var cc = _step6.value;

        done(cc);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    c.children = null;
  }
  if (c.parent) {
    c.parent.children.delete(c.uid);
    c.parent = null;
  }
  if (c.app) {
    c.app = null;
  }
}

// ==========
// Template Resolution. GeneratorTree + Data -> MetaTree
// ----------

function resolve(map, c, meta) {
  if (!meta) {
    return map;
  }
  if (Array.isArray(meta)) {
    return meta.reduce(function (m, e) {
      return resolve(m, c, e);
    }, map);
  }
  var type = meta.type,
      props = meta.props,
      subs = meta.subs,
      uid = meta.uid,
      iff = meta.iff,
      each = meta.each,
      key = meta.key;

  var tag = type(c);
  if (iff && !iff(c)) {
    return resolve(map, c, iff.else);
  }

  if (tag === 'transclude') {
    var partial = props.reduce(function (a, f) {
      return f(c, a);
    }, {}).key;
    c.transclude.forEach(function (v, k) {
      if (partial ? v.key === partial : !v.key) {
        map.set(k, v);
      }
    });
    return map;
  }
  if (each) {
    var data = each.dataGetter(c);
    return !data || !data.length ? map : (data.reduce ? data : ('' + data).split(',')).reduce(function (m, d, index) {
      c.$[each.itemId] = d;
      c.$[each.itemId + 'Index'] = index;
      var id = uid + '-$' + (d.id || index);
      return resolve(m, c, { type: type, props: props, subs: subs, uid: id });
    }, map);
  }
  var r = {
    owner: c,
    tag: tag,
    props: {},
    key: key,
    subs: subs.length ? subs.reduce(function (m, s) {
      return resolve(m, c, s);
    }, new Map()) : null
  };
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = props[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var p = _step7.value;

      p(c, r.props);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  return map.set(tag + uid, r);
}

// ==========
// Template Compilation. NodeTree -> GeneratorTree
// ----------

function compileType(tag) {
  var dtype = tag.slice(0, 3) === 'ui:' ? tag.slice(3) : null;
  return dtype ? dtype === 'fragment' || dtype === 'transclude' ? function (c) {
    return dtype;
  } : function (c) {
    return c.get(dtype);
  } : function (c) {
    return tag;
  };
}

function compile(_ref) {
  var tag = _ref.tag,
      attrs = _ref.attrs,
      uid = _ref.uid,
      subs = _ref.subs;

  var r = { uid: uid, type: compileType(tag), props: compileAttrs(attrs), key: attrs.get('ui:key') };

  var aIf = attrs.get('ui:if');
  if (aIf) {
    var neg = aIf[0] === '!' ? aIf.slice(1) : null;
    r.iff = neg ? function (c) {
      return !c.get(neg);
    } : function (c) {
      return !!c.get(aIf);
    };
    if (subs.length) {
      var ifElse = subs.find(function (e) {
        return e.tag === 'ui:else';
      });
      var ifThen = subs.find(function (e) {
        return e.tag === 'ui:then';
      });
      if (ifElse) {
        r.iff.else = compile(ifElse).subs;
        subs = ifThen ? ifThen.subs : subs.filter(function (e) {
          return e !== ifElse;
        });
      } else if (ifThen) {
        subs = ifThen.subs;
      }
    }
  }

  var aEach = attrs.get('ui:each');
  if (aEach) {
    var _aEach$split = aEach.split(' '),
        _aEach$split2 = _slicedToArray(_aEach$split, 3),
        itemId = _aEach$split2[0],
        dataId = _aEach$split2[2];

    var dataGetter = dataId[0] === ':' ? function (c) {
      return c.app.res(dataId.slice(1));
    } : function (c) {
      return c.get(dataId);
    };
    r.each = { itemId: itemId, dataGetter: dataGetter };
  }

  r.subs = subs.map(compile);
  return r;
}

var RE_SINGLE_PLACEHOLDER = /^\{\{([a-zA-Z0-9._$|]+)\}\}$/;
var RE_PLACEHOLDER = /\{\{([a-zA-Z0-9._$|]+)\}\}/g;
function compileAttrs(attrs) {
  var r = [];
  var aProps = null;
  attrs.forEach(function (v, k) {
    if (k.slice(0, 3) === 'ui:') {
      if (k === 'ui:props') {
        aProps = v;
      }
      return;
    }
    // localize by key
    if (v[0] === ':') {
      var key = v.slice(1);
      return r.push(function (c, p) {
        p[k] = c.app.res ? c.app.res(key) : key;return p;
      });
    }
    if (v[0] === '<' && v[1] === '-') {
      var ref = k + '_url';
      var fctr = compileAttrValue(ref, v.slice(2).trim());
      return r.push(function (c, p) {
        // custom assign
        p['$' + k] = function () {
          var _this7 = this;

          var old = this.$[ref];
          var url = fctr(c, {})[ref];
          if (url !== old) {
            var _assign2;

            var ckey = k + '_counter';
            var cbusy = k + '_busy';
            var cerror = k + '_error';
            var counter = (this.$[ckey] || 0) + 1;
            if (!this.app.fetch) {
              var _assign;

              var err = new Error('No App.fetch()');
              console.error(err);
              this.assign((_assign = {}, _defineProperty(_assign, ref, undefined), _defineProperty(_assign, cbusy, false), _defineProperty(_assign, cerror, err), _assign));
              return;
            }
            var cb = function cb(error, data) {
              if (counter === _this7.$[ckey]) {
                var _this7$assign;

                _this7.assign((_this7$assign = {}, _defineProperty(_this7$assign, k, data), _defineProperty(_this7$assign, ref, url), _defineProperty(_this7$assign, cbusy, false), _defineProperty(_this7$assign, cerror, error), _this7$assign));
              }
            };
            this.assign((_assign2 = {}, _defineProperty(_assign2, ref, url), _defineProperty(_assign2, cbusy, true), _defineProperty(_assign2, ckey, counter), _defineProperty(_assign2, cerror, null), _assign2));
            setTimeout(function () {
              return _this7.app.fetch(url, _this7.$, cb);
            }, 10);
          }
        };
        return p;
      });
    }
    if (v[0] === '-' && v[1] === '>') {
      var _fctr = compileAttrValue(k, v.slice(2).trim());
      return r.push(function (c, p) {
        p[k] = function (data) {
          return c.app.emit ? c.app.emit(_fctr(c, {})[k], data) : console.error('No App.emit()');
        };
        return p;
      });
    }

    r.push(compileAttrValue(k, v));
  });
  if (aProps) {
    var fn = compileAttrs(new Map().set('_', aProps))[0];
    r.push(function (c, p) {
      fn(c, p);return p;
    });
  }
  return r;
}

function compilePlaceholder(k, v) {
  var keys = v.split('|');
  var key = keys[0];
  if (keys.length === 1) {
    return function (c, p) {
      p[k] = c.get(key);return p;
    };
  } else {
    var fnx = keys.slice(1).map(function (k) {
      return k.trim();
    });
    return function (c, p) {
      p[k] = fnx.reduce(function (r, k) {
        return c.app.pipes && c.app.pipes[k] ? c.app.pipes[k](r) : r;
      }, c.get(key));return p;
    };
  }
}

function compileAttrValue(k, v) {
  if (!v.includes('{{')) {
    var r = v === 'true' ? true : v === 'false' ? false : v;
    return function (c, p) {
      p[k] = r;return p;
    };
  }
  if (v.match(RE_SINGLE_PLACEHOLDER)) {
    return compilePlaceholder(k, v.slice(2, -2));
  }
  var fnx = [];
  v.replace(RE_PLACEHOLDER, function (s, key) {
    return fnx.push(compilePlaceholder('p' + fnx.length, key));
  });
  return function (c, p) {
    var idx = 0;
    var pp = {};
    p[k] = v.replace(RE_PLACEHOLDER, function (s, key) {
      var r = fnx[idx](c, pp)['p' + idx];
      idx++;
      return r == null ? '' : r;
    });
    return p;
  };
}

// ==========
// XML Parse for templates. XML -> NodeTree
// ----------

var parseXML = exports.parseXML = function () {
  var RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g;
  var RE_XML_COMMENT = /<!--((?!-->)[\s\S])*-->/g;
  var RE_ATTRS = /([a-z][a-zA-Z0-9-:]+)="([^"]*)"/g;
  var RE_ESCAPE_XML_ENTITY = /["'&<>]/g;
  var RE_XML_TAG = /(<)(\/?)([a-zA-Z][a-zA-Z0-9-:]*)((?:\s+[a-z][a-zA-Z0-9-:]+="[^"]*")*)\s*(\/?)>/g;

  var SUBST_XML_ENTITY = {
    amp: '&',
    gt: '>',
    lt: '<',
    quot: '"',
    nbsp: ' '
  };
  var ESCAPE_XML_ENTITY = {
    34: '&quot;',
    38: '&amp;',
    39: '&#39;',
    60: '&lt;',
    62: '&gt;'
  };
  var FN_ESCAPE_XML_ENTITY = function FN_ESCAPE_XML_ENTITY(m) {
    return ESCAPE_XML_ENTITY[m.charCodeAt(0)];
  };
  var FN_XML_ENTITY = function FN_XML_ENTITY(_) {
    var s = _.substring(1, _.length - 1);
    return s[0] === '#' ? String.fromCharCode(+s.slice(1)) : SUBST_XML_ENTITY[s] || ' ';
  };
  var decodeXmlEntities = function decodeXmlEntities() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return s.replace(RE_XML_ENTITY, FN_XML_ENTITY);
  };
  var escapeXml = function escapeXml(s) {
    return !s ? '' : ('' + s).replace(RE_ESCAPE_XML_ENTITY, FN_ESCAPE_XML_ENTITY);
  };

  var UID = 1;

  var parseAttrs = function parseAttrs(s) {
    var r = new Map();
    if (!s) {
      return r;
    }
    while (1) {
      var e = RE_ATTRS.exec(s);
      if (!e) {
        return r;
      }
      r.set(e[1], decodeXmlEntities(e[2]));
    }
  };
  var stringifyAttrs = function stringifyAttrs(attrs) {
    if (!attrs || !attrs.size) {
      return '';
    }
    var r = [];
    attrs.forEach(function (v, k) {
      if (v && k !== '#text') {
        r.push(' ' + k + '="' + escapeXml(v) + '"');
      }
    });
    return r.join('');
  };

  var Node = function () {
    function Node(tag, attrs) {
      _classCallCheck(this, Node);

      this.uid = UID++;
      this.tag = tag || '';
      this.attrs = attrs || new Map();
      this.subs = [];
    }

    _createClass(Node, [{
      key: 'getChild',
      value: function getChild(index) {
        return this.subs[index];
      }
    }, {
      key: 'setText',
      value: function setText(text) {
        this.attrs.set('#text', text);
      }
    }, {
      key: 'addChild',
      value: function addChild(tag, attrs) {
        var e = new Node(tag, attrs);
        this.subs.push(e);
        return e;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return stringify(this, '');
      }
    }]);

    return Node;
  }();

  function stringify(_ref2, tab) {
    var tag = _ref2.tag,
        attrs = _ref2.attrs,
        subs = _ref2.subs;

    var sattrs = stringifyAttrs(attrs);
    var ssubs = subs.map(function (c) {
      return stringify(c, '  ' + tab);
    }).join('\n');
    var text = attrs.get('#text');
    var stext = text ? '  ' + tab + escapeXml(text) : '';
    return tab + '<' + tag + sattrs + (!ssubs && !stext ? '/>' : '>\n' + ssubs + stext + '\n' + tab + '</' + tag + '>');
  }

  return function (_s, key) {
    var s = ('' + _s).trim().replace(RE_XML_COMMENT, '');
    var ctx = [new Node()];
    var lastIndex = 0;
    // head text omitted
    while (1) {
      var e = RE_XML_TAG.exec(s);
      if (!e) {
        break;
      }
      // preceding text
      var text = e.index && s.slice(lastIndex, e.index);
      if (text && text.trim()) {
        ctx[0].addChild('#text').setText(text);
      }
      // closing tag
      if (e[2]) {
        if (ctx[0].tag !== e[3]) {
          throw new Error((key || '') + ' XML Parse closing tag does not match at: ' + e.index + ' near ' + e.input.slice(Math.max(e.index - 15, 0), Math.min(e.index + 15, e.input.length)));
        }
        ctx.shift();
      } else {
        var elt = ctx[0].addChild(e[3], parseAttrs(e[4]));
        // not single tag
        if (!e[5]) {
          ctx.unshift(elt);
          if (ctx.length === 1) {
            throw new Error('Parse error at: ' + e[0]);
          }
        }
      }
      // up past index
      lastIndex = RE_XML_TAG.lastIndex;
    }
    // tail text omitted
    return ctx[0].getChild(0);
  };
}();

/***/ })

/******/ });
//# sourceMappingURL=index.js.map