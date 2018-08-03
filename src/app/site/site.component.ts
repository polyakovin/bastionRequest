import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'ng-app',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  today = new Date();
  todayDay = this.today.getDate();
  todayMonth = this.today.getMonth() + 1;
  ty = this.today.getFullYear();

  nextWeek = new Date(this.today.getTime() + 7 * 24 * 60 * 60 * 1000);
  nextWeekDay = this.nextWeek.getDate();
  nextWeekMonth = this.nextWeek.getMonth() + 1;
  ny = this.nextWeek.getFullYear();

  td = this.todayDay < 10 ? "0" + this.todayDay : this.todayDay;
  tm = this.todayMonth < 10 ? "0" + this.todayMonth : this.todayMonth;
  nd = this.nextWeekDay < 10 ? "0" + this.nextWeekDay : this.nextWeekDay;
  nm = this.nextWeekMonth < 10 ? "0" + this.nextWeekMonth : this.nextWeekMonth;

  public order = {
    id: "/" + this.tm + "/" + this.ty, //
    preId: "Б",
    orderDate: this.td + "." + this.tm + "." + this.ty,
    installDate: this.nd + "." + this.nm + "." + this.ny,
    customer: {
      secondName: "", //
      firstName: "", //
      patrName: "", //
      sex: 0, // 0 — М; 1 — Ж
      address: "г. Смоленск, Смоленский р-н",
      phones: ["", ""] //
    },
    door: {
      construction: "ПЭ-2",
      otdOut: "Порошок медь-антик",
      otdIn: "ФЛ-128 (16 мм)",
      nalich: "Норма",
      glaz: "Обзорный",
      zadv: "СТРАЖ",
      lockTop: "Гардиан 10.01",
      lockBottom: "Гардиан 12.11",
      furnitura: "Либра хром",
      lich: "Ключ-вертушка",
      bronenakl: "нет",
      warmer: "KNAUF",
      width: 96,
      height: 205,
      type: 1, // 1 — одностворчатая; 2 - двухстворчатая
      openingType: 1, // 0 — внутрь, 1 — наружу
      openSide: 1 // 0 — левая; 1 - правая
    },
    delivery: 2,
    notes: "", //
    cost: 0,
    prepayment: 0
  };

  ngOnInit() {
    // Название страницы
    $(document).prop('title', "Заказ № " + this.order.preId + "–" + this.order.id)
  }
}