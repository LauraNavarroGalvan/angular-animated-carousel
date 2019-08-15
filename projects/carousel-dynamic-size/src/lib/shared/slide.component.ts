import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'lib-custom-slide',
  template: `
      <ng-template #innerTemplate>
      <ng-content></ng-content>
      </ng-template>`,
  styleUrls: []
})
export class SlideComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
