(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./commons/Form.js":
/*!*************************!*\
  !*** ./commons/Form.js ***!
  \*************************/
/*! exports provided: FormField, Form */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormField", function() { return FormField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return Form; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FIELD_TYPES = {
  bool: 'SwitchField'
};
var FormField =
/*#__PURE__*/
function () {
  function FormField() {
    _classCallCheck(this, FormField);
  }

  _createClass(FormField, [{
    key: "onChange",
    value: function onChange(_ref) {
      var value = _ref.value;
      var form = this.form;
      var field = this.field;
      var id = field.id;
      form.data = _objectSpread({}, form.data, _defineProperty({}, id, value));
      form.change && form.change(form.data);
    }
  }, {
    key: "TEMPLATE",
    get: function get() {
      return (
        /* html */
        "\n    <ui:fragment>\n      <ui:tag tag={fieldType} ui:props={fieldProps} onChange={onChange}/>\n    </ui:fragment>"
      );
    }
  }, {
    key: "fieldType",
    get: function get() {
      var type = this.field.type || 'text';
      return FIELD_TYPES[type] || String.capitalize(type) + 'Field';
    }
  }, {
    key: "fieldProps",
    get: function get() {
      var field = this.field;
      var form = this.form;
      var id = field.id;
      var data = form.data || {};
      var value = data[id];
      return _objectSpread({}, field, {
        error: form.error && form.error.fields && form.error.fields[id] || null,

        get disabled() {
          return field.disabled && field.disabled(this.value, this.data);
        },

        value: value === undefined ? null : value,
        caption: field.caption || field.name,
        data: data
      });
    }
  }]);

  return FormField;
}();
var Form =
/*#__PURE__*/
function () {
  function Form() {
    _classCallCheck(this, Form);
  }

  _createClass(Form, [{
    key: "getForm",
    value: function getForm() {
      return this;
    }
  }, {
    key: "getFields",
    value: function getFields() {
      return this.fields || Object.keys(this.data).map(function (id) {
        return {
          id: id,
          caption: id
        };
      });
    }
  }, {
    key: "TEMPLATE",
    get: function get() {
      return (
        /* html */
        "\n    <div autocomplete=\"off\" class=\"form-horizontal\">\n        <FormField ui:for=\"field of fields\" field={field} form={form}/>\n    </div>"
      );
    }
  }]);

  return Form;
}();

/***/ }),

/***/ "./commons/NavigationService.js":
/*!**************************************!*\
  !*** ./commons/NavigationService.js ***!
  \**************************************/
/*! exports provided: NavigationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationService", function() { return NavigationService; });
/* harmony import */ var _Service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Service */ "./commons/Service.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var NavigationService =
/*#__PURE__*/
function (_Service) {
  _inherits(NavigationService, _Service);

  function NavigationService() {
    _classCallCheck(this, NavigationService);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavigationService).apply(this, arguments));
  }

  _createClass(NavigationService, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.prevHash = '';

      this.hashchange = function () {
        var hash = window.location.hash.slice(1);

        if (hash[0] === '/' && hash !== _this.prevHash) {
          _this.emit('this.hash', {
            value: hash.slice(1)
          });

          _this.prevHash = hash;
        } else if (!_this.prevHash) {
          _this.emit('this.hash', {
            value: 'main'
          });

          _this.prevHash = '/main';
        }
      };

      window.addEventListener('hashchange', this.hashchange);
      setTimeout(function () {
        return _this.hashchange();
      }, 0);
    }
  }, {
    key: "done",
    value: function done() {
      window.removeEventListener('hashchange', this.hashchange);
    }
  }, {
    key: "update",
    value: function update(d) {
      var _Object$urlParse = Object.urlParse(d),
          target = _Object$urlParse.target,
          _Object$urlParse$path = _Object$urlParse.path,
          path = _Object$urlParse$path === void 0 ? ['*'] : _Object$urlParse$path,
          params = _Object$urlParse.params;

      var state = {
        target: (!target || target === '*' ? this.target : target) || 'main',
        path: path[0] === '*' ? this.path : path,
        params: params.reset ? _objectSpread({}, params, {
          reset: null
        }) : _objectSpread({}, this.params, {}, params)
      };
      window.location.hash = this.prevHash = '/' + Object.urlStringify(state);
      return state;
    }
  }, {
    key: "getRoute",
    value: function getRoute() {
      return {
        target: this.target,
        path: this.path,
        params: this.params
      };
    }
  }, {
    key: "onHash",
    value: function onHash(_ref) {
      var value = _ref.value;
      return this.update(value);
    }
  }, {
    key: "onParams",
    value: function onParams(params) {
      return this.update({
        params: _objectSpread({}, params, {
          data: null
        })
      });
    }
  }]);

  return NavigationService;
}(_Service__WEBPACK_IMPORTED_MODULE_0__["Service"]);

/***/ }),

/***/ "./commons/Service.js":
/*!****************************!*\
  !*** ./commons/Service.js ***!
  \****************************/
/*! exports provided: Service */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Service", function() { return Service; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Service =
/*#__PURE__*/
function () {
  function Service(props, $) {
    _classCallCheck(this, Service);

    Object.assign(this, props, {
      ref: $.ref,
      lookupService: function lookupService(ref) {
        return $.app[ref];
      },
      up: function up() {
        return $.up.apply($, arguments);
      },
      emit: function emit() {
        return $.emit.apply($, arguments);
      }
    });
  }

  _createClass(Service, [{
    key: "log",
    value: function log() {
      var _console;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, [this.ref + ': '].concat(args));
    }
  }, {
    key: "handleError",
    value: function handleError(_ref) {
      var _ref$message = _ref.message,
          message = _ref$message === void 0 ? '' : _ref$message,
          _ref$code = _ref.code,
          code = _ref$code === void 0 ? '' : _ref$code;
      // may  overriden from props
      var handler = this.lookupService('errorHandler');

      if (handler) {
        handler.handleError({
          message: message,
          code: code,
          source: this.ref
        });
      } else {
        console.error(this.ref + ': ERROR: ', message, code);
      }
    }
  }, {
    key: "safe",
    value: function safe(p, def) {
      var _this = this;

      return p["catch"](function (error) {
        _this.handleError(error);

        return def ? def(error) : {
          error: error
        };
      });
    }
  }]);

  return Service;
}();

/***/ }),

/***/ "./commons/ServiceWorker.js":
/*!**********************************!*\
  !*** ./commons/ServiceWorker.js ***!
  \**********************************/
/*! exports provided: ServiceWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceWorker", function() { return ServiceWorker; });
/* harmony import */ var _Service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Service */ "./commons/Service.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var ServiceWorker =
/*#__PURE__*/
function (_Service) {
  _inherits(ServiceWorker, _Service);

  function ServiceWorker() {
    _classCallCheck(this, ServiceWorker);

    return _possibleConstructorReturn(this, _getPrototypeOf(ServiceWorker).apply(this, arguments));
  }

  _createClass(ServiceWorker, [{
    key: "init",
    value: function init() {
      var _this = this;

      try {
        Function.assert(this.api, 'Service Workers are not supported');
        var _this$source = this.source,
            source = _this$source === void 0 ? '/service-worker.js' : _this$source,
            _this$scope = this.scope,
            scope = _this$scope === void 0 ? '/' : _this$scope,
            push = this.push;
        this.api.register(source, {
          scope: scope
        }).then(function (registration) {
          return _this.registered(registration);
        }).then(function () {
          return _this.ready(function () {
            return _this.log('Service Worker Ready');
          });
        });
        this.api.addEventListener('message', function (ev) {
          return _this.onMessage(ev);
        });

        if (push) {
          this.subscribe();
        }
      } catch (error) {
        this.fallback(error);
      }
    } // ensures that `fn` executed when api is ready

  }, {
    key: "ready",
    value: function ready(fn) {
      return this.api.ready.then(fn);
    }
  }, {
    key: "fallback",
    value: function fallback(error) {
      this.log(error);
    } // hook on registered

  }, {
    key: "registered",
    value: function registered(registration) {
      this.log('Service Worker Registered');
      return registration;
    }
    /**
     * Push
     */

  }, {
    key: "withPushManager",
    value: function withPushManager(fn) {
      return this.ready(function (_ref) {
        var pushManager = _ref.pushManager;
        return pushManager;
      }).then(fn);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      var _this2 = this;

      this.withPushManager(function (pushManager) {
        return pushManager.getSubscription();
      }).then(function (ss) {
        return ss && ss.unsubscribe();
      }).then(function () {
        return _this2.saveSubscription();
      })["catch"](function (e) {
        console.log('Error thrown while unsubscribing from  push messaging.', e);
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe() {
      var _this3 = this;

      function urlBase64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        var rawData = window.atob(base64);
        return Uint8Array.from(_toConsumableArray(rawData).map(function (_char) {
          return _char.charCodeAt(0);
        }));
      }

      if (Notification.permission === "granted") {
        /* do our magic */
      } else if (Notification.permission === "blocked") {
        /* the user has previously denied push. Can't reprompt. */
      } else {
          /* show a prompt to the user */
        }

      var applicationServerKey = urlBase64ToUint8Array(this.vapidPublicKey);
      this.withPushManager(function (pushManager) {
        return pushManager.getSubscription() // .then((ss) => ss && ss.unsubscribe())
        .then(function (ss) {
          return ss || pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
          });
        }).then(function (subscription) {
          return _this3.saveSubscription(subscription.toJSON());
        })["catch"](function (err) {
          if (Notification.permission === 'denied') {
            _this3.log('The user has blocked notifications.');
          }

          _this3.handleError(err);
        });
      });
    } // to be overriden from props

  }, {
    key: "saveSubscription",
    value: function saveSubscription(ss) {
      this.subscription = ss;
    }
    /**
     * Intercommunication between service worker.
     */
    // handles a message posted from Service worker.

  }, {
    key: "onMessage",
    value: function onMessage(payload) {
      this.log('onMessage', payload);
    }
  }, {
    key: "api",
    get: function get() {
      return navigator.serviceWorker;
    }
  }]);

  return ServiceWorker;
}(_Service__WEBPACK_IMPORTED_MODULE_0__["Service"]);

/***/ }),

/***/ "./commons/dates.js":
/*!**************************!*\
  !*** ./commons/dates.js ***!
  \**************************/
/*! exports provided: dateLocales, daysInMonth, monthName, dateFractions, formatTimezone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateLocales", function() { return dateLocales; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daysInMonth", function() { return daysInMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monthName", function() { return monthName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateFractions", function() { return dateFractions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTimezone", function() { return formatTimezone; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var pad = function pad(x) {
  var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String(x);
  return s.length === 1 ? '0' + s : s;
};

var dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
var dateLocales = {
  ru: {
    monthNames: ['', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['', 'Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    dayNamesShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    dayNames: dayNames
  }
};
var daysInMonth = Date.daysInMonth = function (month, year) {
  return new Date(year, month + 1, 0).getDate();
};
var monthName = Date.monthName = function (m) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (dateLocales.ru["monthNames".concat(mode)] || dateLocales.ru.monthNames)[m];
};
var dateFractions = Date.fractions = function () {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  return [x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds(), x.getMilliseconds()];
};
/* eslint-disable complexity, no-param-reassign */

Date.parseISO8601String = function (x) {
  if (typeof x !== 'string') {
    throw new Error("parseISO8601String: not a string: ".concat(x));
  }

  if (x.length === 10) {
    x += 'T12:00';
  }

  var timebits = /^([0-9]{4})-([0-9]{2})-([0-9]{2})[ T]([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(Z?)(([+-])([0-9]{2})([0-9]{2}))?/;
  var m = timebits.exec(x);

  if (!m) {
    return null;
  }

  var tz = m[8] ? !m[9] ? 0 : (m[10] === '+' ? -1 : +1) * (parseInt(m[11]) * 60 + parseInt(m[12])) : new Date().getTimezoneOffset(); // utcdate is milliseconds since the epoch

  var utcdate = Date.UTC(parseInt(m[1]), parseInt(m[2]) - 1, // months are zero-offset (!)
  parseInt(m[3]), parseInt(m[4]), parseInt(m[5]), // hh:mm
  m[6] && parseInt(m[6]) || 0, // optional seconds
  m[7] && parseFloat(m[7]) || 0);
  return new Date(utcdate + tz * 60000);
};
/**
 * Universal all-weather converter to Date.
 *
 * @param {*} x any value to be converted to date
 * @returns Date instance or null
 */


Date.narrow = function (x) {
  var type = _typeof(x);

  if (x == null) {
    return null;
  }

  if (type === 'number') {
    return new Date(x);
  }

  if (type === 'object') {
    // Date already
    if (x.getTime) {
      return x;
    } // having a date re-presentation method


    if (x.toDate) {
      return x.toDate();
    } // firestore timestamp for web


    if (x.seconds && x.nanoseconds != null) {
      return new Date(x.seconds * 1000 + x.nanoseconds);
    }
  }

  return Date.parseISO8601String(x);
}; // return date in format dd.mm.yyyy


Date.format = function (x) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dd.mm.yyyy';

  if (!x) {
    return '';
  }

  var date = Date.narrow(x);

  if (!date) {
    return '';
  }

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return format.replace(/[_]/g, '\n').replace('hh', pad(date.getHours())).replace('ii', pad(date.getMinutes())).replace('t', pad(date.getHours()) + ':' + pad(date.getMinutes())).replace('dd', pad(day)).replace('dow', '' + dayNames[date.getDay()]).replace('d', '' + day).replace('mmmm', monthName(month, '')).replace('mmm', monthName(month, 'Short')).replace('mm', pad(month)).replace('yyyy', "".concat(year));
};

Date.formatTime = function (x) {
  if (!x) {
    return '';
  }

  var date = Date.narrow(x);
  var minutes = date.getMinutes();
  return "".concat(date.getHours(), ":").concat(pad(minutes));
};

Date.firstOfWeek = function (d) {
  var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.narrow(d);
  return new Date(x.getFullYear(), x.getMonth(), x.getDate() - x.getDay());
};

var formatTimezone = function formatTimezone(tzOffset) {
  var toNumber = Number(tzOffset);
  return toNumber ? toNumber >= 0 ? "+".concat(pad(toNumber / 60), ":").concat(pad(toNumber % 60)) : "-".concat(pad(-toNumber / 60), ":").concat(pad(-toNumber % 60)) : '';
};

/***/ }),

