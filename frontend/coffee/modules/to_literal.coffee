# Функция переводит число в стоимость в рублях прописью
module.exports = (number) ->
  arr_numbers = new Array

  number_parser = (num, desc) ->
    string = ''
    num_hundred = ''

    if num.length == 3
      num_hundred = num.substr(0, 1)
      num = num.substr(1, 3)
      string = arr_numbers[3][num_hundred] + ' '
    if num < 20
      string += arr_numbers[1][parseFloat(num)] + ' '
    else
      first_num = num.substr(0, 1)
      second_num = num.substr(1, 2)
      string += arr_numbers[2][first_num] + ' ' + arr_numbers[1][second_num] + ' '

    switch desc
      when 0
        last_num = parseFloat(num.substr(-1))
        last_2_nums = parseFloat(num.substr(-2))
        if last_2_nums > 10 and last_2_nums < 21
          string += 'рублей'
        else if last_num == 1
          string += 'рубль'
        else if last_num > 1 and last_num < 5
          string += 'рубля'
        else
          string += 'рублей'
      when 1
        last_num = parseFloat(num.substr(-1))
        last_2_nums = parseFloat(num.substr(-2))
        if last_2_nums > 10 and last_2_nums < 21
          string += 'тысяч '
        else if last_num == 1
          string += 'тысяча '
        else if last_num > 1 and last_num < 5
          string += 'тысячи '
        else
          string += 'тысяч '
        string = string.replace('один ', 'одна ')
        string = string.replace('два ', 'две ')
      when 2
        last_num = parseFloat(num.substr(-1))
        last_2_nums = parseFloat(num.substr(-2))
        if last_2_nums > 10 and last_2_nums < 21
          string += 'миллионов '
        else if last_num == 1
          string += 'миллион '
        else if last_num > 1 and last_num < 5
          string += 'миллиона '
        else
          string += 'миллионов '
      when 3
        last_num = parseFloat(num.substr(-1))
        last_2_nums = parseFloat(num.substr(-2))
        if last_2_nums > 10 and last_2_nums < 21
          string += 'миллиардов '
        else if last_num == 1
          string += 'миллиард '
        else if last_num > 1 and last_num < 5
          string += 'миллиарда '
        else
          string += 'миллиардов '

    string = string.replace('  ', ' ')
    string

  decimals_parser = (num) ->
    first_num = num.substr(0, 1)
    second_num = parseFloat(num.substr(1, 2))
    string = ' ' + first_num + second_num
    if second_num == 1
      string += '&nbsp;копейка'
    else if second_num > 1 and second_num < 5
      string += '&nbsp;копейки'
    else
      string += '&nbsp;копеек'
    string

  arr_numbers[1] = new Array('', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать')
  arr_numbers[2] = new Array('', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто')
  arr_numbers[3] = new Array('', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот')

  if !number or number == 0
    return false

  if typeof number != 'number'
    number = number.replace(',', '.')
    number = parseFloat(number)
    if isNaN(number)
      return false

  number = number.toFixed(2)

  if number.indexOf('.') != -1
    number_arr = number.split('.')
    number = number_arr[0]
    number_decimals = number_arr[1]

  number_length = number.length
  string = ''
  num_parser = ''
  count = 0
  p = number_length - 1

  while p >= 0
    num_digit = number.substr(p, 1)
    num_parser = num_digit + num_parser
    if (num_parser.length == 3 or p == 0) and !isNaN(parseFloat(num_parser))
      string = number_parser(num_parser, count) + string
      num_parser = ''
      count++
    p--

  if number_decimals
    string += decimals_parser(number_decimals)
  string

# this.getField("Сумма_пр").value = number_to_string(event.value)+"."