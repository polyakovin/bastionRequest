window.$ = window.jQuery = require 'jquery'
require 'bootstrap-sass'
# require 'angular'

bastion = require './modules/bastion.js'
require './jquery-ui.min.js'

$(document).ready ->
  # order = {}
  order = bastion.default_order

  # Добавляем календарик к полям с датой
  $.datepicker.setDefaults $.datepicker.regional['ru']
  $('.datepicker').datepicker
    showOtherMonths: true
    selectOtherMonths: true

  # Значения полей формы по умолчанию
  $("#i_number").val(bastion.default_order.number)

  # Задаём стандартные значения
  bastion.set_defaults()
  bastion.set_values(order, bastion.default_order)
  bastion.insert_data(order)
  $(document).prop('title', "Заказ № " + order.prenumber + "–" + order.number)

  # Меняем значения при изменении формы
  $("form").on 'keyup change', ->
    bastion.set_values(order, bastion.default_order)
    bastion.insert_data(order)
    $(document).prop('title', "Заказ № " + order.prenumber + "–" + order.number)

  # Печать
  $("#print_button").click ->
    window.print()

  left_bar_trigger = $(".left_bar_trigger")
  left_bar = $(".left_bar")
  left_bar_trigger.click ->
    if left_bar.css("left") is "0px"
      left_bar.animate
        left: -315,
        200
    else
      left_bar.animate
        left: 0,
        200