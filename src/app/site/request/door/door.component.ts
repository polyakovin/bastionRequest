import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'na-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.scss']
})
export class DoorComponent implements OnInit {
  @Input() door;

  constructor() { }

  ngOnInit() {
  }

}
