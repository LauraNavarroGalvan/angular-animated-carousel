import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
// Components
import {SlideComponent} from '../shared/slide.component';


@Component({
  selector: 'lng-carousel',
  templateUrl: './carousel-static-width.component.html',
  styleUrls: ['./carousel-static-width.component.scss']
})
export class CarouselStaticWidthComponent implements OnInit, AfterViewInit, OnChanges {

  @ContentChildren(SlideComponent)
  slides: QueryList<SlideComponent>;
  counter = 0;
  increase = 1;
  totalSlides: number;
  prevSlide: number;
  direction = 'prev';

  @Input() showIndicators = true;
  @Input() showDualImage = false;
  @Output() counterChange = new EventEmitter<any>(); // Emits the counter value

  constructor() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.totalSlides = this.slides.toArray().length - this.increase;
      this.prevSlide = (this.counter > 0) ? this.counter - this.increase : this.totalSlides - 1;
    }, 1);
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showDualImage && changes.showDualImage.currentValue === true) {
      this.increase =  2;
    }
  }


  swipe(action) {
    if (action === 'next') {
      this.counter = (this.counter < this.totalSlides) ? this.counter + this.increase : 0;
    } else {
      this.counter = (this.counter > 0) ? this.counter - this.increase : this.totalSlides;
    }
    this.prevSlide = (this.counter > 0) ? this.counter - this.increase : this.totalSlides;
    this.direction = action;
    this.change();
  }

  change() {
    this.counterChange.emit(this.counter);
  }

  indicatorChanges(index) {
    this.counter = index;
    this.prevSlide = (this.counter > 0) ? this.counter - this.increase : this.totalSlides;
    this.direction = index < this.counter ? 'prev' : 'next';
    this.change();
  }

}
