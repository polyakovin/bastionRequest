module.exports =
  # Проверка, существует ли переменная
  isset: (variable) ->
    typeof variable != "undefined" && variable != null

  # 1234567 -> 1 234 567
  delim_num: (num) ->
    cost = ""
    num = num + ""
    for n, i in num
      if (i + 1) % 3 is 0 and i isnt (num.length - 1)
        cost = num[num.length - 1 - i] + cost
        cost = "&nbsp" + cost
      else
        cost = num[num.length - 1 - i] + cost

    cost

  # 9101234567 -> +7 (910) 123-45-67
  pretty_tel: (num) ->
    num.replace /^(\d{3})(\d{3})(\d{2})(\d{2})$/ig, '+7&nbsp($1)&nbsp$2&#8209;$3&#8209;$4'
