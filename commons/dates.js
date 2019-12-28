const pad = (x, s = String(x)) => s.length === 1 ? '0' + s : s;

const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

export const dateLocales = {
    ru: {
        monthNames: ['', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['', 'Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNamesShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
        dayNames
    }
};

export const daysInMonth = Date.daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

export const monthName = Date.monthName = (m, mode = '') => (dateLocales.ru[`monthNames${mode}`] || dateLocales.ru.monthNames)[m];

export const dateFractions = Date.fractions = (x = new Date()) => [x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds(), x.getMilliseconds()];

/* eslint-disable complexity, no-param-reassign */

Date.parseISO8601String = function (x) {
    if (typeof x !== 'string') {
        throw new Error(`parseISO8601String: not a string: ${x}`);
    }
    if (x.length === 10) {
        x += 'T12:00';
    }
    const timebits = /^([0-9]{4})-([0-9]{2})-([0-9]{2})[ T]([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(Z?)(([+-])([0-9]{2})([0-9]{2}))?/;
    const m = timebits.exec(x);
    if (!m) {
        return null;
    }
    const tz = m[8]
        ? !m[9] ? 0 : (m[10] === '+' ? -1 : +1) * ((parseInt(m[11]) * 60) + parseInt(m[12]))
        : (new Date().getTimezoneOffset());
    // utcdate is milliseconds since the epoch
    const utcdate = Date.UTC(
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
Date.narrow = (x) => {
    const type = typeof x;
    if (x == null) { return null; }
    if (type === 'number') { return new Date(x); }
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

// return date in format dd.mm.yyyy
Date.format = (x, format = 'dd.mm.yyyy') => {
    if (!x) {
        return '';
    }
    const date = Date.narrow(x);
    if (!date) {
        return '';
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return format
        .replace(/[_]/g, '\n')
        .replace('hh', pad(date.getHours()))
        .replace('ii', pad(date.getMinutes()))
        .replace('t', pad(date.getHours()) + ':' + pad(date.getMinutes()))
        .replace('dd', pad(day))
        .replace('dow', '' + dayNames[date.getDay()])
        .replace('d', '' + day)
        .replace('mmmm', monthName(month, ''))
        .replace('mmm', monthName(month, 'Short'))
        .replace('mm', pad(month))
        .replace('yyyy', `${year}`);
};

Date.formatTime = (x) => {
    if (!x) { return ''; }
    const date = Date.narrow(x);
    const minutes = date.getMinutes();
    return `${date.getHours()}:${pad(minutes)}`;
};
Date.firstOfWeek = (d, x = Date.narrow(d)) => (new Date(x.getFullYear(), x.getMonth(), x.getDate() - x.getDay()));

export const formatTimezone = (tzOffset) => {
    const toNumber = Number(tzOffset);
    return toNumber ?
        toNumber >= 0 ?
            `+${pad(toNumber / 60)}:${pad(toNumber % 60)}` :
            `-${pad(-toNumber / 60)}:${pad(-toNumber % 60)}` :
        '';
};




