# FullPageScroll
FullPageScroll is a very light weight pure jQuery plugin to create one single page scroll applications.

Created by **Tejas Shobhasana**.

License: Open source


## Requirement
You just need latest version of jQuery along with swipe js to use FullPageScroll plugin.


## Compatibility
Compatible with all major browsers like Chrome, Firefox, Safari even on desktop as well with smartphones. Also working fine with Microsoft browers(Edge and IE 10+).

## Basic Usage
To add this to your website, simply include `fullpage.js` and `fullpage.css` along with `jQuery` and `swipe.js` into your document's `<head>` and call the function as follows:


### Including files:
```html
<link rel="stylesheet" type="text/css" href="fullpage.css" />

<script src="js/jquery.js"></script>

<!-- Swipe js is mainly used for the touch support in touch devices -->
<script src="js/swipe.js"></script>

<script type="text/javascript" src="fullpage.js"></script>
```


### HTML structure
FullPage Section should be placed inside a wrapper (`<div class="fullpage-wrapper">` in this case).

And each fullpage section should be immediate child of wrapper, included with `fullpage-section` class.

````html
<body>
  ...
  <div class="fullpage-wrapper">
    <section class="fullpage-section">...</section>
    <section class="fullpage-section">...</section>
    <section class="fullpage-section">...</section>
    ...
  </div>
  ...
</body>
````
You can see a fully working example of the HTML structure in the [`index.html` file](https://github.com/tejasShobhasanaTatva/FullPageScroll/blob/master/index.html).


### Initialization
```javascript
$(window).on("load", function () {
    $(".fullpage-wrapper").fullPage({
        innerSectionClass: ".fullpage-section",     // Default class for fullpage sections. It should not be blank.
        loop: true,                                 // Default value is false
        scrollingSpeed: 750,                        // Scroll animation speed from one section to another. Default value is 500.
        animationType: 'linear',                    // Scroll animation type. You can use any CSS3 easing type. Default type is ease.
                                                    // "ease", "linear", "ease-in", "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.25,0.75,0.5,1.25)"
        dots: false,                                // Default value is true
        keyboard: true,                             // Default value is false. Arrow Up/Right - Next slide, Arrow Down/Left - Previous slide, Spacebar - Next Slide
                                                    // Home - First slide, End - Last slide, Page up - Previous Slide, Page Down - Next Slide
    });
})
```