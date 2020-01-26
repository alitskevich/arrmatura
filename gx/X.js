/**
 * @OnlyCurrentDoc
 */

/**
 * Function
 */

Function.NONE = function (x) { 
  return x;
}

/**
 * Object
 */

Object.toString = function (x){
  if (!x) { return ''; }
  if (typeof x === 'object'){
    return Object.keys(x).map(function(k){ 
      return x[k]===true ? k : k+'='+Object.toString(x[k]);
    }).join(';\n')
  }
  return (''+x)
}

Object.assign =  Object.assign || function(o, delta){
  Object.keys(delta).forEach(function(k){ 
    o[k] =  delta[k] 
  })
  return o
}

Object.parse = function (x){
  return !x ? {} : (''+x).split(';').reduce(function(r, s){var kv=s.trim().split('='); r[kv[0]]=Object.valueOf((kv.length===1)?'true':kv[1]); return r},{})
}

Object.valueOf = function (v){
  if (v==+v){
    v = +v;
  } else if (v==='true'){
    v = true
  } else if (v==='false'){
    v = false
  }
  return v;
}

/**
 * String
 */

// produces hash from array using `_keyFn` as key generator.
String.capitalize = function (s) {
  return !s ? '' : s.slice(0,1).toUpperCase()+s.slice(1);
}

// produces hash from array using `_keyFn` as key generator.
String.camelCase = function camelCase(s) {
  return !s ? '' : s.split('_').map(capitalize).join('');
}

String.extract = function (s, expr, subst) {
  var result = { source: s };
  if (s){
    result.rest = s.replace(expr, function(e, s) { result.token = s || e; return subst||'' });
  }
  return result          
}
String.pad = function(x) { var s = String(x); return s.length === 1 ? '0' + s : s };

/**
 * Array
 */

Array.prototype.map = Array.prototype.map || function(fn) {
  var entries = []; 
  for (var i = 0; i < this.length; i++) {
    var e = this[i];
    entries.push(fn(e,i,this))
  }
  return entries;
}

// produces hash from array using `_keyFn` as key generator.
Array.toObject = Array.toHash = function (data, _keyFn, _valueFn) {
  var keyFn = null;
  if (!_keyFn){
    keyFn = function(e) { return e.id; }; 
  } else if (typeof _keyFn === 'string'){
    
    keyFn = function(e) { return e[_keyFn]; }
  } else {
    
    keyFn = _keyFn;
  }
  var valueFn = null;
  if (!_valueFn){
    valueFn = function(e) { return e; }; 
  } else if (typeof _keyFn === 'string'){
    
    valueFn = function(e) { return e[_valueFn]; }
  } else {
    
    valueFn = _valueFn;
  }
 
 var result = {};
  for (var row = 0, len = data.length; row < len; row++) {    
    var e = data[row];
    var key = keyFn(e);
    result[key] = valueFn(e);
  }
  return result;
}

Array.groupBy = function (data, gKey, iKey) {
  
  if (!iKey){
    iKey = "id"; 
  }
  
  var groups = {}, result = [], undef;      
  for (var row = 0, len = data.length; row < len; row++) {
      
    var e = data[row];
    var g = e[gKey];
    if (!g){
      continue;
    }
    
    var group = groups[g];
    if (!group){
      group = groups[g] = {id: g, items:[]};
      result.push(group);
    }
    if (e[iKey]){
      e[gKey] = undef;
      group.items.push(e)
    }
  }
  return result;
}

/**
 * @sortBy given {#a}rray in {#dir}ection using {#getter} for criteria
 */
Array.sortBy = function (a, getter, dir) {
  
  getter = getter || 'id';
  
  if (!dir) {
    dir=1;
  }
  
  var rdir  = dir*-1;
  
  if (typeof(getter) === 'string') {
    var key = getter;
    getter = function(s) {
      return s && s[key]
    }
  }
  
  return a.sort( function(s1,s2,v1,v2){
    v1=getter(s1);
    v2=getter(s2);
    return v1>v2?dir:(v1<v2?rdir:0);
  })
}
/**
 * Date
 */