/***/ "./commons/elements.html":
/*!*******************************!*\
  !*** ./commons/elements.html ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<body>\n\n\n    <template id=\"Icon\">\n        <i class=\"fa{bundle|or:s} fa-{type} {class}\" data={data} click={click}></i>\n    </template>\n\n    <template id=\"Img\">\n        <img src={src|equals:*|then:@default:@src} alt={alt} class=\"img {class}\" style={style} />\n    </template>\n\n    <template id=\"Avatar\">\n        <figure class=\"avatar {large|then:avatar-lg}\">\n            <Img src={src} alt={alt}\n                 default=\"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\" />\n        </figure>\n    </template>\n\n    <template id=\"Button\">\n        <button class=\"btn btn-{mode} {primary|then:btn-primary} {disabled|or:@busy|then:disabled} {class} {large|then:btn-lg} {link|then:btn-link} c-hand\"\n                style=\"white-space:nowrap;{style}\"\n                data={data}\n                click={action|track:@trackId:@title}>\n            <i ui:if=\"{busy}\" class=\"loading mx-2\"></i>\n            <Icon ui:if=\"icon\" bundle={iconBundle} type={icon} class=\"mx-2\" />\n            <span ui:if=\"title\">{title}</span>\n        </button>\n    </template>\n\n    <template id=\"BigRedButton\">\n        <button class=\"btn2 {tooltip|then:tooltip} tooltip-left fixed bg-primary circle c-hand {class}\"\n                style=\"border:none; right:1.5rem; bottom:1.5rem; width: 2.5rem; height: 2.5rem; z-index:5;\"\n                data={data} data-tooltip={tooltip|or:} click={action|track:@trackId:big}>\n            <Icon type={icon|or:plus} />\n        </button>\n    </template>\n\n    <template id=\"NavLink\">\n        <a data-value={href} click=\"-> nav.hash\" class=\"c-hand {class}\">\n            <ui:slot />\n        </a>\n    </template>\n\n    <template id=\"Popover\">\n        <div class=\"popover popover-right\">\n            <ui:slot />\n            <div class=\"popover-container\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <ui:slot id=\"body\" />\n                    </div>\n                </div>\n            </div>\n        </div>\n    </template>\n\n    <template id=\"Modal\">\n        <div class=\"modal modal {open|then:active}\">\n            <a class=\"modal-overlay\" aria-label=\"Close\" data={data} click={close}></a>\n            <div class=\"modal-container\">\n                <div class=\"modal-header\">\n                    <a class=\"btn btn-clear float-right\" aria-label=\":close\" data={data} click={close}></a>\n                    <div class=\"modal-title h5\" ui:if={title}>{title}</div>\n                    <ui:slot id=\"header\" />\n                </div>\n                <div class=\"modal-body\" style=\"max-height: 70vh;\">\n                    <div class=\"content\">\n                        <ui:slot />\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <ui:slot id=\"footer\" />\n                </div>\n            </div>\n        </div>\n    </template>\n\n    <template id=\"Tabs\">\n        <ul class=\"tab tab-block\">\n            <li class=\"tab-item {item.id|equals:@value|then:active} c-hand\" ui:for=\"item of data\">\n                <a data-id={item.id} click={action}>{item.name}</a>\n            </li>\n        </ul>\n    </template>\n\n</body>");

/***/ }),

/***/ "./commons/fields.html":
/*!*****************************!*\
  !*** ./commons/fields.html ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<body id=\"app\">\n    <template id=\"FieldItem\">\n        <div class=\"columns form-group has-error:{error} {class}\">\n            <div class=\" col-4 col-sm-12\">\n                <label class=\"form-label\" for=\"input-example-1\">\n                    {caption}\n                    <sup ui:if={required}\n                         class=\"text-error\">✱</sup>\n                </label>\n            </div>\n            <div class=\"col-8 col-sm-12\">\n                <ui:slot />\n                <p class=\"form-input-hint\" ui:if={error}>{error}</p>\n            </div>\n        </div>\n    </template>\n\n    <template id=\"TextField\">\n        <FieldItem caption={caption} error={error} required={required}>\n            <input class=\"form-input\"\n                   type=\"text\"\n                   disabled={disabled}\n                   placeholder={placeholder|or:@caption}\n                   value={value}\n                   change={onChange}>\n        </FieldItem>\n    </template>\n\n    <template id=\"DateField\">\n        <FieldItem caption={caption} error={error} required={required}>\n            <input class=\"form-input\"\n                   disabled={disabled}\n                   type=\"date\"\n                   placeholder={caption}\n                   value={value}\n                   change={onChange}>\n        </FieldItem>\n    </template>\n\n    <template id=\"DateTimeField\">\n        <FieldItem caption=\"{caption}\" error={error} required={required}>\n            <input class=\"form-input\"\n                   disabled={disabled}\n                   type=\"datetime-local\"\n                   placeholder={caption}\n                   value={value|date:yyyy-mm-ddTt}\n                   change={onChange}>\n        </FieldItem>\n    </template>\n\n    <template id=\"NumberField\">\n        <FieldItem caption={caption} error={error} required={required}>\n            <input class=\"form-input\"\n                   disabled={disabled}\n                   type=\"number\"\n                   placeholder={caption}\n                   value={value}\n                   change={onChange}>\n        </FieldItem>\n    </template>\n\n    <template id=\"TextareaField\">\n        <FieldItem caption={caption} error={error} required={required}>\n            <textarea\n                      class=\"form-input\"\n                      style=\"min-height: 15vw\"\n                      disabled={disabled} placeholder={caption} rows=\"3\" change={onChange} value={value}></textarea>\n        </FieldItem>\n    </template>\n\n    <template id=\"SwitchField\">\n        <div class=\"form-group\">\n            <div class=\"col-sm-12\">\n                <label class=\"form-switch\">\n                    <span>{caption}</span>\n                    <input type=\"checkbox\" toggle={onChange} data={data} checked={value|not|not}>\n                    <i class=\"form-icon\"></i>\n                </label>\n            </div>\n        </div>\n    </template>\n\n    <template id=\"EnumField\">\n        <FieldItem caption={caption} class={class} error={error} required={required}>\n            <Select class=\"form-select\"\n                    change={onChange}\n                    value={value|or:@defaultValue}\n                    data={data}\n                    options=\":enums.{typeSpec}\"\n                    emptyCaption={emptyCaption}\n                    disabled={disabled} />\n        </FieldItem>\n    </template>\n\n    <template id=\"SelectField\">\n        <FieldItem caption={caption} class={class} error={error} required={required}>\n            <Select class=\"form-select\"\n                    change={onChange}\n                    value={value|or:@defaultValue}\n                    data={data}\n                    options={options}\n                    emptyCaption={emptyCaption}\n                    disabled={disabled} />\n        </FieldItem>\n    </template>\n\n    <template id=\"RadioField\">\n        <FieldItem caption={caption} error={error} required={required}>\n            <RadioGroup change={onChange}\n                        value={value} data={data} options=\":enums.{typeSpec}\"\n                        disabled={disabled} />\n        </FieldItem>\n    </template>\n\n    <template id=\"ReferenceField\">\n        <FieldItem caption={caption} error={error} required={required}>\n            <Loader from=\"-> references.{typeSpec}Search\"\n                    data-value={keyword.value|orDataPropValueByKey:keyword}\n                    trigger={keyword.value}\n                    into=\"->options\" />\n            <Loader from=\"-> references.{typeSpec}Entry\" data-id={value} trigger={value} into=\"->entry\" />\n            <ReferenceInput change={onChange}\n                            value={value} entry={entry.data}\n                            onKeyword=\"->keyword\" keyword={keyword.value|orDataPropValueByKey:keyword}\n                            onSelectMenuItem=\"->entry\"\n                            options={options.data}\n                            disabled={disabled} />\n        </FieldItem>\n    </template>\n\n    <template id=\"RemoteEnumField\">\n        <FieldItem caption={caption} error={error} required={required}>\n            <Loader from=\"-> references.{typeSpec}Enum\" data={data} into=\"->options\" />\n            <Select class=\"form-select\" change={onChange} value={value} data={options.data} disabled={disabled} />\n        </FieldItem>\n    </template>\n\n</body>");

/***/ }),

/***/ "./commons/index.js":
/*!**************************!*\
  !*** ./commons/index.js ***!
  \**************************/
/*! exports provided: loadTemplates, commonPipes, commonTypes, Service */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTemplates", function() { return loadTemplates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonPipes", function() { return commonPipes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonTypes", function() { return commonTypes; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./commons/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ "./commons/url.js");
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_url_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dates.js */ "./commons/dates.js");
/* harmony import */ var _support_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./support.js */ "./commons/support.js");
/* harmony import */ var _pipes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pipes.js */ "./commons/pipes.js");
/* harmony import */ var _elements_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./elements.html */ "./commons/elements.html");
/* harmony import */ var _table_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./table.html */ "./commons/table.html");
/* harmony import */ var _inputs_html__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./inputs.html */ "./commons/inputs.html");
/* harmony import */ var _fields_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fields.html */ "./commons/fields.html");
/* harmony import */ var _layouts_html__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./layouts.html */ "./commons/layouts.html");
/* harmony import */ var _viewport_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./viewport.html */ "./commons/viewport.html");
/* harmony import */ var _NavigationService__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./NavigationService */ "./commons/NavigationService.js");
/* harmony import */ var _ServiceWorker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ServiceWorker */ "./commons/ServiceWorker.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Form */ "./commons/Form.js");
/* harmony import */ var _Service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Service */ "./commons/Service.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Service", function() { return _Service__WEBPACK_IMPORTED_MODULE_14__["Service"]; });

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
















var loadTemplates = function loadTemplates() {
  var R = [];

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (s) {
    return s.replace(/<template\sid="(.+)">([\s\S]*?)<\/template>/gm, function (_, id, templ) {
      return R.push({
        NAME: id,
        TEMPLATE: "<ui:fragment>".concat(templ.trim(), "</ui:fragment>")
      });
    });
  });
  return R;
};
var commonPipes = _pipes_js__WEBPACK_IMPORTED_MODULE_4__["default"];
var commonTypes = [_ServiceWorker__WEBPACK_IMPORTED_MODULE_12__["ServiceWorker"], _NavigationService__WEBPACK_IMPORTED_MODULE_11__["NavigationService"]].concat(_toConsumableArray(Object.values(_support_js__WEBPACK_IMPORTED_MODULE_3__)), _toConsumableArray(Object.values(_Form__WEBPACK_IMPORTED_MODULE_13__)), _toConsumableArray(loadTemplates(_elements_html__WEBPACK_IMPORTED_MODULE_5__["default"], _table_html__WEBPACK_IMPORTED_MODULE_6__["default"], _fields_html__WEBPACK_IMPORTED_MODULE_8__["default"], _viewport_html__WEBPACK_IMPORTED_MODULE_10__["default"], _layouts_html__WEBPACK_IMPORTED_MODULE_9__["default"], _inputs_html__WEBPACK_IMPORTED_MODULE_7__["default"])));

if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
  window.commonTypes = commonTypes;
  window.loadTemplates = loadTemplates;
  window.commonPipes = commonPipes;
}

/***/ }),

