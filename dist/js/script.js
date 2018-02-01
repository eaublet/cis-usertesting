(function() {
  var addToCart, checkout, closeCart, closeOverlay, colorSelector, initBuySticky, initNav, initPDP, log, showCart, showOverlay, sizeSelector, updateCart;

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
      $('.sizeSelected').html($(this).text());
      return window.product.size = $(this).text();
    });
  };

  colorSelector = function() {
    return $('.colorList li').click(function() {
      $('.colorList li').each(function() {
        return $(this).removeClass('active');
      });
      $(this).addClass('active');
      $('.colorSelected').html($(this).text());
      return window.product.color = $(this).text();
    });
  };

  showOverlay = function() {
    $('.c-overlay').removeClass('isHidden');
    return $('.c-overlay').addClass('isVisible');
  };

  closeOverlay = function() {
    $('.c-overlay').removeClass('isVisible');
    return $('.c-overlay').addClass('isHidden');
  };

  showCart = function() {
    if ($('.colorList li').hasClass('active')) {
      return $('#navBag').click(function() {
        updateCart();
        showOverlay();
        $('.c-cart-wrapper').removeClass('isHidden');
        return $('.c-cart-wrapper').addClass('isVisible');
      });
    }
  };

  closeCart = function() {
    return $('.o-close-button').click(function() {
      closeOverlay();
      $('.c-cart-wrapper').removeClass('isVisible');
      return $('.c-cart-wrapper').addClass('isHidden');
    });
  };

  updateCart = function() {
    var productName, productPrice;
    productName = $('h1.productName').text();
    productPrice = $('p.price').first().text();
    $('[data-id="product-name"]').text(productName);
    $('[data-qa-id="cart-summary-subtotal-value"]').text(productPrice);
    $('[data-qa-id="product-final-price"]').text(productPrice);
    $('[data-qa-id="product-size"').text('Size ' + product.size);
    return $('[data-qa-id="product-style"]').text(product.color);
  };

  addToCart = function() {
    if ($('.colorList li').hasClass('active')) {
      return $('.btn.addToCart').click(function() {
        return updateCart();
      });
    }
  };

  checkout = function() {
    return $('.goToCheckout').click(function() {
      $('.c-cart-wrapper').removeClass('isVisible');
      $('.c-cart-wrapper').addClass('isHidden');
      $('.c-checkout__wrapper').removeClass('isHidden');
      return $('.c-checkout__wrapper').addClass('isVisible');
    });
  };

  initPDP = function() {
    window.product = {};
    sizeSelector();
    colorSelector();
    showCart();
    closeCart();
    addToCart();
    return checkout();
  };

  $(document).ready(function() {
    initNav();
    return initPDP();
  });

}).call(this);
