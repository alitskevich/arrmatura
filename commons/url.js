/**
 * Parses string into URL object.
 *
 * @param {string} s string in format: `type:target/path?params#data`
 * @param {object} r optional target object
 * @returns URL object like `{type, target, path, params, data }`
 */
Object.urlParse = function (s, r = {}) {
  if (!s) {
    return { path: [], params: {}, target: '', ...r };
  }
  if (typeof s === 'object') {
    return { path: [], params: {}, target: '', ...r, ...s };
  }
  let p;
  // extract type:
  p = s.indexOf(':');
  if (p > -1) {
    r.type = s.slice(0, p);
    s = s.slice(p + 1);
  }
  // extract data:
  p = s.indexOf('#');
  if (p > -1) {
    r.data = decodeValue(s.slice(p + 1));
    s = s.slice(0, p);
  }
  // extract query params:
  p = s.indexOf('?');
  r.params = r.params || {};
  if (p > -1) {
    for (let param of s.slice(p + 1).split('&')) {
      let [key, value] = param.split('=');
      if (value) {
        r.params[key] = decodeValue(value);
      }
    }
    s = s.slice(0, p);
  }
  // target and path:
  let path = r.path = s.split('/').map(decodeURIComponent);
  while (path.length && !r.target) {
    r.target = path.shift();
  }
  return r;
}

/**
*  Represents an URL object as a string
*
* @param {object} r URL object like `{type, target, path, params, data }`
* @returns string in format `type:target/path?params#data`
*/
Object.urlStringify = function (r) {
  let result = '';
  if (!r) {
    return result;
  }
  if (typeof r === 'string') {
    return r;
  }
  if (r.target) {
    if (r.type) {
      result += `${r.type}://`;
    }
    result += r.target;
  }
  if (r.path) {
    result += `/${Array.isArray(r.path) ? r.path.map(encodeURIComponent).join('/') : r.path}`;
  }
  const params = r.params;
  if (params) {
    const keys = Object.keys(params).filter(key => (params[key] != null));
    if (keys.length) {
      result += `?${keys.map(key => (`${key}=${encodeValue(params[key])}`)).join('&')}`;
    }
  }
  if (r.data) {
    result += `#${encodeValue(r.data)}`;
  }
  return result;
}

const VALUE_MAP = {
  true: true,
  false: false,
  undefined
};

function decodeValue(val) {
  const value = decodeURIComponent(val);
  if ('{['.indexOf(value[0]) > -1) {
    return JSON.parse(value);
  }
  const num = +value;
  if (value.length <= 17 && !isNaN(num)) {
    return num;
  }
  return VALUE_MAP[value] || value;
}

function encodeValue(value) {
  return encodeURIComponent((typeof value === 'object') ? JSON.stringify(value) : `${value}`);
}