/***/ "./commons/inputs.html":
/*!*****************************!*\
  !*** ./commons/inputs.html ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<body>\n    <template id=\"Select\">\n        <select class=\"{class}\" change={change} disabled={disabled} data={data}>\n            <option selected={value|not} value=\"\" ui:if={value|not|or:@emptyCaption}>{emptyCaption}</option>\n            <option ui:for=\"option of options\" selected={option.id|equals:@value} value={option.id}>\n                {option.name}\n            </option>\n        </select>\n    </template>\n\n    <template id=\"RadioGroup\">\n        <div class=\"{class}\">\n            <label class=\"form-radio\" ui:for=\"option of options\">\n                <input type=\"radio\" name={id|or:rg}\n                       value={option.id}\n                       checked={option.id|equals:@value} change={change} data={data}\n                       disabled={disabled}>\n                <i class=\"form-icon\"></i>{option.name}\n            </label>\n        </div>\n    </template>\n\n    <template id=\"Dropdown\">\n        <div class=\"dropdown\">\n            <a href=\"#\" class=\"btn btn-link dropdown-toggle\" tabindex=\"0\">\n                {data|selectedName}<i class=\"icon icon-caret\"></i>\n            </a>\n            <!-- menu component -->\n            <ul class=\"menu\" style=\"right:0;left:auto;\">\n                <li ui:for=\"item of data|selectizedBy\" class=\"menu-item {item.id|equals:@value|then:active}\"\n                    data-id={item.id}\n                    data-name={item.name}\n                    click={change}>\n                    <a>{item.name}</a>\n                </li>\n            </ul>\n        </div>\n    </template>\n\n    <template id=\"DateTimeInput\">\n        <input class=\"form-input flatpickr-input\"\n               init={:support.initFlatpickr}\n               disabled={disabled}\n               type=\"text\"\n               placeholder={placeholder}\n               value={value|support.setFlatpickrValue}\n               change={change}>\n    </template>\n\n    <template id=\"SearchBar\">\n        <span class=\"ant-input-search ant-input-affix-wrapper\">\n            <input placeholder=\"Поиск...\" class=\"ant-input\" type=\"text\"\n                   value={value} enter={action}\n                   style=\"min-height:40px;\">\n            <span class=\"ant-input-suffix\">\n                <i class=\"anticon anticon-search ant-input-search-icon\" style=\"margin-top: 4px;\"></i>\n            </span>\n        </span>\n    </template>\n\n    <template id=\"ReferenceInput\">\n        <div class=\"form-autocomplete\">\n            <div class=\"form-input has-icon-right\" data-showMenu={showMenu|not} click=\"->\">\n                <div>{entry.fullNameRu}</div>\n                <i class=\"form-icon icon icon-edit c-hand\"></i>\n            </div>\n            <Modal ui:if={showMenu} open=\"true\" title=\"Выбор опции {title}\" data-showMenu=\"false\" close=\"->\">\n                <div class=\"menu\" style=\"position:sticky;top:-20;z-index:101; border-bottom: none; box-shadow: unset\">\n                    <div class=\"form-group has-icon-right\">\n                        <input class=\"form-input\" type=\"text\"\n                               value={keyword} placeholder=\"search...\" change={onKeyword}>\n                        <i class=\"form-icon icon icon-cross c-hand\" data-value=\"\" click={onKeyword}></i>\n                    </div>\n                    <div ui:if={options} class=\"menu-item\">\n                        <div class=\"tile tile-centered mx-1\">\n                            <b class=\"tile-content\">Найдено: {options.length}</b>\n                        </div>\n                    </div>\n                </div>\n                <ul class=\"menu\" style=\"position:unset; border-top: none; box-shadow: unset\">\n                    <li class=\"menu-item\" ui:for=\"item of options\" data-showMenu=\"false\" click=\"->\">\n                        <div click={change} data-value={item.id}>\n                            <div class=\"tile tile-centered mx-1\">\n                                <figure class=\"avatar avatar-xs bg-primary\" data-initial={item.fullNameRu|initials}>\n                                </figure>\n                                <div class=\"tile-content\">{item.fullNameRu}, {item.birthday|date}</div>\n                            </div>\n                        </div>\n                    </li>\n                </ul>\n            </Modal>\n        </div>\n    </template>\n</body>");

/***/ }),

/***/ "./commons/layouts.html":
/*!******************************!*\
  !*** ./commons/layouts.html ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<body>\n\n    <template id=\"Grid\">\n        <div class=\"columns {class}\">\n            <ui:slot />\n        </div>\n    </template>\n\n    <template id=\"Col\">\n        <div class=\"col-{size|or:6} col-sm-12 {class}\">\n            <ui:slot />\n        </div>\n    </template>\n    <template id=\"Centroid\">\n        <div class=\"{class}\" style=\"display: flex;align-items: center;justify-content: center;{style}\">\n            <ui:slot />\n        </div>\n    </template>\n\n    <template id=\"FlexBox\">\n        <div class=\"{class}\" style=\"display: flex;align-items: stretch;justify-content:space-around;{style}\">\n            <ui:slot />\n        </div>\n    </template>\n\n    <template id=\"Tile\">\n        <div class=\"tile {centered|then:tile-centered} m-2 {class}\">\n            <div class=\"tile-icon\" ui:if={image}>\n                <Avatar src={image} />\n            </div>\n            <div class=\"tile-icon\" ui:if={icon}>\n                <Icon type={icon} />\n            </div>\n            <div class=\"tile-content\">\n                <div class=\"tile-title text-bold\" ui:if=\"title\">{title}</div>\n                <div class=\"tile-subtitle\" ui:if=\"subtitle\">{subtitle}</div>\n                <ui:slot />\n            </div>\n            <div class=\"tile-action btn-group\" ui:if=\"slot(actions)\">\n                <ui:slot id=\"actions\" />\n            </div>\n        </div>\n    </template>\n    <template id=\"Panel\">\n        <ui:fragment>\n            <h6 class=\"mt-2 pt-2 px-2 mx-2 text-gray\" ui:if=\"caption\">{caption}</h6>\n            <div class=\"panel mx-2 {class}\" style={style}>\n                <small class=\"p-2 bg-secondary\" ui:if={hint}>{hint}</small>\n                <div class=\"panel-header\" ui:if=\"slot(title)\">\n                    <div class=\"panel-title\">\n                        <ui:slot id=\"title\" />\n                    </div>\n                </div>\n                <div class=\"panel-nav\" ui:if=\"slot(nav)\">\n                    <ui:slot id=\"nav\" />\n                </div>\n                <div class=\"panel-body\">\n                    <ui:slot />\n                </div>\n                <div class=\"panel-footer\" ui:if=\"slot(footer)\">\n                    <ui:slot id=\"footer\" />\n                </div>\n            </div>\n        </ui:fragment>\n    </template>\n    <template id=\"Card\">\n        <div class=\"card\" style={style}>\n            <div class=\"card-image\" ui:if={image}>\n                <img src={image} class=\"img-responsive\" />\n            </div>\n            <div class=\"card-header\">\n                <a ui:if={title} href={link}>\n                    <h5 class=\"card-title\">{title}</h5>\n                </a>\n                <div ui:if={subtitle} class=\"card-subtitle text-gray\">{subtitle}</div>\n                <ui:slot id=\"header\" />\n            </div>\n            <div class=\"card-body\">\n                <ui:slot />\n            </div>\n            <div class=\"card-footer\">\n                <ui:slot id=\"footer\" />\n            </div>\n        </div>\n    </template>\n\n</body>");

/***/ }),

/***/ "./commons/pipes.js":
/*!**************************!*\
  !*** ./commons/pipes.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  // system
  log: function log(x, pre) {
    console.log(pre || 'pipe', x);
    return x;
  },
  track: function track(fn, x, y) {
    return function () {
      console.log('track', x || y);
      return (fn || Function.ID).apply(void 0, arguments);
    };
  },
  // eslint-disable-next-line no-debugger
  debug: function debug() {
    debugger;
  },
  // logical
  equals: function equals(x, p) {
    return x == p;
  },
  greater: function greater(x, p) {
    return x > p;
  },
  includes: function includes(x, p) {
    return x.includes && x.includes(p);
  },
  then: function then(x) {
    var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    return x ? p : n;
  },
  not: function not(x) {
    return !x;
  },
  or: function or(x, alt) {
    return x || alt;
  },
  plus: function plus(x, alt) {
    return +x + +alt;
  },
  minus: function minus(x, alt) {
    return +x - +alt;
  },
  multiply: function multiply(x, alt) {
    return +x * +alt;
  },
  fn: Function,
  str: String,
  arr: Array,
  date: Object.assign(function (s, format) {
    return Date.format(s, format);
  }, Date, {
    orNow: function orNow(x) {
      return x || new Date();
    },
    firstOfWeek: Date.firstOfWeek,
    time: Date.formatTime
  })
});

/***/ }),

/***/ "./commons/support.js":
/*!****************************!*\
  !*** ./commons/support.js ***!
  \****************************/
/*! exports provided: Delay, Invoke, Loader, ErrorHandlingService, ToastService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Delay", function() { return Delay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Invoke", function() { return Invoke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return Loader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorHandlingService", function() { return ErrorHandlingService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToastService", function() { return ToastService; });
/* harmony import */ var _Service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Service */ "./commons/Service.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Delay =
/*#__PURE__*/
function () {
  function Delay() {
    _classCallCheck(this, Delay);
  }

  _createClass(Delay, [{
    key: "init",
    value: function init() {
      var _this = this;

      setTimeout(function () {
        if (!_this.isDone) {
          _this.action(_this.data);
        }
      }, (this.period || 5) * 1000);
    }
  }]);

  return Delay;
}();
var Invoke =
/*#__PURE__*/
function () {
  function Invoke() {
    _classCallCheck(this, Invoke);
  }

  _createClass(Invoke, [{
    key: "init",
    value: function init() {
      this.action(this.data);
    }
  }]);

  return Invoke;
}();
var Loader =
/*#__PURE__*/
function () {
  function Loader() {
    _classCallCheck(this, Loader);
  }

  _createClass(Loader, [{
    key: "init",
    value: function init() {
      this.reload();
    }
  }, {
    key: "setTrigger",
    value: function setTrigger(val) {
      this.trigger = val;
      this.reload();
    }
  }, {
    key: "reload",
    value: function reload() {
      var from = this.from,
          data = this.data,
          into = this.into;

      if (from && into) {
        from(_objectSpread({}, data, {
          callback: function callback(error, result) {
            return into(_objectSpread({
              error: error
            }, result));
          }
        }));
      }
    }
  }]);

  return Loader;
}();
var ErrorHandlingService =
/*#__PURE__*/
function (_Service) {
  _inherits(ErrorHandlingService, _Service);

  function ErrorHandlingService() {
    _classCallCheck(this, ErrorHandlingService);

    return _possibleConstructorReturn(this, _getPrototypeOf(ErrorHandlingService).apply(this, arguments));
  }

  _createClass(ErrorHandlingService, [{
    key: "handleError",
    value: function handleError(_ref) {
      var _ref$message = _ref.message,
          message = _ref$message === void 0 ? '' : _ref$message,
          code = _ref.code,
          _ref$source = _ref.source,
          source = _ref$source === void 0 ? {} : _ref$source;
      this.show({
        message: source + ': ' + message,
        code: code,
        mode: 'error'
      });
    }
  }, {
    key: "show",
    value: function show(_ref2) {
      var _ref2$message = _ref2.message,
          message = _ref2$message === void 0 ? '' : _ref2$message,
          _ref2$code = _ref2.code,
          code = _ref2$code === void 0 ? '' : _ref2$code,
          source = _ref2.source;
      console.error(source + ': ERROR: ', code, message);
    }
  }]);

  return ErrorHandlingService;
}(_Service__WEBPACK_IMPORTED_MODULE_0__["Service"]);
var ToastService =
/*#__PURE__*/
function (_Service2) {
  _inherits(ToastService, _Service2);

  function ToastService() {
    _classCallCheck(this, ToastService);

    return _possibleConstructorReturn(this, _getPrototypeOf(ToastService).apply(this, arguments));
  }

  _createClass(ToastService, [{
    key: "onSend",
    value: function onSend(_ref3) {
      var _this2 = this;

      var data = _ref3.data;
      return {
        top: _objectSpread({}, data, {
          close: function close() {
            return _this2.emit('this.close');
          },
          closeAfter: 5
        })
      };
    }
  }, {
    key: "onClose",
    value: function onClose() {
      return {
        top: null
      };
    }
  }]);

  return ToastService;
}(_Service__WEBPACK_IMPORTED_MODULE_0__["Service"]);

/***/ }),

