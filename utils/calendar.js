const {
  startOfMonth,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  startOfDay,
  addDays,
} = require('date-fns')

export function takeWeek(start = new Date()) {
  let date = startOfWeek(startOfDay(start))
  return function () {
    const week = [...Array(7)].map((_, i) => addDays(date, i))
    date = addDays(week[6], 1)
    return week
  }
}

export function takeMonth(start = new Date()) {
  let month = []
  let date = start
  function lastDayOfRange(range) {
    return range[range.length - 1][6]
  }
  return function () {
    const weekGen = takeWeek(startOfMonth(date))
    const endDate = startOfDay(endOfWeek(endOfMonth(date)))
    month.push(weekGen())

    while (lastDayOfRange(month) < endDate) {
      month.push(weekGen())
    }
    const range = month
    month = []
    date = addDays(lastDayOfRange(range), 1)
    return range
  }
}

export const toISOStringLocal = (date) => {
  var d = new Date(+date)
  var offset = d.getTimezoneOffset()
  var sign = offset < 0 ? '+' : '-'
  d.setUTCMinutes(d.getUTCMinutes() - d.getTimezoneOffset())
  offset =
    ('0' + ((offset / 60) | 0)).slice(-2) + ('0' + (offset % 60)).slice(-2)
  return d.toISOString().replace(/Z\s*/i, '') + 'Z'
}
