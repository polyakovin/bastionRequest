h = require './helpers.js'
date = new Date()

module.exports = (day, month, year) ->
  # Формат — ("after", 2, "months") или ("today")
  if day is "today" or day is "after" or day is "before" or !h.isset(day)
    if day is "after"
      if year is "days"
        date.setDate(date.getDate() + month)

      if year is "months"
        date.setDate(date.getMonth() + month)

      if year is "years"
        date.setDate(date.getFullYear() + month)

    if day is "before"
      if year is "days"
        date.setDate(date.getDate() - month)

      if year is "months"
        date.setDate(date.getMonth() - month)

      if year is "years"
        date.setDate(date.getFullYear() - month)

    # Определяем числа по заданным параметрам
    day = (if (date.getDate() + "").length is 1 then "0" else "") + date.getDate()

    m = date.getMonth() + 1
    month = (if (m + "").length is 1 then "0" else "") + m

    year = date.getFullYear()

  # Иначе — формат (22.12.1992)

  day + "." + month + "." + year