/***/ "./commons/table.html":
/*!****************************!*\
  !*** ./commons/table.html ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<body>\n    <template id=\"LoadingIndicator\">\n        <div class=\"loading {large|then:loading-lg} {class}\" />\n    </template>\n\n    <template id=\"EmptyData\">\n        <div class=\"empty {class}\">\n            <div class=\"empty-icon\">\n                <Icon type={icon|or:people} />\n            </div>\n            <p class=\"empty-title h5\">{title}</p>\n            <p ui:if={subtitle} class=\"empty-subtitle\">{subtitle}</p>\n            <div class=\"empty-action\">\n                <ui:slot />\n            </div>\n        </div>\n    </template>\n\n    <template id=\"LoadableItems\">\n        <LoadingIndicator class=\"empty\" ui:if=\"data|not\">\n            <ui:else>\n                <h5 class=\"error text-error\" ui:if=\"data.error\">{data.error.message|or:@data.error}</h5>\n                <EmptyData title={emptyCaption|or:Empty} ui:if=\"data.length|not\">\n                    <ui:else>\n                        <div style={style} ui:for=\"item of data\">\n                            <ui:tag tag={itemType} ui:props={item} item={item} context={context} action={action} />\n                        </div>\n                    </ui:else>\n                </EmptyData>\n            </ui:else>\n        </LoadingIndicator>\n    </template>\n\n    <template id=\"LoadableEntity\">\n        <LoadingIndicator class=\"empty\" ui:if=\"data|not\">\n            <ui:else>\n                <h5 class=\"error text-error\" ui:if=\"data.error\">\n                    <span>{data.error.message|or:@data.error}</span>\n                    <ui:else>\n                        <EmptyData title={emptyCaption|or:Empty} ui:if=\"data.id|not\">\n                            <ui:else>\n                                <ui:tag tag={type} data={data} context={context} action={action} />\n                            </ui:else>\n                        </EmptyData>\n                    </ui:else>\n                </h5>\n            </ui:else>\n        </LoadingIndicator>\n    </template>\n\n    <template id=\"Cell\">\n        <span class=\"\" style=\"padding-left: 0px;\">{value}</span>\n    </template>\n    <template id=\"EnumCell\">\n        <span class=\"\"\n              style=\"padding-left: 0px;\">:map.{typeSpec}.{value}</span>\n    </template>\n\n    <template id=\"DateCell\">\n        <span class=\"\" style=\"padding-left: 0px;\">{value|date}</span>\n    </template>\n\n    <template id=\"Table\">\n        <table style=\"position: relative;\">\n            <thead class=\"table-thead\">\n                <tr>\n                    <th class=\"col-index\" style=\"position: sticky; top: -1;\"></th>\n                    <th class=\"col-index\" style=\"position: sticky; top: -1;\" ui:for=\"item of columns\">\n                        <span>{item.name}</span>\n                        <div class=\"table-column-sorter\" ui:if=\"item.sortable\">\n                            <span class=\"table-column-sorter-up off\" title=\"↑\" data-id=\"-{item.id}\"\n                                  click={doSort}><i class=\"anticon anticon-caret-up\"></i></span>\n                            <span class=\"table-column-sorter-down off\" title=\"↓\" data-id={item.id} click={doSort}><i\n                                   class=\"anticon anticon-caret-down\"></i></span>\n                        </div>\n                    </th>\n                </tr>\n            </thead>\n            <TableRow ui:for=\"item of data\" data={item} selected={item.selected} columns={columns} kind={kind} />\n        </table>\n    </template>\n\n    <template id=\"TableRow\">\n        <tbody class=\"table-tbody\">\n            <tr class=\"table-row table-row-level-0\" style=\"position:sticky;\">\n                <td class=\"col-index\" data-id={data.id} click={doItem}>\n                    <div ui:if={expandable}\n                         role=\"button\"\n                         class=\"table-row-expand-icon table-row-expanded\"\n                         aria-label=\"Collapse row\"\n                         data-selected=\"false\" click=\"->\">\n                        <ui:else>\n                            <div role=\"button\"\n                                 class=\"table-row-expand-icon table-row-collapsed\"\n                                 aria-label=\"Expand row\"\n                                 data-selected=\"true\" click=\"->\"></div>\n                        </ui:else>\n                    </div>\n                </td>\n                <td class=\"col-index\" ui:for=\"col of columns\">\n                    <ui:tag tag=\"{col.type|str.capitalize}Cell\" ui:props={col} value={col.id|propObjectValueByKey}\n                            data={data} />\n                </td>\n            </tr>\n            <tr ui:if={expanded} class=\"table-expanded-row table-expanded-row-level-1\">\n                <td class=\"\"></td>\n                <td class=\"\" colspan=\"100\">\n                    <ui:tag tag=\"{kind|str.capitalize}RowInsider\" data={data} />\n                </td>\n            </tr>\n        </tbody>\n    </template>\n</body>");

/***/ }),

/***/ "./commons/url.js":
/*!************************!*\
  !*** ./commons/url.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Parses string into URL object.
 *
 * @param {string} s string in format: `type:target/path?params#data`
 * @param {object} r optional target object
 * @returns URL object like `{type, target, path, params, data }`
 */
Object.urlParse = function (s) {
  var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!s) {
    return _objectSpread({
      path: [],
      params: {},
      target: ''
    }, r);
  }

  if (_typeof(s) === 'object') {
    return _objectSpread({
      path: [],
      params: {},
      target: ''
    }, r, {}, s);
  }

  var p; // extract type:

  p = s.indexOf(':');

  if (p > -1) {
    r.type = s.slice(0, p);
    s = s.slice(p + 1);
  } // extract data:


  p = s.indexOf('#');

  if (p > -1) {
    r.data = decodeValue(s.slice(p + 1));
    s = s.slice(0, p);
  } // extract query params:


  p = s.indexOf('?');
  r.params = r.params || {};

  if (p > -1) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = s.slice(p + 1).split('&')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var param = _step.value;

        var _param$split = param.split('='),
            _param$split2 = _slicedToArray(_param$split, 2),
            key = _param$split2[0],
            value = _param$split2[1];

        if (value) {
          r.params[key] = decodeValue(value);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    s = s.slice(0, p);
  } // target and path:


  var path = r.path = s.split('/').map(decodeURIComponent);

  while (path.length && !r.target) {
    r.target = path.shift();
  }

  return r;
};
/**
*  Represents an URL object as a string
*
* @param {object} r URL object like `{type, target, path, params, data }`
* @returns string in format `type:target/path?params#data`
*/


Object.urlStringify = function (r) {
  var result = '';

  if (!r) {
    return result;
  }

  if (typeof r === 'string') {
    return r;
  }

  if (r.target) {
    if (r.type) {
      result += "".concat(r.type, "://");
    }

    result += r.target;
  }

  if (r.path) {
    result += "/".concat(Array.isArray(r.path) ? r.path.map(encodeURIComponent).join('/') : r.path);
  }

  var params = r.params;

  if (params) {
    var keys = Object.keys(params).filter(function (key) {
      return params[key] != null;
    });

    if (keys.length) {
      result += "?".concat(keys.map(function (key) {
        return "".concat(key, "=").concat(encodeValue(params[key]));
      }).join('&'));
    }
  }

  if (r.data) {
    result += "#".concat(encodeValue(r.data));
  }

  return result;
};

var VALUE_MAP = {
  "true": true,
  "false": false,
  undefined: undefined
};

function decodeValue(val) {
  var value = decodeURIComponent(val);

  if ('{['.indexOf(value[0]) > -1) {
    return JSON.parse(value);
  }

  var num = +value;

  if (value.length <= 17 && !isNaN(num)) {
    return num;
  }

  return VALUE_MAP[value] || value;
}

function encodeValue(value) {
  return encodeURIComponent(_typeof(value) === 'object' ? JSON.stringify(value) : "".concat(value));
}

/***/ }),

/***/ "./commons/utils.js":
/*!**************************!*\
  !*** ./commons/utils.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/** ***********************
 * Objects.
 */

/**
 * Checks if argument is empty .
 */
Object.EMPTY = Object.freeze({});

Object.isEmpty = function (x) {
  if (!x) {
    return true;
  }

  if (x instanceof Object) {
    // (zero-length array)
    if (Array.isArray(x)) {
      return x.length === 0;
    } // (zero-size map)


    if (x instanceof Map) {
      return x.size === 0;
    } // (has no props)


    return Object.keys(x).length === 0;
  }

  return false;
};
/**
 * Digs value in a given object structure by a given path.
 *
 * @param {*} o source object
 * @param {*} steps path
 * @param {*} def default value
 */


Object.dig = function (o, steps) {
  return steps.split('.').reduce(function (r, e) {
    return r ? r[e] : void 0;
  }, o);
};
/**
 * Formats given string template with params.
 *
 * Template should contain placeholders like `{someKey}`,
 * which will be replaced with value by key from params.
 *
 * @param {string} template string template
 * @param {object} params hash with parameters
 */


String.format = function (template, params) {
  return "".concat(template || '').replace(/\{([\S]+)\}/i, function (_, key) {
    return (params && params[key]) != null ? params[key] : '';
  });
};

function capitalize(x) {
  if (!x) {
    return x;
  }

  var s = "".concat(x);
  return s[0].toUpperCase() + s.slice(1);
}

function camelize(s) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  return s && s.length && s.split(sep).map(function (t, i) {
    return i ? capitalize(t) : t;
  }).join('') || "";
}

String.tail = function (x) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

  if (!x) {
    return '';
  }

  var pos = x.lastIndexOf(sep);
  return pos === -1 ? x : x.slice(pos + sep.length);
};

String.lastTail = function (key) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
  return ('' + key).split(sep).slice(-1)[0];
};

String.head = function (x) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

  if (!x) {
    return '';
  }

  var pos = x.indexOf(sep);
  return pos === -1 ? x : x.slice(0, pos);
};

String.pad = function (x) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
  var s = String(x);

  while (s.length < size) {
    s = "".concat(fill).concat(s);
  }

  return s;
};

String.capitalize = capitalize;
String.camelize = camelize;

String.mirror = function (x) {
  return (x || '').split('').reduce(function (r, c) {
    return c + r;
  }, '');
};

String.snakeCase = function (x) {
  return (x || '').replace(/([a-z])([A-Z])/g, '$1_$2');
};

String.proper = function (s) {
  return capitalize(camelize(s));
};

String.upper = function (s) {
  return ('' + s).toUpperCase();
};
/** ***********************
 * Arrays.
 */


Array.EMPTY = Object.freeze([]);

Array.slice = function (x) {
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var e = arguments.length > 2 ? arguments[2] : undefined;
  return x ? x.slice(b, e) : [];
};
/**
 * Builds histogram on given field for given list.
 *
 * @param {*} list source
 * @param {*} field to be used as group key
 */


Array.groupBy = function (list) {
  var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var result = {};
  var fieldFn = typeof field === 'string' ? function (e) {
    return e[field];
  } : field;

  var iter = function iter(v, entry) {
    var slot = result[v] || (result[v] = {
      id: v,
      count: 0,
      subs: []
    });
    slot.count++;
    slot.subs.push(entry);
  };

  (list || []).forEach(function (e) {
    var value = fieldFn(e);

    if (Array.isArray(value)) {
      value.forEach(function (v) {
        return iter(v, e);
      });
    } else {
      iter(value, e);
    }
  });
  return result;
};
/**
 * Sorts array by element property.
 *
 * @param {*} arr source
 * @param {*} property element property to sort by
 * @param {*} order
 */


Array.sortBy = function sortBy(arr) {
  var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'name';
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var fn = property;

  if (typeof property === 'string') {
    if (property[0] === '-') {
      /* eslint-disable */
      order = -1;
      property = property.substr(1);
    }

    fn = function fn(e) {
      return e[property];
    };
  }

  function compare(a, b) {
    var aa = fn(a);
    var bb = fn(b);
    /* eslint-disable */

    return aa < bb ? -order : aa > bb ? order : 0;
  }

  return (arr || []).slice(0).sort(compare);
};
/**
 * Transforms array into hash object.
 * 
 * @param {*} list source array
 * @param {*} idKey id key
 * @param {*} valKey value key
 */


Array.toHash = function (list) {
  var idKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var valKey = arguments.length > 2 ? arguments[2] : undefined;
  var r = {};

  if (list) {
    var isKeyFn = typeof idKey === 'string' ? function (e) {
      return e[idKey];
    } : idKey;
    list.forEach(function (e) {
      r[isKeyFn(e)] = valKey ? e[valKey] : e;
    });
  }

  return r;
};
/** ***********************
 * Crypto.
 */

/**
 * Functions
 */


Function.ID = function (x) {
  return x;
};

Function.next = function (COUNTER) {
  return function () {
    var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return p + COUNTER++;
  };
}(1);

Function["throw"] = function (error) {
  var ErrorType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Error;
  throw typeof error === 'string' ? new ErrorType(error) : error;
};

Function.assert = function (b, error, errorType) {
  return b || Function["throw"](error, errorType);
};

Function.compose = function () {
  for (var _len = arguments.length, ff = new Array(_len), _key = 0; _key < _len; _key++) {
    ff[_key] = arguments[_key];
  }

  return function (x0) {
    return ff.reduceRight(function (x, f) {
      return f(x);
    }, x0);
  };
};

Function.swap = function (f) {
  return function (a, b) {
    return f(b, a);
  };
};

Function.curry = function () {
  var _curry = function _curry(fn, args0, lengthLimit) {
    var fx = function fx(args) {
      return args.length >= lengthLimit ? fn.apply(void 0, _toConsumableArray(args)) : _curry(fn, args, lengthLimit - args.length);
    };

    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return fx([].concat(_toConsumableArray(args0), args));
    };
  };

  return function (f) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return _curry(f, args, f.length);
  };
}();
/* Simple GUID generator. */


Function.guid = function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return "".concat(s4() + s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4()).concat(s4()).concat(s4());
};
/* eslint-disable */

/* Simple hash function. */


Function.hash = function (s) {
  var a = 1,
      c = 0,
      h,
      o;

  if (s) {
    a = 0;
    /* jshint plusplus:false bitwise:false */

    for (h = s.length - 1; h >= 0; h--) {
      o = s.charCodeAt(h);
      a = (a << 6 & 268435455) + o + (o << 14);
      c = a & 266338304;
      a = c !== 0 ? a ^ c >> 21 : a;
    }
  }

  return String(a);
};

/***/ }),

