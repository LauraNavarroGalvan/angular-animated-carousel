import {ModuleWithProviders, NgModule} from '@angular/core';
import {CarouselDynamicSizeComponent} from './carousel-dynamic-size.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {CommonModule} from '@angular/common';
import * as Hammer from 'hammerjs';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {SlideComponent} from './shared/slide.component';
import {ClonesComponent} from './shared/clones.component';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
    'swipe': {velocity: 0.4, threshold: 20} // override default settings
  };
  buildHammer(element: HTMLElement) { // Allows vertical scroll with left/right Swipe
    return new Hammer(element, {
      touchAction: 'pan-y'
    });
  }
}

@NgModule({
  declarations: [
    CarouselDynamicSizeComponent,
    SlideComponent,
    ClonesComponent
  ],
  imports: [
    AngularResizedEventModule,
    CommonModule
  ],
  exports: [
    SlideComponent,
    CarouselDynamicSizeComponent
  ],
  entryComponents: [
    ClonesComponent
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ]
})
export class CarouselDynamicSizeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CarouselDynamicSizeModule,
      providers: []
    };
  }
}
