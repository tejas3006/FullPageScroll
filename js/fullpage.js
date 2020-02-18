var lastScrollTop = 0, currentIndex;
var winHeight = $(window).height();
var defaultURL = window.location.href;

$.fn.extend({
  fullPage: function (options) {
    var __this = $(this);

    /* Declare function */
    // var init, scrollingDown, scrollingUp, fullpageDots, fullpageSwipe, fullpageScroll, errors, initialLoadEvents, keyboardSupport, fullpageResize;

    errors = function () {

      // When fullpage init class not found
      if (!$(__this.selector).length) {
        throw Error(__this.selector + " class not defined.");
      }

      // Selector class not found
      if (!$(options.innerSectionClass).length) {
        throw Error(options.innerSectionClass + " class not defined.");
      }

      // when dots options have other value than true/false
      if (!(options.dots == true || options.dots == false || options.dots == undefined)) {
        throw Error("Dots option value is not proper")
      }

      // when loop options have other value than true/false
      if (!(options.loop == true || options.loop == false || options.loop == undefined)) {
        throw Error("Loop option value is not proper")
      }

      // when keyboard options have other value than true/false
      if (!(options.keyboard == true || options.keyboard == false || options.keyboard == undefined)) {
        throw Error("Keyboard option value is not proper")
      }
    }

    // Options default value
    DefaultOptions = function () {
      loop: false;
      dots: true;
      keyboard: false;
      mouseDrag: false;

      // Scrolling speed
      if (options.scrollingSpeed == undefined) {
        scrollingSpeed = 500; // default
      }
      else {
        scrollingSpeed = options.scrollingSpeed;
      }

      // Scrolling Animation
      if (options.animationType == undefined) {
        animationType = "ease"; // default
      }
      else {
        animationType = options.animationType;
      }
    }

    // Dynamic structure generates when page load
    initialLoadEvents = function () {
      $(options.innerSectionClass).height($(window).height());
      $(__this.selector).find(options.innerSectionClass).wrapAll("<div class='fullpage-stage'></div>");
      $(options.innerSectionClass).first().addClass("active");

      $(options.innerSectionClass).each(function () {
        $(this).attr('slide-index', $(this).index() + 1);
      })
    }

    // Dots structure generate dynamically
    fullpageDots = function () {

      $(__this.selector).append("<ul class='fullpage_dots'></ul>")

      var totalThumb = $(options.innerSectionClass).length;
      for (i = 0; i < totalThumb; i++) {
        $(".fullpage_dots").append("<li><i></i></li>");
      }
      $(".fullpage_dots li:first").addClass("active");

      $("body").delegate(".fullpage_dots li", "click touchstart", function () {
        $(__this.selector).find(".fullpage-stage").css({
          "transform": "translateY(-" + winHeight * ($(this).index()) + "px)",
          "transition": "all " + scrollingSpeed + "ms " + animationType + ""
        });

        $(options.innerSectionClass).removeClass("active").eq($(this).index()).addClass("active");
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      })
    }

    // Mouse scroll down events
    scrollingDown = function () {
      currentIndex = $(options.innerSectionClass + ".active").index();

      if ($(options.innerSectionClass + ".active").next(options.innerSectionClass).length) {
        $(options.innerSectionClass).eq(currentIndex + 1).addClass('active');
        $('.fullpage_dots li').eq(currentIndex + 1).addClass('active');
        $(options.innerSectionClass).eq(currentIndex).removeClass('active');
        $('.fullpage_dots li').eq(currentIndex).removeClass('active');

        $(__this.selector).find(".fullpage-stage").css({
          "transform": "translateY(-" + winHeight * (currentIndex + 1) + "px)",
          "transition": "all " + scrollingSpeed + "ms " + animationType + ""
        });
      }

      // When loop true
      if (options.loop == true && currentIndex == ($(options.innerSectionClass).length - 1)) {
        scrollToFirstSlide();
      }

    }

    // Mouse scroll up events
    scrollingUp = function () {
      currentIndex = $(options.innerSectionClass + ".active").index();
      if ($(options.innerSectionClass + ".active").prev(options.innerSectionClass).length) {
        $(options.innerSectionClass).eq(currentIndex - 1).addClass('active');
        $('.fullpage_dots li').eq(currentIndex - 1).addClass('active');
        $(options.innerSectionClass).eq(currentIndex).removeClass('active');
        $('.fullpage_dots li').eq(currentIndex).removeClass('active');

        $(__this.selector).find(".fullpage-stage").css({
          "transform": "translateY(-" + winHeight * (currentIndex - 1) + "px)",
          "transition": "all " + scrollingSpeed + "ms " + animationType + ""
        });
      }

      // When loop true
      if (options.loop == true && currentIndex == 0) {
        scrollToLastSlide();
      }

    }

    // When Home key pressed from keyboard
    scrollToLastSlide = function () {
      var totalSlides = $(__this.selector).find(options.innerSectionClass).length;

      $(__this.selector).find(".fullpage-stage").css({
        "transform": "translateY(-" + winHeight * (totalSlides - 1) + "px)",
        "transition": "all " + scrollingSpeed + "ms " + animationType + ""
      });

      $(__this.selector).find(options.innerSectionClass).removeClass("active");
      $(__this.selector).find(options.innerSectionClass).eq(totalSlides - 1).addClass("active");
      $(".fullpage_dots li").removeClass("active");
      $(".fullpage_dots li").eq(totalSlides - 1).addClass("active");
    }

    // When End key pressed from keyboard
    scrollToFirstSlide = function () {

      $(__this.selector).find(".fullpage-stage").css({
        "transform": "translateY(0px)",
        "transition": "all " + scrollingSpeed + "ms " + animationType + ""
      });

      $(__this.selector).find(options.innerSectionClass).removeClass("active");
      $(__this.selector).find(options.innerSectionClass).eq(0).addClass("active");
      $(".fullpage_dots li").removeClass("active");
      $(".fullpage_dots li").eq(0).addClass("active");
    }

    // Touch device swipe events
    fullpageSwipe = function () {
      $(__this.selector).swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
          if (direction == "down") {
            scrollingUp();
          }
          if (direction == "up") {
            scrollingDown();
          }
        },
        threshold: 0
      });
    }

    // Mouse scroll Events
    fullpageScroll = function () {

      $('body').on('mousewheel DOMMouseScroll touchend', function (e) {
        clearTimeout($.data(this, 'scrollTimer'));

        $.data(this, 'scrollTimer', setTimeout(function () {
          if (typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
            if (e.originalEvent.detail > 0) {
              scrollingDown();
            } else if (e.originalEvent.detail < 0) {
              scrollingUp();
            }
          }
          else if (typeof e.originalEvent.wheelDelta == 'number') {
            if (e.originalEvent.wheelDelta < 0) {
              scrollingDown();
            }
            else if (e.originalEvent.wheelDelta > 0) {
              scrollingUp();
            }
          }
        }, 350));

      });

    }

    // Keyboard up/down arrow key press
    keyboardSupport = function () {
      $(document).keyup(function (e) {
        switch (e.which) {
          case 32: // spacebar
            scrollingDown();
            break;

          case 33: // PageUp
            scrollingUp();
            break;

          case 34: // PageDown
            scrollingDown();
            break;

          case 35: // End
            scrollToLastSlide();
            break;

          case 36: // Home
            scrollToFirstSlide();
            break;

          case 37: // left
            scrollingUp();
            break;

          case 38: // up
            scrollingUp();
            break;

          case 39: // right
            scrollingDown();
            break;

          case 40: // down
            scrollingDown();
            break;

          default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
      });
    }

    // When browser resize
    fullpageResize = function () {
      $(window).resize(function () {
        $(options.innerSectionClass).height($(window).height());
        winHeight = $(window).height();
        $(__this.selector).find(".fullpage-stage").addClass("no-transition");
        setTimeout(function () {
          $(__this.selector).find(".fullpage-stage").css({
            "transform": "translateY(-" + winHeight * ($(options.innerSectionClass + ".active").index()) + "px)",
            "transition": "all " + scrollingSpeed + "ms " + animationType + ""
          });
        }, 100);
        setTimeout(function () {
          $(__this.selector).find(".fullpage-stage").removeClass("no-transition");
        }, 200);
      });

    }


    /* Function Call */
    init = function () {
      errors();
      DefaultOptions();
      initialLoadEvents();
      fullpageSwipe();
      fullpageScroll();
      fullpageResize();
      if (options.keyboard == true) {
        keyboardSupport();
      }
      if (options.dots == undefined || options.dots == true) {
        fullpageDots();
      }
    }
    init();
  }
});