/***/ "./commons/viewport.html":
/*!*******************************!*\
  !*** ./commons/viewport.html ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<body>\n    <template id=\"ViewPort\">\n        <ui:fragment>\n            <ToastService ui:ref=\"toaster\" />\n            <ErrorHandlingService ui:ref=\"errorHandler\" show=\"-> toaster.send\" />\n            <ui:fragment ui:if=\"slot(aside)\">\n                <Sidebar caption={caption}>\n                    <Sidebar:aside>\n                        <ui:slot id=\"aside\" />\n                    </Sidebar:aside>\n                    <main>\n                        <Toast event=\"<- toaster.top\" />\n                        <ui:slot />\n                    </main>\n                </Sidebar>\n                <ui:else>\n                    <main>\n                        <Toast event=\"<- toaster.top\" />\n                        <ui:slot />\n                    </main>\n                </ui:else>\n            </ui:fragment>\n        </ui:fragment>\n    </template>\n\n    <template id=\"PageRouter\">\n        <ui:tag tag=\"{target|str.capitalize|or:Main}Page\" ui:props={params} params={params} />\n    </template>\n\n    <template id=\"Toast\">\n        <div class=\"toast toast-{event.mode|or:@mode|or:primary}\"\n             style=\"position:absolute;top:1rem;right:1rem;left:1rem;{style}\"\n             ui:if=\"event\">\n            <button class=\"btn btn-clear float-right\" click={event.close}></button>\n            <p>{event.message}</p>\n            <Delay ui:if={event.closeAfter} action={event.close} period={event.closeAfter} />\n        </div>\n    </template>\n\n    <template id=\"Sidebar\">\n        <div class=\"off-canvas off-canvas-sidebar-show\">\n            <a class=\"off-canvas-toggle btn btn-primary btn-action show-lg bg-red\"\n               href=\"#sidebar\">\n                <Icon type=\"bars\" />\n            </a>\n            <div id=\"sidebar\" class=\"off-canvas-sidebar\">\n                <aside style=\"display:flex; flex-direction: column; height: 100vh; width:200px\">\n                    <div class=\"text-center\" ui:if={caption}>\n                        <a href=\"#/main\">\n                            <h5 class=\"p-2\">{caption}</h5>\n                        </a>\n                    </div>\n                    <div class=\"m-2\" style=\"flex:1; overflow-y: auto;\">\n                        <ui:slot id=\"aside\" />\n                    </div>\n                </aside>\n            </div>\n            <a class=\"off-canvas-overlay\" href=\"#\"></a>\n            <div class=\"off-canvas-content\">\n                <ui:slot />\n            </div>\n        </div>\n    </template>\n\n    <template id=\"Navbar\">\n        <header class=\"navbar {class}\" style=\"min-height:48px\">\n            <section class=\"navbar-section\">\n                <div class=\"mx-2\">\n                    <NavLink href={back} ui:if={back}>\n                        <Button link class=\"text-primary\" icon=\"arrow-left\" title=\":action.back\" />\n                    </NavLink>\n                    <h4 class=\"m-1\" style=\"vertical-align: middle;\" ui:if={caption}>{caption}</h4>\n                    <ui:slot id=\"left\" />\n                </div>\n            </section>\n            <section class=\"navbar-center\" ui:if={logo}>\n                <img src={logo} style=\"max-height:44px;\" />\n            </section>\n            <section class=\"navbar-section\">\n                <div class=\"mx-2\">\n\n                    <ui:slot />\n                </div>\n\n            </section>\n        </header>\n    </template>\n\n    <template id=\"NavTree\">\n        <ul class=\"nav\">\n            <li class=\"nav-item {item.class}\" ui:for=\"item of data\">\n                <NavLink href={item.id}>\n                    <span>{item.name}</span>\n                    <span ui:if={item.label} class=\"label label-error\">{item.label}</span>\n                </NavLink>\n                <NavTree ui:if={item.subs} data={item.subs} />\n            </li>\n        </ul>\n    </template>\n</body>");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: loadTemplates, commonPipes, commonTypes, launch, Service */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./lib/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "launch", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["launch"]; });

/* harmony import */ var _commons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commons */ "./commons/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadTemplates", function() { return _commons__WEBPACK_IMPORTED_MODULE_1__["loadTemplates"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "commonPipes", function() { return _commons__WEBPACK_IMPORTED_MODULE_1__["commonPipes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "commonTypes", function() { return _commons__WEBPACK_IMPORTED_MODULE_1__["commonTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Service", function() { return _commons__WEBPACK_IMPORTED_MODULE_1__["Service"]; });




/***/ }),

/***/ "./lib/compile.js":
/*!************************!*\
  !*** ./lib/compile.js ***!
  \************************/
/*! exports provided: expression, stringInterpolation, placeholder, withPipes, filterMapKey, compileFor, compileIf, compileTag, compile, compileNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expression", function() { return expression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringInterpolation", function() { return stringInterpolation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placeholder", function() { return placeholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withPipes", function() { return withPipes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterMapKey", function() { return filterMapKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compileFor", function() { return compileFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compileIf", function() { return compileIf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compileTag", function() { return compileTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compile", function() { return compile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compileNode", function() { return compileNode; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var VALUES = {
  "true": true,
  "false": false,
  "null": null
};
var RE_SINGLE_PLACEHOLDER = /^\{([^}]+)\}$/;
var RE_PLACEHOLDER = /\{([^}]+)\}/g;

function pipe(value, key) {
  var _key$split = key.split(':'),
      _key$split2 = _toArray(_key$split),
      id = _key$split2[0],
      args = _key$split2.slice(1);

  try {
    var fn = this.res(id);
    var $ = this;
    return fn.apply($.impl, [value].concat(_toConsumableArray(args.map(function (a) {
      return a[0] === '@' ? $.prop(a.slice(1)) : a;
    }))));
  } catch (ex) {
    console.error('ERROR: Object.pipes.' + id, ex);
    return value;
  }
} // Compilation


function expression(v) {
  if (v[0] === ':') {
    return placeholder(v);
  }

  if (!v.includes('{')) {
    var r = v in VALUES ? VALUES[v] : v;
    return function () {
      return r;
    };
  }

  if (v.match(RE_SINGLE_PLACEHOLDER)) {
    return placeholder(v.slice(1, -1).trim());
  }

  return stringInterpolation(v);
}
function stringInterpolation(v) {
  var fnx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var pattern = v.replace(RE_PLACEHOLDER, function (s, expr) {
    fnx.push(placeholder(expr));
    return '{{' + (fnx.length - 1) + '}}';
  });
  return function (c) {
    return !fnx.length ? pattern : pattern.replace(/\{\{(\d+)\}\}/g, function (s, idx) {
      var r = fnx[idx](c);
      return !r && r !== 0 ? '' : r;
    });
  };
}
function placeholder(expr) {
  var _expr$split$map = expr.split('|').map(function (s) {
    return s.trim();
  }),
      _expr$split$map2 = _toArray(_expr$split$map),
      key = _expr$split$map2[0],
      pipes = _expr$split$map2.slice(1);

  var initGettr = key[0] === ':' ? function (fn) {
    return function (c) {
      return c.res(fn(c));
    };
  }(stringInterpolation(key.slice(1).trim())) : function (c) {
    return c.prop(key);
  };
  var pipec = withPipes(pipes);
  return function (c) {
    return pipec(c, initGettr(c));
  };
}
function withPipes(pipes) {
  return !pipes.length ? function (c, v) {
    return v;
  } : function (c, initialValue) {
    return pipes.reduce(function (r, pk) {
      return pipe.call(c, r, pk);
    }, initialValue);
  };
}

var assignKeyValue = function assignKeyValue(acc, val, k) {
  if (k.slice(0, 5) === 'data-') {
    acc['data'] = _objectSpread({}, acc['data'], _defineProperty({}, k.slice(5), val in VALUES ? VALUES[val] : val));
  } else {
    acc[k] = val;
  }
};

var makeApplicator = function makeApplicator(get) {
  var k = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  return function (c, acc) {
    return assignKeyValue(acc, get(c), k);
  };
};

var hasSlot = function hasSlot(c, id) {
  var r = false;

  if (id && id != 'default') {
    c.content && c.content.forEach(function (e) {
      r = r || e.tag === c.tag + ':' + id;
    });
  } else {
    c.content && c.content.forEach(function (e) {
      r = r || e.tag.slice(0, c.tag.length + 1) !== c.tag + ':';
    });
  }

  return r;
};

var filterMapKey = function filterMapKey(src, key) {
  var r = new Map();
  src.forEach(function (v, k) {
    if (k !== key) {
      r.set(k, v);
    }
  });
  return r;
};
function compileFor(_ref) {
  var tag = _ref.tag,
      attrs = _ref.attrs,
      uid = _ref.uid,
      nodes = _ref.nodes;

  var _attrs$get$split = attrs.get('ui:for').split(' '),
      _attrs$get$split2 = _slicedToArray(_attrs$get$split, 3),
      itemId = _attrs$get$split2[0],
      expr = _attrs$get$split2[2];

  var $spec = {
    itemId: itemId
  };
  var r = {
    tag: 'ui:for',
    uid: 'for:' + expr + uid,
    $spec: $spec,
    key: attrs.get('key')
  };

  if (expr.slice(0, 2) === '<-') {
    var _expr$slice$split$map = expr.slice(2).split('|').map(function (s) {
      return s.trim();
    }),
        _expr$slice$split$map2 = _toArray(_expr$slice$split$map),
        key = _expr$slice$split$map2[0],
        pipes = _expr$slice$split$map2.slice(1);

    var pipec = withPipes(pipes);
    (r.inits || (r.inits = [])).push(function (c) {
      return c.connect(key, function (rr) {
        return {
          $data: pipec(c.owner, rr)
        };
      });
    });
  } else {
    (r.updates || (r.updates = [])).push(makeApplicator(expression('{:'.includes(expr[0]) ? expr : '{' + expr + '}'), '$data'));
  }

  var $nodes = nodes;

  if (nodes && nodes.length) {
    var emptyNode = $nodes.find(function (e) {
      return e.tag === 'ui:empty';
    });

    if (emptyNode) {
      $spec.emptyNode = emptyNode.nodes.map(compileNode);
      $nodes = $nodes.filter(function (e) {
        return e !== emptyNode;
      });
    }

    var loadingNode = $nodes.find(function (e) {
      return e.tag === 'ui:loading';
    });

    if (loadingNode) {
      $spec.loadingNode = loadingNode.nodes.map(compileNode);
      $nodes = $nodes.filter(function (e) {
        return e !== loadingNode;
      });
    }
  }

  $spec.itemNode = compileNode({
    tag: tag,
    attrs: filterMapKey(attrs, 'ui:for'),
    uid: uid,
    nodes: $nodes
  });
  return r;
}
function compileIf(_ref2) {
  var tag = _ref2.tag,
      attrs = _ref2.attrs,
      uid = _ref2.uid,
      nodes = _ref2.nodes;
  var aIf = attrs.get('ui:if');
  var iff = {};
  var r = {
    tag: 'ui:if',
    uid: 'if:' + aIf + uid,
    key: attrs.get('key'),
    $spec: iff
  };
  var neg = aIf[0] === '!';
  var expr = neg ? aIf.slice(1) : aIf;

  if (expr.slice(0, 2) === '<-') {
    var _expr$slice$split$map3 = expr.slice(2).split('|').map(function (s) {
      return s.trim();
    }),
        _expr$slice$split$map4 = _toArray(_expr$slice$split$map3),
        key = _expr$slice$split$map4[0],
        pipes = _expr$slice$split$map4.slice(1);

    var pipec = withPipes(pipes);
    var applicator = neg ? function (c) {
      return function (rr) {
        return {
          $data: !pipec(c, rr)
        };
      };
    } : function (c) {
      return function (rr) {
        return {
          $data: !!pipec(c.owner, rr)
        };
      };
    };
    (r.inits || (r.inits = [])).push(function (c) {
      return c.connect(key, applicator(c));
    });
  } else if (expr.slice(0, 5) === 'slot(') {
    var gttr = function gttr(c) {
      return hasSlot(c, expr.slice(5, -1));
    };

    (r.updates || (r.updates = [])).push(function (c, acc) {
      acc['$data'] = neg ? !gttr(c) : gttr(c);
    });
  } else {
    var _gttr = expression(expr.includes('{') ? expr : '{' + expr + '}');

    (r.updates || (r.updates = [])).push(function (c, acc) {
      acc['$data'] = neg ? !_gttr(c) : _gttr(c);
    });
  }

  var $then = {
    tag: tag,
    attrs: filterMapKey(attrs, 'ui:if'),
    uid: uid,
    nodes: nodes
  };

  if (nodes && nodes.length) {
    var ifElse = nodes.find(function (e) {
      return e.tag === 'ui:else';
    });
    var ifThen = nodes.find(function (e) {
      return e.tag === 'ui:then';
    });

    if (ifElse) {
      iff["else"] = ifElse.nodes.map(compileNode);
      $then.nodes = ifThen ? ifThen.nodes : nodes.filter(function (e) {
        return e !== ifElse;
      });
    } else if (ifThen) {
      $then.nodes = ifThen.nodes;
    }
  }

  iff.then = [$then].map(compileNode);
  return r;
}
function compileTag(_ref3) {
  var attrs = _ref3.attrs,
      uid = _ref3.uid,
      nodes = _ref3.nodes;
  var expr = attrs.get('tag');
  var r = {
    tag: 'ui:tag',
    uid: 'tag:' + expr + uid,
    $spec: compile({
      attrs: filterMapKey(attrs, 'tag'),
      nodes: nodes
    })
  };

  if (expr.slice(0, 2) === '<-') {
    (r.inits || (r.inits = [])).push(function (c) {
      return c.connect(expr.slice(2).trim(), function (rr) {
        return {
          $data: rr
        };
      });
    });
  } else {
    var gttr = expression(expr);
    (r.updates || (r.updates = [])).push(function (c, acc) {
      acc['$data'] = gttr(c);
    });
  }

  return r;
}
function compile(r) {
  var attrs = r.attrs,
      nodes = r.nodes;

  if (attrs.has('id')) {
    r.id = attrs.get('id');
  }

  if (attrs.has('ui:ref')) {
    r.ref = attrs.get('ui:ref');
  } // ui:props


  if (attrs.has('ui:props')) {
    var aProps = attrs.get('ui:props');

    if (aProps.slice(0, 2) === '<-') {
      var _aProps$slice$split$m = aProps.slice(2).split('|').map(function (s) {
        return s.trim();
      }),
          _aProps$slice$split$m2 = _toArray(_aProps$slice$split$m),
          key = _aProps$slice$split$m2[0],
          pipes = _aProps$slice$split$m2.slice(1);

      var pipec = withPipes(pipes);
      (r.inits || (r.inits = [])).push(function (c) {
        return c.connect(key, function (rr) {
          return pipec(c.owner, rr);
        });
      });
    } else {
      var getter = expression(aProps);
      (r.updates || (r.updates = [])).push(function (c, acc) {
        return Object.assign(acc, getter(c));
      });
    }
  } // attrs


  attrs.forEach(function (v, k) {
    if (k.slice(0, 3) !== 'ui:') {
      var v2 = v.slice(0, 2);

      if (v2 === '<-') {
        var _v$slice$split$map = v.slice(2).split('|').map(function (s) {
          return s.trim();
        }),
            _v$slice$split$map2 = _toArray(_v$slice$split$map),
            _key = _v$slice$split$map2[0],
            _pipes = _v$slice$split$map2.slice(1);

        var _pipec = withPipes(_pipes);

        (r.inits || (r.inits = [])).push(function (c) {
          return c.connect(_key, function (rr) {
            return _defineProperty({}, k, _pipec(c.owner, rr));
          });
        });
      } else if (v2 === '->') {
        var _v$slice$split$map3 = v.slice(2).split('|').map(function (s) {
          return s.trim();
        }),
            _v$slice$split$map4 = _toArray(_v$slice$split$map3),
            _key2 = _v$slice$split$map4[0],
            _pipes2 = _v$slice$split$map4.slice(1);

        var expr = expression(_key2);

        var _pipec2 = withPipes(_pipes2);

        var ekey = '$' + v + ':' + r.uid;

        var emitter = function emitter(c) {
          return c[ekey] || (c[ekey] = function (data, cb) {
            return c.emit(expr(c), _pipec2(c.owner, data), cb);
          });
        };

        (r.updates || (r.updates = [])).push(function (c, acc) {
          return assignKeyValue(acc, emitter(c), k);
        });
      } else {
        if (!v.includes('{') && v[0] !== ':' && k.slice(0, 5) !== 'data-') {
          assignKeyValue(r.initials || (r.initials = {}), v, k);
        } else {
          (r.updates || (r.updates = [])).push(makeApplicator(expression(v), k));
        }
      }
    }
  });
  r.nodes = nodes.map(compileNode);
  return r;
}
function compileNode(node) {
  if (node.attrs.has('ui:for')) {
    return compileFor(node);
  }

  if (node.attrs.has('ui:if')) {
    return compileIf(node);
  }

  if (node.tag === 'ui:tag') {
    return compileTag(node);
  }

  return compile(node);
}

/***/ }),

