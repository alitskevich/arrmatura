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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ultis/arr.js":
/*!**********************!*\
  !*** ./ultis/arr.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'type';
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
    (slot.items || (slot.items = slot.subs)).push(entry);
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
 * Produces key/value index on given array.
 * 
 * @param {*} arr source array
 * @param {*} idKey id key
 * @param {*} valKey value key
 */


Array.toHash = Array.index = function (arr) {
  var idKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var valKey = arguments.length > 2 ? arguments[2] : undefined;
  var r = {};

  if (arr) {
    var isKeyFn = typeof idKey === 'string' ? function (e) {
      return e[idKey];
    } : idKey;
    arr.forEach(function (e) {
      r[isKeyFn(e)] = valKey ? e[valKey] : e;
    });
  }

  return r;
};

/***/ }),

/***/ "./ultis/date.js":
/*!***********************!*\
  !*** ./ultis/date.js ***!
  \***********************/
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
var dayNamesShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
var dateLocales = {
  ru: {
    monthNames: ['', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['', 'Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    dayNames: dayNames,
    dayNamesShort: dayNamesShort
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

  if (type === 'number' || +x == x) {
    return new Date(+x);
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
};

var DATE_FORMATTERS = {
  hh: function hh(date) {
    return pad(date.getHours());
  },
  ii: function ii(date) {
    return pad(date.getMinutes());
  },
  hi: function hi(date) {
    return pad(date.getHours()) + ':' + pad(date.getMinutes());
  },
  dd: function dd(date) {
    return pad(date.getDate());
  },
  w: function w(date) {
    return '' + dayNames[date.getDay()];
  },
  ww: function ww(date) {
    return '' + dayNamesShort[date.getDay()];
  },
  d: function d(date) {
    return '' + date.getDate();
  },
  mmmm: function mmmm(date) {
    return monthName(date.getMonth() + 1, '');
  },
  mmm: function mmm(date) {
    return monthName(date.getMonth() + 1, 'Short');
  },
  mm: function mm(date) {
    return pad(date.getMonth() + 1);
  },
  yyyy: function yyyy(date) {
    return "".concat(date.getFullYear());
  },
  ll: function ll(date) {
    return "".concat(date.getTime());
  }
}; // return date repesentation in given format dd.mm.yyyy

Date.format = function (x) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dd.mm.yyyy';

  if (!x) {
    return '';
  }

  var date = Date.narrow(x);
  return !date ? '' : format.replace(/[_]/g, '\n').replace(/[hidwmyl]+/g, function (key) {
    var fn = DATE_FORMATTERS[key];
    return fn ? fn(date) : key;
  });
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

/***/ "./ultis/fn.js":
/*!*********************!*\
  !*** ./ultis/fn.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

/***/ "./ultis/index.js":
/*!************************!*\
  !*** ./ultis/index.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./obj.js */ "./ultis/obj.js");
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_obj_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _str_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./str.js */ "./ultis/str.js");
/* harmony import */ var _str_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_str_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _arr_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arr.js */ "./ultis/arr.js");
/* harmony import */ var _arr_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_arr_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fn.js */ "./ultis/fn.js");
/* harmony import */ var _fn_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fn_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./url.js */ "./ultis/url.js");
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_url_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./date.js */ "./ultis/date.js");







/***/ }),

/***/ "./ultis/obj.js":
/*!**********************!*\
  !*** ./ultis/obj.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./ultis/str.js":
/*!**********************!*\
  !*** ./ultis/str.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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

String.wrap = function (x, template) {
  return !x ? '' : "".concat(template || '*').replace('*', x);
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

/***/ }),

/***/ "./ultis/url.js":
/*!**********************!*\
  !*** ./ultis/url.js ***!
  \**********************/
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

/***/ 2:
/*!******************************!*\
  !*** multi ./ultis/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./ultis/index.js */"./ultis/index.js");


/***/ })

/******/ });
});
//# sourceMappingURL=ultis.js.map