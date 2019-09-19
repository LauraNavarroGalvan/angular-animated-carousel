import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  ElementRef,
  Injector, Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ResizedEvent} from 'angular-resize-event';
// Components
import {SlideComponent} from '../shared/slide.component';
import {ClonesComponent} from '../shared/clones.component';


@Component({
  selector: 'lng-carousel-dynamic',
  templateUrl: './carousel-dynamic-size.component.html',
  styleUrls: ['./carousel-dynamic-size.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselDynamicSizeComponent implements OnInit, AfterViewInit {
  @Input() height: string;
  counter = 0;
  totalSlides: number;
  prevSlide: number;
  direction: 'next' | 'prev' = 'next';
  translateWidth = 0;
  widthSlides = {};
  initialClonesCreated = {};
  finalClonesCreated = {};
  inserSlide: ElementRef;
  @ViewChild('dynamicCarousel') carousel: ElementRef;
  @ContentChildren(SlideComponent) slides: QueryList<SlideComponent>;
  disableControls = false;

  waitFor = 0;

  constructor(
    private _sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {}

  /**
   * After the view is created, it obtains the total of generated slides,
   * waits for the finished load listener and then wait for 1s more while the images are loaded to generate the clones
   */
  ngAfterViewInit() {
    this.totalSlides = this.slides.toArray().length - 1;
  }


  onResized(event: ResizedEvent, index?) {
    if (event.newWidth !== 0 && event.newWidth !== event.oldWidth) {
      if (index !== -1) {
        this.widthSlides[index] = event.newWidth;
        if (this.waitFor === index ) {
          this.initialClones();
        }
        if ( index === 0 && event.newWidth !== event.oldWidth && event.oldWidth !== 0) {
          this.resetInitClones();
        }
        if (index === this.totalSlides) {
          this.finalClones();
        }
        if (index < this.counter) {
          this.createLoop();
        }
      } else if (event.newHeight !== 0) { // OnRisize of The Container
        this.carouselStyle();
      }
    }

  }

  /**
   * Modify the necessary variables to show the previous or next shared
   */
  swipe(action) {
    this.disableControls = false;
    this.prevSlide = this.counter;
    if (action === 'next') {
      this.counter = (this.counter < this.totalSlides) ? this.counter + 1 : 0;
    } else {
      this.counter = (this.counter > 0) ? this.counter - 1 : this.totalSlides;
    }
    this.direction = action;
    this.carouselStyle();
  }

  /**
   * Calculates the distance at which the carousel must move to center the current image and generate the loop
   */
  carouselStyle() {
    const carouselSize = this.carousel.nativeElement.offsetWidth;
    const findActiveSlide = this.widthSlides[this.counter];
    const distance = (carouselSize - findActiveSlide) / 2;
    this.translateWidth =  this.counter === 0 && this.prevSlide === this.totalSlides ?
      this.translateWidth - this.widthSlides[0] : this.prevSlide === 0 && this.counter === this.totalSlides ?
        this.getInitWidth() - this.widthSlides[this.totalSlides] + distance : distance - this.getSummation();
    this.renderer.setStyle(this.carousel.nativeElement, 'transform', 'translateX(' + this.translateWidth + 'px)');
    this.renderer.setStyle(this.carousel.nativeElement, 'transition', 'transform 400ms');

    // Loop next
    if (this.prevSlide === this.totalSlides && this.counter === 0) {
      const getClone = this.elRef.nativeElement.querySelector('[cloneFinal="0"]');
      this.renderer.addClass( getClone, 'active');
      setTimeout(() => {
        this.createLoop(getClone);
      }, 350);
    }
    // Loop prev
    if (this.prevSlide === 0 && this.counter === this.totalSlides) {
      const getClone = this.elRef.nativeElement.querySelector('[cloneInit="' + this.totalSlides + '"]');
      this.renderer.addClass( getClone, 'active');
      setTimeout(() => {
        this.createLoop(getClone);
      }, 350);
    }
    // Waits the animations ends to active the controls
    setTimeout(() => {
      this.disableControls = true;
    }, 400);
  }

  /**
   * Gets the sum of the slides that are previous to the current shared
   */
  getSummation() {
    let index = 0;
    let sum = this.getInitWidth();
    if (this.counter !== 0) {
      do {
        sum += this.widthSlides[index] | 0;
        index ++;
      } while ( index < this.counter);
    }
    return sum;
  }

  getInitWidth() {
    let sum = 0;
    Object.keys(this.initialClonesCreated).forEach(key => {
      sum += this.widthSlides[key] | 0;
    });
    return sum;
  }


  /**
   * Generates the loop effect on the carousel
   */
  createLoop(clone?) {
    const carouselSize = this.carousel.nativeElement.offsetWidth;
    const findActiveSlide = this.widthSlides[this.counter];
    const distance = (carouselSize - findActiveSlide) / 2;
    this.translateWidth = distance - this.getSummation();
    this.renderer.setStyle(this.carousel.nativeElement, 'transform', 'translateX(' + this.translateWidth + 'px)');
    this.renderer.removeStyle(this.carousel.nativeElement, 'transition');
    if (clone) {
      this.renderer.removeClass(clone, 'active');
    }
  }

  /**
   * Creates the necessary clones before the first shared to cover the remaining space on the screen.
   * Updates the contents of the slides cloned if there is a resize
   */
  initialClones() {
    const carouselSize = this.elRef.nativeElement.querySelector('[class="carousel-content"]');
    const firstSlide = this.elRef.nativeElement.querySelector('[data-index="' + 0 + '"]');
    let space = (carouselSize.offsetWidth - firstSlide.offsetWidth) / 2;
    let slideNumber = this.totalSlides;
    this.inserSlide = firstSlide;
    let sizeClone = 0;
    do {
      const cloneSlide = this.elRef.nativeElement.querySelector('[data-index="' + slideNumber + '"]');
      if (!this.initialClonesCreated[slideNumber]) {
        const setClone = this.renderer.createElement('div');
        const factory = this.componentFactoryResolver.resolveComponentFactory(ClonesComponent);
        const popupComponentRef = factory.create(this.injector, [], setClone);
        this.applicationRef.attachView(popupComponentRef.hostView);
        popupComponentRef.instance.content = this._sanitizer.bypassSecurityTrustHtml(cloneSlide.innerHTML);
        // Listen to the close event
        popupComponentRef.instance.resized.subscribe((event) => {
          if (event.newWidth !== 0) {
            this.onResized(event, JSON.stringify(slideNumber));
            this.carouselStyle();
          }
        });
        this.renderer.addClass(setClone, 'slide');
        this.renderer.addClass(setClone, 'clone');
        this.renderer.setAttribute(setClone, 'cloneInit', JSON.stringify(slideNumber));
        this.renderer.insertBefore(this.carousel.nativeElement, setClone, this.inserSlide);
        this.initialClonesCreated[slideNumber] = popupComponentRef;
      }
      this.inserSlide = this.elRef.nativeElement.querySelector('[cloneInit="' + slideNumber + '"]');
      sizeClone = this.widthSlides[slideNumber] | 0;
      if (sizeClone === 0) {
        this.waitFor = Number(JSON.stringify(slideNumber));
      } else {
        space = space - this.widthSlides[slideNumber];
        slideNumber --;
      }
    } while ( space > 0 && slideNumber >= 0 && sizeClone !== 0);
  }

  /**
   * * Creates the necessary clones after the last shared to cover the remaining space on the screen.
   * Updates the contents of the slides cloned if there is a resize
   */
  finalClones() {
    const carouselSize = this.elRef.nativeElement.querySelector('[class="carousel-content"]');
    const firstSlide = this.elRef.nativeElement.querySelector('[data-index="' + this.totalSlides + '"]');
    let space = (carouselSize.offsetWidth - firstSlide.offsetWidth) / 2;
    let slideNumber = 0;
    do {
      const cloneSlide = this.elRef.nativeElement.querySelector('[data-index="' + slideNumber + '"]');
      if (!this.finalClonesCreated[slideNumber]) {
        const setClone = this.renderer.createElement('div');
        setClone.innerHTML = cloneSlide.innerHTML;
        this.renderer.addClass(setClone, 'slide');
        this.renderer.addClass(setClone, 'clone');
        this.renderer.setAttribute(setClone, 'cloneFinal', JSON.stringify(slideNumber));
        this.renderer.appendChild(this.carousel.nativeElement, setClone);
        this.finalClonesCreated[slideNumber] = true;
      } else {
        const modifiedContent = this.elRef.nativeElement.querySelector('[cloneFinal="' + slideNumber + '"]');
        modifiedContent.innerHTML = cloneSlide.innerHTML;
      }
      space = space - cloneSlide.offsetWidth;
      slideNumber ++;
    } while ( space > 0 && slideNumber <= this.totalSlides);
  }

  resetInitClones() {
    Object.keys(this.initialClonesCreated).forEach((cloneNumber, index, array) => {
      const removeClone = this.elRef.nativeElement.querySelector('[cloneInit="' + cloneNumber + '"]');
      if (removeClone) {
        removeClone.remove();
      }
      delete this.widthSlides[cloneNumber];
      if (index === array.length - 1) {
        this.initialClonesCreated = {};
        this.renderer.setStyle(this.carousel.nativeElement, 'transform', 'translateX(0px)');
        this.renderer.removeStyle(this.carousel.nativeElement, 'transition');
        this.initialClones();
      }
    });
  }

}