/***/ "./lib/component.js":
/*!**************************!*\
  !*** ./lib/component.js ***!
  \**************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ "./lib/render.js");
/* harmony import */ var _resolve_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolve.js */ "./lib/resolve.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-console */


var COUNTER = 1;

var fnId = function fnId(e) {
  return e;
};

var nextId = function nextId() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return p + COUNTER++;
};

var applyValue = function applyValue(value) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fnId;
  return value && value.then ? value.then(fn) : fn(value);
};

var methodName = function methodName(x) {
  var pre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!x) {
    return pre;
  }

  var s = "".concat(x);
  return pre + s[0].toUpperCase() + s.slice(1);
};

function bindFn(f) {
  var $ = this;
  var map = $.$boundFnMap || ($.$boundFnMap = new Map());
  var fn = map.get(f);

  if (!fn) {
    var bound = f.bind($.impl);

    fn = function fn() {
      var r = bound.apply(void 0, arguments);

      if (r) {
        $.up(r);
      }
    };

    map.set(f, fn);
  }

  return fn;
}

var upAsync = function upAsync($, promise, key) {
  var racer = $.raceCondition('set:' + (key || 'up'));

  var up = function up(r) {
    return racer(function () {
      return $.up(r);
    });
  };

  if (key && key !== '...') {
    var akey = key.replace('Promise', '');
    promise.then(function (val) {
      var _up;

      return up((_up = {}, _defineProperty(_up, akey + 'Error', null), _defineProperty(_up, akey, val), _up));
    }, function (error) {
      return up(_defineProperty({}, akey + 'Error', error));
    });
  } else {
    promise.then(up, function (error) {
      return up({
        error: error
      });
    });
  }

  return promise;
};

var propGetter = function propGetter($, key) {
  var map = $.$propFnMap || ($.$propFnMap = {});
  var fn = map[key];

  if (fn) {
    return fn;
  }

  var impl = $.impl;

  var _key$split = key.split('.'),
      _key$split2 = _toArray(_key$split),
      pk = _key$split2[0],
      path = _key$split2.slice(1);

  var gettr = impl[methodName(pk, 'get')];
  var extractor1 = gettr ? function () {
    return gettr.call(impl);
  } : function () {
    var $$ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : impl.get ? impl.get(impl) : impl;
    return pk in $$ ? $$[pk] : void 0;
  };
  fn = !path.length ? extractor1 : function () {
    return path.reduce(function (r, p) {
      return r && p in r ? r[p] : void 0;
    }, extractor1());
  };
  return map[key] = fn;
};

var Component =
/*#__PURE__*/
function () {
  function Component(Ctor, options) {
    var _this = this;

    _classCallCheck(this, Component);

    Object.assign(this, options);
    var ref = this.ref,
        parent = this.parent,
        props = this.props;

    if (parent) {
      this.app = parent.app;
      this.ctx = this.elt = parent.elt;
      this.impl = new Ctor(props, this);
      this.impl.$ = this;
      this.impl.app = this.app;

      if (ref) {
        var hidden = this.app[ref];
        this.app[ref] = this.impl;
        this.defer(function () {
          _this.app[ref] = hidden;
        });
      }
    } else {
      this.app = this.impl = new Ctor(props, this);
      this.impl.$ = this;
    }
  }
  /**
   * Rendering.
   */


  _createClass(Component, [{
    key: "render",
    value: function render() {
      if (this.isDone) {
        return;
      }

      this.ctx.cursor = this.prevElt;
      this.impl.render ? this.impl.render(this, _render_js__WEBPACK_IMPORTED_MODULE_0__["render"]) : Object(_render_js__WEBPACK_IMPORTED_MODULE_0__["render"])(this);
    }
  }, {
    key: "resolveTemplate",
    value: function resolveTemplate() {
      return this.impl.resolveTemplate ? this.impl.resolveTemplate(this) : Object(_resolve_js__WEBPACK_IMPORTED_MODULE_1__["resolveTemplate"])(this, this.impl.constructor.$TEMPLATE());
    }
    /**
     * Life-cycle hooks.
     */

  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.isDone || this.isInited) {
        return;
      }

      this.isInited = true;

      if (this.inits) {
        var initials = this.impl.init && this.impl.init(this) || {};
        var all = [];
        this.inits.map(function (f) {
          return f(_this2);
        }).forEach(function (r) {
          if (!r) return;
          var hotValue = r.hotValue,
              cancel = r.cancel;

          _this2.defer(cancel);

          if (hotValue && hotValue.then) {
            all.push(hotValue);
          } else {
            Object.assign(initials, hotValue);
          }
        });
        delete this.inits;
        this.up(initials);

        if (all.length) {
          Promise.all(all).then(function (args) {
            return _this2.up(args.reduce(Object.assign, {}));
          });
        }
      } else {
        if (this.impl.init) {
          var d = this.impl.init(this);

          if (d) {
            this.up(d);
          }
        }
      }
    }
  }, {
    key: "done",
    value: function done() {
      var _this3 = this;

      if (this.isDone) {
        return;
      }

      this.isDone = true;

      if (this.impl.done) {
        this.impl.done(this);
      }

      if (this.children) {
        this.children.forEach(function (c) {
          c.parent = null;
          c.done();
        });
      }

      if (this.parent) {
        this.parent.children["delete"](this.uid);
      }

      if (this.prevElt) {
        this.prevElt.nextElt = this.nextElt;
      }

      if (this.defered) {
        this.defered.forEach(function (f) {
          return f(_this3);
        });
        delete this.defered;
      }

      ['parent', 'children', 'owner', 'impl', 'app', 'ctx'].forEach(function (k) {
        delete _this3[k];
      });
    }
    /**
     * State.
     */

  }, {
    key: "up",
    value: function up(Δ) {
      if (this.isDone) {
        return;
      }

      var changed = this.set(Δ);
      this.render();

      if (this.ref && changed) {
        this.notify();
      }
    }
  }, {
    key: "set",
    value: function set(Δ) {
      var $ = this;
      var impl = $.impl;
      var changed = false;

      if (impl.set) {
        changed = impl.set(Δ);
      } else if (Δ) {
        if (Δ.then) {
          upAsync($, Δ);
        } else {
          Object.entries(Δ).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                k = _ref2[0],
                their = _ref2[1];

            if (their && their.then) {
              upAsync($, their, k);
            } else if (k && typeof their !== 'undefined' && their !== impl[k]) {
              var setter = impl['set' + k[0].toUpperCase() + k.slice(1)];

              if (setter) {
                setter.call(impl, their);
              } else {
                impl[k] = their;
              }

              changed = true;
            }
          });
        }
      }

      return changed;
    }
  }, {
    key: "prop",
    value: function prop(propId) {
      var value = propGetter(this, propId)();
      return typeof value === 'function' ? bindFn.call(this, value) : value;
    }
    /**
     *  Left Arrow.
     */

  }, {
    key: "notify",
    value: function notify() {
      if (this.listeners && !this.notifying) {
        this.notifying = true;
        this.listeners.forEach(function (e) {
          return e();
        });
        this.notifying = false;
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(target, fn) {
      var _this4 = this;

      var uuid = nextId();
      var listeners = this.listeners || (this.listeners = new Map());
      listeners.set(uuid, function () {
        try {
          target.up(fn(_this4));
        } catch (ex) {
          console.error(_this4.tag + _this4.uid + ' notify ', ex);
        }
      });
      return {
        hotValue: fn(this),
        cancel: function cancel() {
          return listeners["delete"](uuid);
        }
      };
    }
  }, {
    key: "connect",
    value: function connect(key, applicator) {
      var _key$split3 = key.split('.'),
          _key$split4 = _slicedToArray(_key$split3, 2),
          refId = _key$split4[0],
          propId = _key$split4[1];

      var ref = refId === 'this' ? this.impl : this.app[refId];

      if (!ref) {
        return console.error('connect: No such ref ' + refId, key);
      }

      return ref.$.subscribe(this, function ($) {
        return applyValue($.prop(propId), applicator);
      });
    }
    /**
     *  Right Arrow.
     */

  }, {
    key: "emit",
    value: function emit(key, data) {
      var $ = this;

      if (!key || !key.includes('.')) {
        return $.up(key ? _defineProperty({}, key, data) : data);
      }

      var _key$split5 = key.split('.'),
          _key$split6 = _slicedToArray(_key$split5, 2),
          type = _key$split6[0],
          target = _key$split6[1];

      var event = _objectSpread({
        data: data
      }, data);

      var ref = type === 'this' ? $.impl : $.app[type];

      if (!ref) {
        console.warn('emit: No such ref ' + type);
        return;
      }

      try {
        var method = ref[methodName(target, 'on')];

        if (!method) {
          throw new ReferenceError('emit ' + type + ': No such method ' + methodName(target, 'on'));
        }

        var result = method.call(ref, event, ref, ref.$);
        this.log(type + ':' + methodName(target, 'on'), result, event, ref);

        if (result) {
          ref.$.up(result);
        }
      } catch (ex) {
        console.error('emit ' + key + ':', ex);
      }
    }
    /**
     * Routines.
     */

  }, {
    key: "raceCondition",
    value: function raceCondition(key) {
      var COUNTERS = this.$weak || (this.$weak = new Map());
      var counter = 1 + (COUNTERS.get(key) || 0);
      COUNTERS.set(key, counter);
      return function (fn) {
        if (counter === COUNTERS.get(key)) {
          counter = 0;
          fn();
        }
      };
    }
  }, {
    key: "defer",
    value: function defer(fn) {
      if (fn && typeof fn === 'function') {
        (this.defered || (this.defered = [])).push(fn);
      }
    }
  }, {
    key: "log",
    value: function log() {
      var _console;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, [this.tag + this.uid].concat(args));
    }
  }, {
    key: "res",
    value: function res(key) {
      var _key$split7 = key.split('.'),
          _key$split8 = _toArray(_key$split7),
          id = _key$split8[0],
          deep = _key$split8.slice(1);

      var target = id === 'app' ? this.app : this.app.resources[id];

      if (!target || deep.length === 0) {
        return target;
      }

      if (deep.length === 1) {
        return target[deep[0]];
      }

      return deep.reduce(function (r, k) {
        return r ? r[k] : null;
      }, target);
    }
  }]);

  return Component;
}();