Date.parseISO8601String = function (x) {
    if (typeof x !== 'string') {
        throw new Error('parseISO8601String: not a string:'+x);
    }
    if (x.length === 10) {
        x += 'T12:00';
    }
    var timebits = /^([0-9]{4})-([0-9]{2})-([0-9]{2})[ T]([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(Z?)(([+-])([0-9]{2})([0-9]{2}))?/;
    var m = timebits.exec(x);
    if (!m) {
        return null;
    }
    var tz = m[8]
        ? !m[9] ? 0 : (m[10] === '+' ? -1 : +1) * ((parseInt(m[11]) * 60) + parseInt(m[12]))
        : (new Date().getTimezoneOffset());
    // utcdate is milliseconds since the epoch
    var utcdate = Date.UTC(
        parseInt(m[1]),
        parseInt(m[2]) - 1, // months are zero-offset (!)
        parseInt(m[3]),
        parseInt(m[4]), parseInt(m[5]), // hh:mm
        ((m[6] && parseInt(m[6])) || 0), // optional seconds
        ((m[7] && parseFloat(m[7]))) || 0
    );

    return new Date(utcdate + tz * 60000);
}
/**
 * Universal all-weather converter to Date.
 *
 * @param {*} x any value to be converted to date
 * @returns Date instance or null
 */
Date.narrow = function (x) {
    var type = typeof x;
    if (x == null) { return null; }
    if (type === 'number' || +x == x) { return new Date(+x); }
    if (type === 'object') {
        // Date already
        if (x.getTime) { return x; }
        // having a date re-presentation method
        if (x.toDate) { return x.toDate(); }
        // firestore timestamp for web
        if (x.seconds && x.nanoseconds != null) { return new Date((x.seconds * 1000) + x.nanoseconds); }
    }
    return Date.parseISO8601String(x);
};
var DATE_FORMATTERS = {
  hh: function(date) { return (String.pad(date.getHours()))},
  ii: function(date) { return (String.pad(date.getMinutes()))},
  hi: function(date) { return (String.pad(date.getHours()) + ':' + String.pad(date.getMinutes()))},
  dd: function(date) { return (String.pad(date.getDate()))},
  d: function(date) { return ('' + date.getDate())},
  mm: function(date) { return (String.pad(date.getMonth() + 1))},
  yyyy: function(date) { return (date.getFullYear())},
    ll: function(date) { return (date.getTime())}
};

// return date repesentation in given format dd.mm.yyyy
Date.format = function(x, format)  {
    if (!x) {
        return '';
    }
    var date = Date.narrow(x);
    return !date ? '' : (format || 'yyyy-mm-dd')
        .replace(/[_]/g, '\n')
        .replace(/[hidwmyl]+/g, function(key) {
            var fn = DATE_FORMATTERS[key];
            return fn ? fn(date) : key;
        });
};

/**
 * XML
 */

RegExp.XML_TAG = /<(\/?)([a-zA-Z][a-zA-Z0-9-:]*)((?:\s+[a-z][a-zA-Z0-9-:]+="[^"]*")*)\s*(\/?)>/g;

String.decodeXml = (function() {
  
  var RE_XML_ENTITY = /&#?[0-9a-z]{1,6};/g;
  
  var SUBST_XML_ENTITY = {
    'amp' : '&',
    'quot' : "'",
    'nbsp' : ' '
  }
  
  var FN_XML_ENTITY = function(s){
    s = s.substring(1, s.length-1);
    
    return s[0]==='#' ? String.fromCharCode(+s.substring(1)) : (SUBST_XML_ENTITY[s]||' ');
  };
  
  return function (s) {
      try{
       s = s.replace(RE_XML_ENTITY, FN_XML_ENTITY);
      } catch(e){
      }
      return s;
    };
  
})();
