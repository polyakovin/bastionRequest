import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'na-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() order;

  constructor() { }

  ngOnInit() {
  }

  modalPrint() {
    $('.order-modal').modal('hide');
    setTimeout(window.print, 300);
  }

  doNothing(event) {
    event.preventDefault();
  }
}