/***/ }),

/***/ "./lib/dom.js":
/*!********************!*\
  !*** ./lib/dom.js ***!
  \********************/
/*! exports provided: launch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "launch", function() { return launch; });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ "./lib/render.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component.js */ "./lib/component.js");
/* harmony import */ var _register_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register.js */ "./lib/register.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var camelize = function camelize(key) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  var jn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
  return ('' + key).split(sep).map(function (s, i) {
    return i ? s[0].toUpperCase() + s.slice(1) : s;
  }).join(jn);
}; // DOM


var DOM_SETTERS = {
  '#text': function text(e, v) {
    return e.textContent = v == null ? '' : v;
  },
  disabled: function disabled(e, v) {
    return e.disabled = v ? true : null;
  },
  "class": function _class(e, v) {
    e.className = v;
  },
  selected: function selected(e, v) {
    return e.selected = v ? true : null;
  },
  value: function value(e, v) {
    return e.value = v == null ? '' : v;
  },
  checked: function checked(e, v) {
    return e.checked = !!v;
  },
  init: function init(e, v) {
    var _this = this;

    this.init = function () {
      return v(e, _this);
    };
  },
  data: function data(e, v) {
    if (v && e.$dataset) {
      Object.keys(e.$dataset).forEach(function (k) {
        if (!v[k]) {
          e.dataset[camelize(k, '-', '')] = null;
        }
      });
    }

    e.$dataset = _objectSpread({}, v);

    if (v) {
      Object.keys(v).forEach(function (k) {
        e.dataset[camelize(k, '-', '')] = v[k];
      });
    }
  },
  click: function click(e, v) {
    var _this2 = this;

    this.setAttribute('click:click', !v ? null : function (ev) {
      _this2.$attributes.click(_objectSpread({}, e.$dataset), ev);

      return false;
    });
  },
  'bubble-click': function bubbleClick(e, v) {
    var _this3 = this;

    this.setAttribute('bubbled-click:click', !v ? null : function (ev) {
      _this3.$attributes['bubble-click'](_objectSpread({}, e.$dataset), ev);

      return true;
    });
  },
  blur: function blur(e, v) {
    var _this4 = this;

    this.setAttribute('blur:blur', !v ? null : function (ev) {
      _this4.$attributes.blur(_objectSpread({}, e.$dataset), ev);

      return false;
    });
  },
  dblclick: function dblclick(e, v) {
    var _this5 = this;

    this.setAttribute('dblclick:dblclick', !v ? null : function (ev) {
      _this5.$attributes.dblclick(_objectSpread({}, e.$dataset), ev);

      return false;
    });
  },
  scroll: function scroll(e, v) {
    var _this6 = this;

    this.setAttribute('scroll:scroll', !v ? null : function (ev) {
      _this6.$attributes.scroll(_objectSpread({}, e.$dataset), ev);

      return false;
    });
  },
  touchstart: function touchstart(e, v) {
    var _this7 = this;

    var h = !v ? null : function (ev) {
      _this7.$attributes.touchstart(_objectSpread({}, e.$dataset, {
        x: ev.pageX || ev.changedTouches[0].screenX,
        y: ev.pageY || ev.changedTouches[0].screenY
      }), ev);

      return false;
    };
    this.setAttribute('touchstart:touchstart', h);
    this.setAttribute('touchstart:mousedown', h);
  },
  touch: function touch(e, v) {
    var _this8 = this;

    var data = _objectSpread({}, e.$dataset);

    var hs = !v ? null : function (ev) {
      data.started = true;
      data.x = ev.pageX || ev.changedTouches[0].screenX;
      data.y = ev.pageY || ev.changedTouches[0].screenY;
      return false;
    };
    this.setAttribute('touch:touchstart', hs);
    this.setAttribute('touch:mousedown', hs);
    var h = !v ? function () {
      return null;
    } : function (_final) {
      return function (ev) {
        if (data.started) {
          data.started = !_final;
          data.xx = ev.pageX || ev.changedTouches[0].screenX;
          data.yy = ev.pageY || ev.changedTouches[0].screenY;
          data.dx = data.xx - data.x;
          data.dy = data.yy - data.y;
          data["final"] = _final;

          _this8.$attributes.touch(data, ev);
        }

        return false;
      };
    };
    this.setAttribute('touch:touchcancel', h(true));
    this.setAttribute('touch:touchend', h(true));
    this.setAttribute('touch:mouseup', h(true));
    this.setAttribute('touch:touchmove', h(false));
    this.setAttribute('touch:mousemove', h(false));
  },
  error: function error(e, v) {
    var _this9 = this;

    this.setAttribute('error:error', !v ? null : function (ev) {
      var fn = _this9.getAttribute('error');

      fn && fn(_objectSpread({}, e.$dataset), ev);
      return false;
    });
  },
  keypress: function keypress(e, v) {
    var _this10 = this;

    this.setAttribute('keypress:keyup', !v ? null : function (ev) {
      if (ev.keyCode !== 13 && ev.keyCode !== 27) {
        var fn = _this10.$attributes.keypress;
        fn && fn(_objectSpread({
          value: e.value
        }, e.$dataset), ev);
        setTimeout(function () {
          return e.focus();
        }, 0);
      }

      return false;
    });
  },
  enter: function enter(e, v) {
    var _this11 = this;

    this.setAttribute('enter:keyup', !v ? null : function (ev) {
      if (ev.keyCode === 13) {
        _this11.$attributes.enter(_objectSpread({
          value: e.value
        }, e.$dataset), ev);
      }

      if (ev.keyCode === 13 || ev.keyCode === 27) {
        e.blur();
      }

      return false;
    });
  },
  change: function change(e, v) {
    var _this12 = this;

    this.setAttribute('change:change', !v ? null : function (ev) {
      _this12.$attributes.change(_objectSpread({
        value: e.value
      }, e.$dataset), ev);

      return false;
    });
  },
  toggle: function toggle(e, v) {
    var _this13 = this;

    this.setAttribute('toggle:change', !v ? null : function (ev) {
      _this13.$attributes.toggle(_objectSpread({
        value: e.checked
      }, e.$dataset), ev);

      return false;
    });
  }
};
var DOM_VALUE_COMPARATORS = {
  value: function value(e, their) {
    return e.value === their;
  },
  _: function _(_2, their, mine) {
    return their === mine;
  }
};

var Element =
/*#__PURE__*/
function () {
  function Element() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var $ = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Element);

    this.elt = $.elt = $.tag === '#text' ? document.createTextNode('') : document.createElement($.tag);
    this.$attributes = {};
    this.$ = this.elt.$ = $;
    this.applyAttributes(attrs);
  }

  _createClass(Element, [{
    key: "done",
    value: function done() {
      var e = this.elt;
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

      this.elt = this.$attributes = null;
    }
  }, {
    key: "set",
    value: function set(delta) {
      this.delta = this.delta ? Object.assign(this.delta, delta) : delta;
      return this.$.nodes || delta && Object.keys(delta).length;
    }
  }, {
    key: "render",
    value: function render($) {
      var e = this.elt;
      var p = $.ctx;

      if ($.content) {
        e.cursor = null;

        Object(_render_js__WEBPACK_IMPORTED_MODULE_0__["render"])($, $.content);

        e.cursor = null;
      }

      if (this.delta) {
        this.applyAttributes(this.delta);
        this.delta = null;
      }

      var before = p.cursor ? p.cursor.nextSibling : p.firstChild;

      if (!before) {
        if (p !== e.parentElement) {
          p.appendChild(e);
        }
      } else if (e !== before) {
        p.insertBefore(e, before);
      }

      p.cursor = e;
    }
  }, {
    key: "applyAttributes",
    value: function applyAttributes(theirs) {
      var e = this.elt;
      var mines = this.$attributes;

      for (var key in theirs) {
        if (Object.prototype.hasOwnProperty.call(theirs, key) && !(DOM_VALUE_COMPARATORS[key] || DOM_VALUE_COMPARATORS._)(e, theirs[key], mines[key])) {
          var value = theirs[key];
          var setter = DOM_SETTERS[key]; // console.log('setAttribute' + this.$.tag, key, value)

          if (setter) {
            setter.call(this, e, value);
          } else {
            this.setAttribute(key, value);
          }
        }
      }

      this.$attributes = theirs;
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(key, def) {
      return this.$attributes && this.$attributes[key] || def;
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      var _this14 = this;

      if (value != null) {
        if (typeof value === 'function') {
          var fnValue = function fnValue() {
            if (!_this14.isDone) {
              value.apply(void 0, arguments);
            }
          };

          if (!this.listeners) {
            this.listeners = new Map();
          }

          if (!this.listeners.has(key)) {
            var _key$split = key.split(':'),
                _key$split2 = _slicedToArray(_key$split, 2),
                akey = _key$split2[0],
                _key$split2$ = _key$split2[1],
                ekey = _key$split2$ === void 0 ? akey : _key$split2$;

            this.elt.addEventListener(ekey, fnValue, false);
            this.listeners.set(key, fnValue);
          }
        } else {
          this.elt.setAttribute(key, value);
        }
      } else {
        if (this.listeners && this.listeners.has(key)) {
          var _key$split3 = key.split(':'),
              _key$split4 = _slicedToArray(_key$split3, 2),
              _akey = _key$split4[0],
              _key$split4$ = _key$split4[1],
              _ekey = _key$split4$ === void 0 ? _akey : _key$split4$;

          this.elt.removeEventListener(_ekey, this.listeners.get(key));
          this.listeners["delete"](key);
        } else {
          this.elt.removeAttribute(key);
        }
      }
    }
  }]);

  return Element;
}();

var WebClientApp = function WebClientApp(props, $) {
  _classCallCheck(this, WebClientApp);

  Object.assign(this, props);
  $.elt = $.ctx = props.rootElement || document.body;
};

WebClientApp.Element = Element;
function launch() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      types = _ref.types,
      template = _ref.template,
      _ref$App = _ref.App,
      App = _ref$App === void 0 ? WebClientApp : _ref$App,
      props = _objectWithoutProperties(_ref, ["types", "template", "App"]);

  App.template = template || App.template || "<".concat(types[0].name || types[0].NAME, "/>");
  Object(_register_js__WEBPACK_IMPORTED_MODULE_2__["registerTypes"])([App, App.Element].concat(types));
  var a = new _component_js__WEBPACK_IMPORTED_MODULE_1__["Component"](App, {
    props: props
  });

  var fn = function fn() {
    Object(_render_js__WEBPACK_IMPORTED_MODULE_0__["render"])(a);

    a.init();
  };

  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
    window.requestAnimationFrame(fn);
  } else {
    fn();
  }

  return a.impl;
}

if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
  window.launch = launch;
}

/***/ }),

/***/ "./lib/fragment.js":
/*!*************************!*\
  !*** ./lib/fragment.js ***!
  \*************************/
