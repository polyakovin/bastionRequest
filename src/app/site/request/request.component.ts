import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'na-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  @Input() order;

  constructor() { }

  ngOnInit() {
  }

}
