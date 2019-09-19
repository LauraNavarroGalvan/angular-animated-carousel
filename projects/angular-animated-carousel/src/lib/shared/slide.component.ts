import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'lng-slide',
  template: `
      <ng-template #innerTemplate>
      <ng-content></ng-content>
      </ng-template>`,
  styleUrls: []
})
export class SlideComponent implements OnInit {
  @ViewChild('innerTemplate')
  public innerTemplate: TemplateRef<any>;
  constructor() { }

  ngOnInit() {
  }

}