/*! exports provided: Fragment, FragmentSlot, FragmentFor, FragmentIf, FragmentTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return Fragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FragmentSlot", function() { return FragmentSlot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FragmentFor", function() { return FragmentFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FragmentIf", function() { return FragmentIf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FragmentTag", function() { return FragmentTag; });
/* harmony import */ var _resolve_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve.js */ "./lib/resolve.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Fragment =
/*#__PURE__*/
function () {
  function Fragment() {
    _classCallCheck(this, Fragment);
  }

  _createClass(Fragment, [{
    key: "resolveTemplate",
    value: function resolveTemplate($) {
      return $.content;
    }
  }]);

  return Fragment;
}();
var FragmentSlot =
/*#__PURE__*/
function () {
  function FragmentSlot() {
    _classCallCheck(this, FragmentSlot);
  }

  _createClass(FragmentSlot, [{
    key: "resolveTemplate",
    value: function resolveTemplate($) {
      var ocontent = $.owner.content;
      if (!ocontent) return null;
      var otag = $.owner.tag;
      var acc = new Map();
      ocontent.forEach(function (v) {
        if ($.id) {
          if (v.tag === otag + ':' + $.id && v.content) {
            v.content.forEach(function (vv) {
              return acc.set(vv.uid, vv);
            });
          }
        } else if (v.tag.slice(0, otag.length + 1) !== otag + ':') {
          acc.set(v.uid, v);
        }
      });
      return acc;
    }
  }]);

  return FragmentSlot;
}();
var FragmentFor =
/*#__PURE__*/
function () {
  function FragmentFor() {
    _classCallCheck(this, FragmentFor);
  }

  _createClass(FragmentFor, [{
    key: "resolveTemplate",
    value: function resolveTemplate($) {
      var acc = new Map();
      var data = $.impl.$data;
      var _$$$spec = $.$spec,
          itemId = _$$$spec.itemId,
          itemNode = _$$$spec.itemNode,
          emptyNode = _$$$spec.emptyNode,
          loadingNode = _$$$spec.loadingNode;
      var tag = itemNode.tag,
          updates = itemNode.updates,
          _itemNode$initials = itemNode.initials,
          initials = _itemNode$initials === void 0 ? {} : _itemNode$initials,
          nodes = itemNode.nodes,
          uid = itemNode.uid;

      if (data && data.length) {
        if (!data.forEach) {
          throw new Error('wrong ui:for data', data);
        }

        data.forEach(function (d, index) {
          var _Object$assign;

          var id = "".concat(uid, "-$").concat(d.id || index);
          var $ownerImpl = Object.assign(Object.create($.owner.impl), (_Object$assign = {}, _defineProperty(_Object$assign, itemId, d), _defineProperty(_Object$assign, itemId + 'Index', index), _Object$assign));

          var up = function up(Δ) {
            return $.owner.up(Δ);
          };

          var $owner = Object.assign(Object.create($.owner), {
            impl: $ownerImpl,
            $propFnMap: {},
            up: up
          });

          Object(_resolve_js__WEBPACK_IMPORTED_MODULE_0__["resolveTemplate"])($owner, {
            tag: tag,
            initials: initials,
            updates: updates,
            nodes: nodes,
            uid: id
          }, acc);
        });
      } else if (!data) {
        if (loadingNode) {
          Object(_resolve_js__WEBPACK_IMPORTED_MODULE_0__["resolveTemplate"])($.owner, loadingNode, acc);
        }
      } else if (!data.length) {
        if (emptyNode) {
          Object(_resolve_js__WEBPACK_IMPORTED_MODULE_0__["resolveTemplate"])($.owner, emptyNode, acc);
        }
      }

      return acc;
    }
  }]);

  return FragmentFor;
}();
var FragmentIf =
/*#__PURE__*/
function () {
  function FragmentIf() {
    _classCallCheck(this, FragmentIf);
  }

  _createClass(FragmentIf, [{
    key: "resolveTemplate",
    value: function resolveTemplate($) {
      var $data = $.impl.$data;
      var node = $data ? $.$spec.then : $.$spec["else"];
      return Object(_resolve_js__WEBPACK_IMPORTED_MODULE_0__["resolveTemplate"])($.owner, node);
    }
  }]);

  return FragmentIf;
}();
var FragmentTag =
/*#__PURE__*/
function () {
  function FragmentTag() {
    _classCallCheck(this, FragmentTag);
  }

  _createClass(FragmentTag, [{
    key: "resolveTemplate",
    value: function resolveTemplate($) {
      var acc = new Map();
      var tag = $.impl.$data;

      if (tag) {
        Object(_resolve_js__WEBPACK_IMPORTED_MODULE_0__["resolveTemplate"])($.owner, _objectSpread({}, $.$spec, {
          tag: tag,
          uid: tag + ':' + $.uid
        }), acc);
      }

      return acc;
    }
  }]);

  return FragmentTag;
}();

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: launch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./lib/dom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "launch", function() { return _dom_js__WEBPACK_IMPORTED_MODULE_0__["launch"]; });



/***/ }),

/***/ "./lib/register.js":
/*!*************************!*\
  !*** ./lib/register.js ***!
  \*************************/
/*! exports provided: registerTypes, getByTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerTypes", function() { return registerTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getByTag", function() { return getByTag; });
/* harmony import */ var _xml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xml.js */ "./lib/xml.js");
/* harmony import */ var _compile_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compile.js */ "./lib/compile.js");
/* harmony import */ var _fragment_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fragment.js */ "./lib/fragment.js");



var COUNTER = 1;
var ANY;

var nextId = function nextId() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return p + COUNTER++;
};

var fnName = function fnName(ctor) {
  return (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || nextId('$C');
};

var REGISTRY = new Map([['ui:fragment', _fragment_js__WEBPACK_IMPORTED_MODULE_2__["Fragment"]], ['ui:for', _fragment_js__WEBPACK_IMPORTED_MODULE_2__["FragmentFor"]], ['ui:if', _fragment_js__WEBPACK_IMPORTED_MODULE_2__["FragmentIf"]], ['ui:tag', _fragment_js__WEBPACK_IMPORTED_MODULE_2__["FragmentTag"]], ['ui:slot', _fragment_js__WEBPACK_IMPORTED_MODULE_2__["FragmentSlot"]]]);

var reg = function reg(ctr) {
  var ctor = typeof ctr === 'function' ? ctr : Object.assign(function () {}, ctr);
  var name = ctor.NAME || ctor.name || fnName(ctor);
  var text = ctor.TEMPLATE || ctor.template || ctor.prototype.TEMPLATE;

  ctor.$TEMPLATE = function () {
    try {
      var T = text ? Object(_compile_js__WEBPACK_IMPORTED_MODULE_1__["compileNode"])(Object(_xml_js__WEBPACK_IMPORTED_MODULE_0__["parseXML"])(typeof text === 'function' ? text() : text, name)) : [];

      ctor.$TEMPLATE = function () {
        return T;
      };

      return T;
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.error('compile ' + name, ex);
    }

    return [];
  };

  if (name === 'Element') {
    ANY = ctor;
  } else {
    REGISTRY.set(name, ctor);
  }
};

var registerTypes = function registerTypes(types) {
  return types.forEach(reg);
};
var getByTag = function getByTag(tag) {
  return REGISTRY.get(tag) || ANY;
};

/***/ }),

/***/ "./lib/render.js":
/*!***********************!*\
  !*** ./lib/render.js ***!
  \***********************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _register_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register.js */ "./lib/register.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component.js */ "./lib/component.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var render = function render(c) {
  var $content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : c.resolveTemplate();

  if (!$content || !$content.size) {
    if (c.children) {
      c.children.forEach(function (cc) {
        return cc.done();
      });
    }

    return;
  }

  if (c.children) {
    c.children.forEach(function (cc) {
      return !$content.has(cc.uid) ? cc.done() : 0;
    });
  }

  var ch = c.children || (c.children = new Map());
  $content.forEach(function (_ref, uid) {
    var tag = _ref.tag,
        content = _ref.content,
        owner = _ref.owner,
        props = _ref.props,
        inits = _ref.inits,
        initials = _ref.initials,
        ref = _ref.ref,
        $spec = _ref.$spec,
        id = _ref.id;
    var cc = ch.get(uid);

    if (!cc) {
      if (initials) {
        props = props && props.data && initials.data ? _objectSpread({}, props, {}, initials, {
          data: _objectSpread({}, initials.data, {}, props.data)
        }) : _objectSpread({}, props, {}, initials);
      }

      cc = new _component_js__WEBPACK_IMPORTED_MODULE_1__["Component"](Object(_register_js__WEBPACK_IMPORTED_MODULE_0__["getByTag"])(tag), {
        props: props,
        tag: tag,
        ref: ref,
        $spec: $spec,
        id: id,
        uid: uid,
        owner: owner,
        inits: inits,
        parent: c
      });
      ch.set(uid, cc);
    }

    cc.owner = owner;
    cc.content = content;
    cc.prevElt = c.elt.cursor;
    cc.up(props);
  });

  if (c.children) {
    c.children.forEach(function (cc) {
      return !cc.isInited ? cc.init() : 0;
    });
  }
};

/***/ }),

/***/ "./lib/resolve.js":
/*!************************!*\
  !*** ./lib/resolve.js ***!
  \************************/
/*! exports provided: resolveTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveTemplate", function() { return resolveTemplate; });
function resolveTemplate(owner, tmpl) {
  var acc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Map();

  if (!tmpl) {
    return acc;
  }

  if (tmpl.reduce) {
    return tmpl.length ? tmpl.reduce(function (m, t) {
      return resolveTemplate(owner, t, m);
    }, acc) : acc;
  }

  var tag = tmpl.tag,
      updates = tmpl.updates,
      initials = tmpl.initials,
      inits = tmpl.inits,
      nodes = tmpl.nodes,
      uid = tmpl.uid,
      id = tmpl.id,
      ref = tmpl.ref,
      $spec = tmpl.$spec;
  return acc.set(uid, {
    tag: tag,
    id: id,
    uid: uid,
    ref: ref,
    owner: owner,
    initials: initials,
    inits: inits,
    $spec: $spec,
    props: updates && updates.length ? updates.reduce(function (acc, fn) {
      fn(owner, acc);
      return acc;
    }, {}) : null,
    content: nodes && nodes.length ? nodes.reduce(function (m, t) {
      return resolveTemplate(owner, t, m);
    }, new Map()) : null
  });
}

/***/ }),

/***/ "./lib/xml.js":
/*!********************!*\
  !*** ./lib/xml.js ***!
  \********************/
/*! exports provided: stringify, parseXML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return stringify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseXML", function() { return parseXML; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// ==========
// XML Parse for templates. XML -> NodeTree
// ----------
var RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g;
var RE_XML_COMMENT = /<!--((?!-->)[\s\S])*-->/g;
var RE_ATTRS = /([a-z][a-zA-Z0-9-:]+)(="[^"]*"|={[^}]*})?/g;
var RE_ESCAPE_XML_ENTITY = /["'&<>]/g;
var RE_XML_TAG = /(<)(\/?)([a-zA-Z][a-zA-Z0-9-:]*)((?:\s+[a-z][a-zA-Z0-9-:]+(?:="[^"]*"|={[^}]*})?)*)\s*(\/?)>/g;
var SINGLE_TAGS = 'img input br col'.split(' ').reduce(function (r, e) {
  r[e] = 1;
  return r;
}, {});
var SUBST_XML_ENTITY = {
  amp: '&',
  gt: '>',
  lt: '<',
  quot: "\"",
  nbsp: ' '
};
var ESCAPE_XML_ENTITY = {
  34: '&quot;',
  38: '&amp;',
  39: '&#39;',
  60: '&lt;',
  62: '&gt;'
};
var RE_EMPTY = /^\s*$/;

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

var skipQoutes = function skipQoutes(s) {
  return s[0] === '"' && s[s.length - 1] === '"' ? s.slice(1, -1) : s;
};

var UID = 1;

var parseAttrs = function parseAttrs(s) {
  var r = new Map();

  if (!s) {
    return r;
  }

  for (var e = RE_ATTRS.exec(s); e; e = RE_ATTRS.exec(s)) {
    if (!e[2]) {
      r.set(e[1], "true");
    } else {
      r.set(e[1], decodeXmlEntities(skipQoutes(e[2].slice(1))));
    }
  }

  return r;
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

var Node =
/*#__PURE__*/
function () {
  function Node(tag) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();

    _classCallCheck(this, Node);

    this.uid = UID++;
    this.tag = tag || '';
    this.attrs = attrs;
    this.nodes = [];
  }

  _createClass(Node, [{
    key: "getChild",
    value: function getChild(index) {
      return this.nodes[index];
    }
  }, {
    key: "setText",
    value: function setText(text) {
      this.attrs.set('#text', decodeXmlEntities(text));
    }
  }, {
    key: "addChild",
    value: function addChild(tag, attrs) {
      var e = new Node(tag, attrs);
      this.nodes.push(e);
      return e;
    }
  }, {
    key: "toString",
    value: function toString() {
      return stringify(this);
    }
  }]);

  return Node;
}();

function stringify(_ref) {
  var tag = _ref.tag,
      attrs = _ref.attrs,
      _ref$nodes = _ref.nodes,
      nodes = _ref$nodes === void 0 ? [] : _ref$nodes;
  var tab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var sattrs = stringifyAttrs(attrs);
  var ssubs = nodes.map(function (c) {
    return stringify(c, "  ".concat(tab));
  }).join('\n');
  var text = attrs && attrs.get('#text');
  var stext = text ? "  ".concat(tab).concat(escapeXml(text)) : '';

  if (tag === '#text') {
    return stext.trim();
  }

  return "".concat(tab, "<").concat(tag).concat(sattrs) + (!ssubs && !stext ? '/>' : ">\n".concat(ssubs).concat(stext, "\n").concat(tab, "</").concat(tag, ">"));
}
var parseXML = function parseXML(_s, key) {
  var s = ('' + _s).trim().replace(RE_XML_COMMENT, '');

  var ctx = [new Node()];
  var lastIndex = 0; // head text omitted

  for (var e = RE_XML_TAG.exec(s); e; e = RE_XML_TAG.exec(s)) {
    // preceding text
    var text = e.index && s.slice(lastIndex, e.index);

    if (text && !text.match(RE_EMPTY)) {
      ctx[0].addChild('#text').setText(text);
    } // closing tag


    if (e[2]) {
      if (ctx[0].tag !== e[3]) {
        throw new Error((key || '') + ' XML Parse closing tag does not match at: ' + e.index + ' near ' + e.input.slice(Math.max(e.index - 150, 0), e.index) + '^^^^' + e.input.slice(e.index, Math.min(e.index + 150, e.input.length)));
      }

      ctx.shift();
    } else {
      var elt = ctx[0].addChild(e[3], parseAttrs(e[4])); // not single tag

      if (!(e[5] || e[3] in SINGLE_TAGS)) {
        ctx.unshift(elt);

        if (ctx.length === 1) {
          throw new Error('Parse error at: ' + e[0]);
        }
      }
    } // up past index


    lastIndex = RE_XML_TAG.lastIndex;
  } // tail text omitted


  return ctx[0].getChild(0);
};

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index.js */"./index.js");


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map