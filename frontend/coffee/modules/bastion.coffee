window.$ = window.jQuery = require 'jquery'
rusDate = require './rusDate.js'
h = require './helpers.js'
to_literal = require './to_literal.js'

# Задаём дату составления договора и дату установки
today = rusDate("today")
inAWeek = rusDate("after", 7, "days")
tday = new Date()

default_order =
  "prenumber": "Б",
  "number": "/" + (tday.getMonth() + 1) + "/" + tday.getFullYear() + "",
  "family": "Иванов",
  "name": "Иван",
  "father_name": "Иванович",
  "address": "Смоленский район",
  "tel_1": "9000000000",
  "tel_2": "",
  "date_of_order": today,
  "date_of_install": inAWeek,
  "type": 1,
  "side": 0,
  "width": 96,
  "height": 205,
  "delivery": 2,
  "cost": 0,
  "prepayment": 0,
  "sex": 0,
  "construction": "",
  "opening_type": 0,
  "otd_out": "",
  "otd_in": "",
  "nalich": "",
  "glaz": "",
  "zadv": "",
  "lock_top": "",
  "lock_bottom": "",
  "furnitura": "",
  "lich": "",
  "bronenakl": "",
  "warmer": "",
  "notes": ""

module.exports =
  default_order: default_order

  set_defaults: ->
    $("#i_date_of_order").val today
    $("#i_date_of_install").val inAWeek

  # Расставляем параметры в нужные места
  insert_data: (order) ->
    fio = order.family + " " + order.name + " " + order.father_name
    fio_s = order.family + " " + order.name[0] + "." + order.father_name[0] + "."

    if +order.opening_type is 0
      opening_type = "внутренняя"
      $(".data-opening_type_text").html("квартиры")
    else
      opening_type = "наружная"
      $(".data-opening_type_text").html("лестничной<br>площадки")

    full_number = order.prenumber + "–" + order.number

    # Окончания
    if +order.sex is 0
      $(".data-sex").html("ий")
      $(".data-sex-2").html("ый")
      $(".data-sex-3").html("")
      $(".data-sex-4").html("ен")
    else
      $(".data-sex").html("ая")
      $(".data-sex-2").html("ая")
      $(".data-sex-3").html("а")
      $(".data-sex-4").html("на")

    # Скидка 5%
    # maincost = Math.floor(order.cost * 0.95 / 100) * 100
    maincost = +order.cost
    addcost = 0
    # Доставка и установка
    switch +order.delivery
      when 0
        delivery = "самовывоз"
        $(".if_install").hide()
        $(".if_deliver").hide()
        $(".if_selfdeliver").show()
        # addcost = 0
      when 1
        delivery = "только доставка"
        $(".if_install").hide()
        $(".if_deliver").show()
        $(".if_selfdeliver").hide()
        # addcost = 1000
      when 2
        delivery = "доставка и установка"
        $(".if_install").show()
        $(".if_deliver").show()
        $(".if_selfdeliver").hide()
        # addcost = 1500

    # Конечная стоимость
    cost = h.delim_num(maincost + addcost)
    rest_cost = h.delim_num(maincost + addcost - (+order.prepayment))

    $(".data-cost").html(cost)
    $(".data-cost-literal").html(to_literal(maincost + addcost))
    $(".data-cost-rest").html(rest_cost)

    # Основные параметры
    $(".data-number").html(full_number)
    $(".data-number-short").html(order.prenumber + "–" + order.number.slice(0, -8))
    $(".data-fio").html(fio)
    $(".data-fio-short").html(fio_s)
    $(".data-address").html(order.address)
    if order.tel_2 isnt ""
      $(".data-tels_delim").html("; ")
    else
      $(".data-tels_delim").html("")
    $(".data-tel_1").html(h.pretty_tel(order.tel_1))
    $(".data-tel_2").html(h.pretty_tel(order.tel_2))
    $(".data-date_of_order").html(order.date_of_order)
    $(".data-date_of_install").html(order.date_of_install)
    $(".data-width").html(order.width)
    $(".data-height").html(order.height)
    $(".data-delivery").html(delivery)
    $(".data-construction").html(order.construction)
    $(".data-opening_type").html(opening_type)
    $(".data-otd_out").html(order.otd_out)
    $(".data-otd_in").html(order.otd_in)
    $(".data-nalich").html(order.nalich)
    $(".data-glaz").html(order.glaz)
    $(".data-lock_top").html(order.lock_top)
    $(".data-lock_bottom").html(order.lock_bottom)
    $(".data-furnitura").html(order.furnitura)
    $(".data-lich").html(order.lich)
    $(".data-bronenakl").html(order.bronenakl)
    $(".data-warmer").html(order.warmer)
    $(".data-notes").html(order.notes)
    $(".data-prepayment").html(h.delim_num order.prepayment)


    i_zadv = $("#i_zadv")
    zadv = $(".data-zadv")
    zadv.html(order.zadv)

    # Сторона открывания
    hinge = $(".hinge")
    hinge_2 = $(".hinge-2")
    side = $(".data-side")
    stvorka = $(".stvorka")
    if +order.side is 0
      hinge.addClass("hinge-left")
      hinge.removeClass("hinge-right")

      hinge_2.addClass("hinge-right")
      hinge_2.removeClass("hinge-left")

      stvorka.addClass("stvorka-left")

      side.html("левая")

    else
      hinge.addClass("hinge-right")
      hinge.removeClass("hinge-left")

      hinge_2.addClass("hinge-left")
      hinge_2.removeClass("hinge-right")

      stvorka.removeClass("stvorka-left")

      side.html("правая")


    if +order.type is 1
      type = "одностворчатая"
      stvorka.hide()
      hinge_2.hide()

    else
      type = "двухстворчатая"
      stvorka.show()
      hinge_2.show()

    $(".data-type").html(type)


    $("input[name='type']").on 'keyup change', ->
      order.type = $("input[name='type']:radio:checked").val()

      if +order.type is 1
        i_zadv.val("СТРАЖ")
        zadv.html("СТРАЖ")
      else
        i_zadv.val("СТРАЖ + Торцевые")
        zadv.html("СТРАЖ + Торцевые")


    if order.construction.toLowerCase() is "дмп"
      $(".if_dmp").html(" противопожарная глухая")
      # if stvorkies =
      $(".data-construction").html("ДМП–Г–" + order.type + "/ЕI-60")
    else
      $(".if_dmp").html("")
      $(".data-construction").html(order.construction)


  # Присваиваем заданные значения или по умолчанию
  set_values: (order, default_order) ->
    order.prenumber = $("#i_prenumber").val() or default_order.prenumber
    order.number = $("#i_number").val() or default_order.number
    order.family = $("#i_family").val() or default_order.family
    order.name = $("#i_name").val() or default_order.name
    order.father_name = $("#i_father_name").val() or default_order.father_name
    order.address = $("#i_address").val() or default_order.address
    order.tel_1 = $("#i_tel_1").val() or default_order.tel_1
    order.tel_2 = $("#i_tel_2").val() or default_order.tel_2
    order.date_of_order = $("#i_date_of_order").val() or default_order.date_of_order
    order.date_of_install = $("#i_date_of_install").val() or default_order.date_of_install
    order.type = $("input[name='type']:radio:checked").val()
    order.side = $("input[name='open_side']:radio:checked").val()
    order.width = $("#i_width").val() or default_order.width
    order.height = $("#i_height").val() or default_order.height
    order.delivery = $("input[name='delivery']:radio:checked").val()
    order.cost = $("#i_cost").val() or default_order.cost
    order.prepayment = $("#i_prepayment").val() or default_order.prepayment
    if order.prepayment > 0
      $(".if_prepayed").show()
    else
      $(".if_prepayed").hide()
    order.sex = $("input[name='sex']:radio:checked").val()
    order.construction = $("#i_construction").val() or default_order.construction
    order.opening_type = $("input[name='opening_type']:radio:checked").val()
    order.otd_out = $("#i_otd_out").val() or default_order.otd_out
    order.otd_in = $("#i_otd_in").val() or default_order.otd_in
    order.nalich = $("#i_nalich").val() or default_order.nalich
    order.glaz = $("#i_glaz").val() or default_order.glaz
    order.zadv = $("#i_zadv").val() or default_order.zadv
    order.lock_top = $("#i_lock_top").val() or default_order.lock_top
    order.lock_bottom = $("#i_lock_bottom").val() or default_order.lock_bottom
    order.furnitura = $("#i_furnitura").val() or default_order.furnitura
    order.lich = $("#i_lich").val() or default_order.lich
    order.bronenakl = $("#i_bronenakl").val() or default_order.bronenakl
    order.warmer = $("#i_warmer").val() or default_order.warmer
    order.notes = $("#i_notes").val() or default_order.notes