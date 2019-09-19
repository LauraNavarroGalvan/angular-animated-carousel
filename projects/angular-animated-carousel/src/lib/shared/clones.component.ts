import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'lng-clone',
  template: `<div (resized)="onResized($event)" [style.height]="'100%'">
    <div [innerHTML]="content" [style.height]="'100%'"></div>
  </div>`
})

export class ClonesComponent {
  @Input() content: any;
  @Output() resized = new EventEmitter();

  onResized($event) {
    this.resized.emit($event);
  }
}
