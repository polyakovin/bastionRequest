import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'na-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() order;

  constructor() {}

  onDoorTypeOneClick() {
    this.order.door.type = 1;
    this.order.door.zadv = "СТРАЖ";
  }
  onDoorTypeTwoClick() {
    this.order.door.type = 2;
    this.order.door.zadv = "СТРАЖ + Торцевые";
  }

  ngOnInit() {
     var component = this;

    $(".datepicker").datepicker({
      // русификация
      closeText: "Закрыть",
      prevText: "&#x3C;Пред",
      nextText: "След&#x3E;",
      currentText: "Сегодня",
      monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь", "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
      monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн", "Июл","Авг","Сен","Окт","Ноя","Дек" ],
      dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
      dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
      dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
      weekHeader: "Нед",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: "",

      // дополнительные настройки
      showOtherMonths: true,
      selectOtherMonths: true,
      autoSize: true,
      defaultDate: 0, // сегодня

      //чтобы был выше всех
      beforeShow: function() {
        setTimeout(function() {
          $('.ui-datepicker').css('z-index', 1200);
        }, 0);
      },

      // связка с ngModel
      onSelect: function(dateText) {
        if ($(this).hasClass("order")) {
          component.order.orderDate = dateText;
        }
        if ($(this).hasClass("install")) {
          component.order.installDate = dateText;
        }
      }
    });
  }

  updateTitle() {
    $(document).prop('title', "Заказ № " + this.order.preId + "–" + this.order.id);
  }
}