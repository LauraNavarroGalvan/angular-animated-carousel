import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'lib-clone',
  template: `<div (resized)="onResized($event)">
    <div [innerHTML]="content"></div>
  </div>`
})

export class ClonesComponent {
  @Input() content: any;
  @Output() resized = new EventEmitter();

  onResized($event) {
    this.resized.emit($event);
  }
}
