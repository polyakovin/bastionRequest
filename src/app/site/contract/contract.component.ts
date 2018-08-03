import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'na-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  @Input() order;

  constructor() { }

  ngOnInit() {
  }

}
