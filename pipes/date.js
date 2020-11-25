
const R = {
  ru: {
    monthNames: ['', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['', 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  },
  en: {
    monthNames: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  }
}
const DATE_FORMATTERS = {
  hh: (date) => (String.pad(date.getHours())),
  ii: (date) => (String.pad(date.getMinutes())),
  hi: (date) => (String.pad(date.getHours()) + ':' + String.pad(date.getMinutes())),
  dd: (date) => (String.pad(date.getDate())),
  w: (date) => ('' + Date.l18n(`dayNames.${date.getDay()}`)),
  ww: (date) => ('' + Date.l18n(`dayNamesShort.${date.getDay()}`)),
  d: (date) => ('' + date.getDate()),
  mmmm: (date) => (Date.monthName(date.getMonth() + 1, '')),
  mmm: (date) => (Date.monthName(date.getMonth() + 1, 'Short')),
  mm: (date) => (String.pad(date.getMonth() + 1)),
  yyyy: (date) => (`${date.getFullYear()}`),
  ll: (date) => (`${date.getTime()}`),
  z: (date) => (`Z${Date.formatTimezone(date.getTimezoneOffset())}`)
}

export default {
  orNow: x => x ? Date.narrow(x) : (new Date()),

  l18n: (key) => Object.dig(R[Date.LOCALE || 'ru'], key),

  daysInMonth: (month, year) => new Date(year, month + 1, 0).getDate(),

  firstOfWeek: (d, x = Date.narrow(d)) => (new Date(x.getFullYear(), x.getMonth(), x.getDate() - x.getDay())),

  monthName: (m, mode = '') => Date.l18n(`monthNames${mode}.${m}`),

  fractions: (x = new Date()) => [x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds(), x.getMilliseconds()],

  parseISO8601 (x) {
    Function.assert(typeof x === 'string', `Date.parseISO8601: not a string: ${x}`)

    if (x.length === 10) {
      x += 'T12:00'
    }
    const timebits = /^([0-9]{4})-([0-9]{2})-([0-9]{2})[ T]([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(Z?)(([+-])([0-9]{2})([0-9]{2}))?/
    const m = timebits.exec(x)
    if (!m) {
      return null
    }
    const tz = m[8]
      ? !m[9] ? 0 : (m[10] === '+' ? -1 : +1) * ((parseInt(m[11]) * 60) + parseInt(m[12]))
      : (new Date().getTimezoneOffset())
    // utcdate is milliseconds since the epoch
    const utcdate = Date.UTC(
      parseInt(m[1]),
      parseInt(m[2]) - 1, // months are zero-offset (!)
      parseInt(m[3]),
      parseInt(m[4]), parseInt(m[5]), // hh:mm
      ((m[6] && parseInt(m[6])) || 0), // optional seconds
      ((m[7] && parseFloat(m[7]))) || 0
    )

    return new Date(utcdate + tz * 60000)
  },
  /**
 * Universal all-weather converter to Date.
 *
 * @param {*} x any value to be converted to date
 * @returns Date instance or null
 */
  narrow (x) {
    const type = typeof x
    if (x == null) { return null }
    // eslint-disable-next-line eqeqeq
    if (type === 'number' || +x == x) { return new Date(+x) }
    if (type === 'object') {
    // Date already
      if (x.getTime) { return x }
      // having a date re-presentation method
      if (x.toDate) { return x.toDate() }
      // firestore timestamp for web
      if (x.seconds && x.nanoseconds != null) { return new Date((x.seconds * 1000) + x.nanoseconds) }
    }
    return Date.parseISO8601(x)
  },
  formatTimezone (tzOffset) {
    const toNumber = Number(tzOffset)
    return toNumber
      ? toNumber >= 0
        ? `+${String.pad(toNumber / 60)}:${String.pad(toNumber % 60)}`
        : `-${String.pad(-toNumber / 60)}:${String.pad(-toNumber % 60)}`
      : ''
  },

  format (x, format = 'yyyy-mm-dd') {
    if (!x) {
      return ''
    }
    const date = Date.narrow(x)
    return !date ? '' : format
      .replace(/[_]/g, '\n')
      .replace(/[hidwmylz]+/g, (key) => {
        const fn = DATE_FORMATTERS[key]
        return fn ? fn(date) : key
      })
  },

  dateKey: d => { const ms = Date.narrow(d).getTime(); return Date.format(ms - ms % (24 * 3600000) + 12 * 3600000, 'yyyy-mm-dd') }
}
