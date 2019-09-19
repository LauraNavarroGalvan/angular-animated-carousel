import {ModuleWithProviders, NgModule} from '@angular/core';
import {AngularResizedEventModule} from 'angular-resize-event';
import {CommonModule} from '@angular/common';
import * as Hammer from 'hammerjs';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
// Components
import {SlideComponent} from './shared/slide.component';
import {ClonesComponent} from './shared/clones.component';
import {CarouselDynamicSizeComponent} from './carousel-dynamic-size/carousel-dynamic-size.component';
import {CarouselStaticWidthComponent} from './carousel-static-width/carousel-static-width.component';

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
    CarouselStaticWidthComponent,
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
    CarouselDynamicSizeComponent,
    CarouselStaticWidthComponent
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
export class AngularAnimatedCarouselModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AngularAnimatedCarouselModule,
      providers: []
    };
  }
}
