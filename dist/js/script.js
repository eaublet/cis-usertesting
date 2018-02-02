(function() {
  var addToCart, addToProductList, checkout, closeCart, closeOverlay, colorSelector, initBuySticky, initNav, initPDP, log, quickAddToCart, showCart, showOverlay, sizeSelector, updateCart;

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

  updateCart = function(products) {
    $('#dir').empty();
    $('#bagCount').empty().html(products.length);
    return $.each(products, function(index) {
      $('#dir').append($('<div>').addClass('whoWrap').text(this.name));
      $('#dir').append($('<div>').addClass('whoWrap').text(this.price));
      $('#dir').append($('<div>').addClass('whoWrap').text('Color: ' + this.color));
      $('#dir').append($('<div>').addClass('whoWrap').text('Size: ' + this.size));
    });
  };

  addToCart = function() {
    if ($('.colorList li').hasClass('active')) {
      return $('.btn.addToCart').click(function() {
        var color;
        products[0] = {};
        color = typeof product.color === 'undefined' ? $('.colorList li.active').text() : product.color;
        this.product = {
          name: $('h1.productName').text(),
          price: $('p.price').first().text(),
          color: color,
          size: product.size
        };
        return addToProductList(this.product, 0);
      });
    }
  };

  addToProductList = function(product, index) {
    products.splice(index, 1, product);
    log('Product ' + product.name + ' added to Cart');
    updateCart(window.products);
    return log('Cart updated');
  };

  quickAddToCart = function() {
    return $('.btn.quickAddToCart').click(function() {
      this.mixMatchProduct = {
        name: 'Ramaswamy',
        price: '49.99$',
        color: 'black',
        size: 'one size'
      };
      return addToProductList(this.mixMatchProduct, 1);
    });
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
    window.products = [];
    window.product = {};
    sizeSelector();
    colorSelector();
    showCart();
    closeCart();
    addToCart();
    checkout();
    return quickAddToCart();
  };

  $(document).ready(function() {
    initNav();
    return initPDP();
  });

}).call(this);
