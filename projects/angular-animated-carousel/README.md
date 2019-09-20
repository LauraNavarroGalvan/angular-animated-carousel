# AngularAnimatedCarousel

AngularAnimatedCarousel is a lightweight, touchable and responsive library to create a carousel animated for angular 7

# Demo
demos available [here](https://angular-animated-carousel-demo.stackblitz.io)


# Install

You can install the package from our npm package
```bash
npm install --save angular-animated-carousel
```

### Dependencies
```bash
npm install --save hammerjs animate.css angular-resize-event
```

# Usage

First you need to provide the AngularAnimatedCarouselModule to your desired Module

```bash
import {AngularAnimatedCarouselModule} from 'angular-animated-carousel';

// In your App's module or Custom Module:
@NgModule({
    imports: [
       AngularAnimatedCarouselModule
    ] 
})
```

Now, you can use AngularAnimatedCarouselModule as follow:

* CAROUSEL STATIC WIDTH

    ```bash
    <lng-carousel>
        <lng-slide>
            ... content of slide 1
        </lng-slide>
        <lng-slide>
            ... content of slide 2
        </lng-slide>
        <lng-slide>
            ... content of slide 3
        </lng-slide>
    </lng-carousel>
    ```
* CAROUSEL DYNAMIC WIDTH

    ```bash
    <lng-carousel-dynamic [height]="'380px'">
        <lng-slide>
            ... content of slide 1
        </lng-slide>
        <lng-slide>
            ... content of slide 2
        </lng-slide>
        <lng-slide>
            ... content of slide 3
        </lng-slide>
    </lng-carousel-dynamic>
    ```
# API Documentation

* CAROUSEL STATIC WIDTH
    ### Inputs
     * showIndicators: 
     If true, allows to interact with carousel using keyboard 'arrow left' and 'arrow right'.  
     _Type: boolean  
     Default value: true_
     * showDualImage: 
      If true, two slides will be visible on the same time.  
      _Type: boolean  
      Default value: true_
     
    ### Outputs 
    * counterChange: Emits an event with the current counter value. 
    
* CAROUSEL DYNAMIC WIDTH
    ### Inputs
     * height: Set the height of the carousel  
     _Type: string_


### Author 

Laura Cristina Navarro Galvan

### License
MIT
