(function() {
  var colorSelector, initBuySticky, initNav, initPDP, log, sizeSelector;

  log = function(msg) {
    return console.log(msg);
  };

  initBuySticky = function() {
    var buySticky, elemTop, hideSticky, pageTop, showSticky, targetIn;
    buySticky = $('.buySticky');
    targetIn = ".addToCart";
    pageTop = $(document).scrollTop();
    elemTop = $(targetIn).offset().top;
    showSticky = function() {
      if ($(document).scrollTop() >= $(targetIn).offset().top) {
        return buySticky.addClass('visible');
      }
    };
    hideSticky = function() {
      return buySticky.removeClass('visible');
    };
    if (elemTop <= pageTop) {
      showSticky();
    }
    if (buySticky.length) {
      return inView(targetIn).on('enter', function(el) {
        return hideSticky();
      }).on('exit', function(el) {
        showSticky();
      });
    }
  };

  initNav = function() {
    $('nav.mobile').headroom({
      tolerance: {
        up: 5,
        down: 10
      },
      offset: ($('.surnav.mobile').outerHeight() || 0) + $('nav.mobile').outerHeight()
    });
    initBuySticky();
  };

  sizeSelector = function() {
    return $('.sizeList li').click(function() {
      $('.sizeList li').each(function() {
        return $(this).removeClass('active');
      });
      $(this).addClass('active');
      return $('.sizeSelected').html($(this).text());
    });
  };

  colorSelector = function() {
    return $('.colorList li').click(function() {
      $('.colorList li').each(function() {
        return $(this).removeClass('active');
      });
      $(this).addClass('active');
      return $('.colorSelected').html($(this).text());
    });
  };

  initPDP = function() {
    sizeSelector();
    return colorSelector();
  };

  $(document).ready(function() {
    initNav();
    return initPDP();
  });

}).call(this);
