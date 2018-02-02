(function() {
  var addToCart, addToProductList, checkout, closeCart, closeOverlay, colorSelector, initBuySticky, initNav, initPDP, log, quickAddToCart, removeProduct, showCart, showOverlay, sizeSelector, stickyBuyNow, updateCart;

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
    return $.each(products, function(index) {
      var productRowTmpl;
      productRowTmpl = $('<div>').addClass('whoWrap').attr('data-index', index).html('<div>' + this.name + '</div><div>' + this.price + '</div><div>' + this.color + '</div><div>Size ' + this.size + '</div><div class="removeItem">Remove</div>');
      $('#dir').append(productRowTmpl);
    });
  };

  addToCart = function() {
    return $('.btn.addToCart').on('click', function(e) {
      var addProduct, color, i, inArray, product, selectedSize;
      log('Click fired');
      e.stopPropagation();
      e.preventDefault();
      if ($('.sizeList li').hasClass('active')) {
        product = {};
        selectedSize = parseFloat($('.sizeList li.active').text());
        color = typeof product.color === 'undefined' ? $('.colorList li.active').text() : product.color;
        addProduct = function(product) {
          return addToProductList(product);
        };
        inArray = false;
        i = 0;
        while (i < products.length) {
          if (products[i]['size'] === selectedSize && products[i]['color'] === color) {
            inArray = true;
          }
          i++;
        }
        if (inArray) {
          showOverlay();
          $('.c-cart-wrapper').removeClass('isHidden');
          return $('.c-cart-wrapper').addClass('isVisible');
        } else {
          return addProduct({
            name: window.product.name,
            price: window.product.price,
            color: color,
            size: selectedSize,
            active: true
          });
        }
      } else {
        return alert('Select a size first');
      }
    });
  };

  stickyBuyNow = function() {
    return $('.right > .btn-gradient').on('click', function() {
      var addProduct, color, i, inArray, product, selectedSize;
      if ($('.sizeList li').hasClass('active')) {
        product = {};
        selectedSize = parseFloat($('.sizeList li.active').text());
        color = typeof product.color === 'undefined' ? $('.colorList li.active').text() : product.color;
        addProduct = function(product) {
          return addToProductList(product);
        };
        inArray = false;
        i = 0;
        while (i < products.length) {
          if (products[i]['size'] === selectedSize && products[i]['color'] === color) {
            inArray = true;
          }
          i++;
        }
        if (inArray) {
          showOverlay();
          $('.c-cart-wrapper').removeClass('isHidden');
          return $('.c-cart-wrapper').addClass('isVisible');
        } else {
          return addProduct({
            name: window.product.name,
            price: window.product.price,
            color: color,
            size: selectedSize,
            active: true
          });
        }
      } else {
        return $('html, body').animate({
          scrollTop: $('.colorList').position().top
        }, 1000);
      }
    });
  };

  removeProduct = function() {
    return $('body').on('click', '.removeItem', function() {
      log($(this).parent());
      return $(this).parent().remove();
    });
  };

  addToProductList = function(product) {
    if (product && product.active === true) {
      products.push(product);
      log('Product ' + product.name + ' added to Cart');
      updateCart(products);
      return log('Cart updated');
    } else {
      return console.log('Cart initialized');
    }
  };

  quickAddToCart = function() {
    return $('.btn.quickAddToCart').click(function() {
      this.mixMatchProduct = {
        name: 'Ramaswamy',
        price: '49.99$',
        color: 'black',
        size: 'one size',
        active: true
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
    window.product = {
      name: $('h1.productName').text(),
      price: $('p.price').first().text(),
      active: false
    };
    sizeSelector();
    colorSelector();
    showCart();
    closeCart();
    addToCart();
    checkout();
    quickAddToCart();
    addToProductList();
    removeProduct();
    return stickyBuyNow();
  };

  $(document).ready(function() {
    initNav();
    return initPDP();
  });

}).call(this);
