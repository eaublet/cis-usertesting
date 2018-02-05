(function() {
  var addToCart, addToProductList, checkout, closeCart, closeOverlay, colorSelector, initBuySticky, initNav, initPDP, log, quickAddToCart, removeProduct, setAdded, showCart, showOverlay, sizeSelector, stickyBuyNow, updateCart, updateCartCount;

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
      offset: $('.sizeSelector').offset().top
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
      $('.right > .btn-gradient').removeClass('added').text('Add size ' + $(this).text() + ' to Cart');
      return $('a.addToCart').removeClass('added').html('Add to cart');
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
    return $('body').addClass('fixed');
  };

  closeOverlay = function() {
    $('body').removeClass('fixed');
    return $('.c-overlay').removeClass('isVisible');
  };

  showCart = function() {
    if ($('.colorList li').hasClass('active')) {
      return $('#navBag').click(function() {
        showOverlay();
        return $('.cartWrapper').addClass('isVisible');
      });
    }
  };

  closeCart = function() {
    return $('.u-btn__content').click(function() {
      closeOverlay();
      return $('.cartWrapper').removeClass('isVisible');
    });
  };

  updateCartCount = function(count) {
    $('#bagCount .count').removeClass('have1 have2 have3 have4').addClass('have' + count).attr('data-count', count);
    return $('.c-heading .count').html('(' + count + ')');
  };

  updateCart = function(products) {
    var totalValue;
    $('.productsCart').empty();
    $('nav.mobile').addClass('headroom--pinned').removeClass('headroom--unpinned');
    $('#navBag').addClass('adding');
    setTimeout((function() {
      updateCartCount(products.length);
      return $('#navBag').removeClass('adding');
    }), 640);
    totalValue = 0;
    $.each(products, function(index) {
      var oldVal, productRowTmpl;
      oldVal = totalValue;
      totalValue = ((oldVal * 1000) + (parseInt(this.price.replace('$', '') * 1000))) / 1000;
      productRowTmpl = '<li data-id=' + this.id + '><div class="img"><img src="' + this.img + '"></div><div class="data"><div class="title">' + this.name + '</div><div class="infos">';
      if (this.color) {
        productRowTmpl += '<span>' + this.color + '</span>';
      }
      if (this.size) {
        productRowTmpl += '<span>Size ' + this.size + '</span>';
      }
      productRowTmpl += '<span>Qty. 1</span></div></div><div class="options"><div class="price">' + this.price + '</div><a class="btnLink">Edit</a><a class="btnLink removeItem">Remove</a></div></li>';
      return $('.productsCart').append(productRowTmpl);
    });
    return $('.totalPrice').html('$' + totalValue);
  };

  setAdded = function() {
    return setTimeout((function() {
      $('.btn.addToCart').addClass('added').html('Added! Open cart');
      return $('.right > .btn-gradient').addClass('added').html('Added! Open cart');
    }), 640);
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
        setAdded();
        while (i < products.length) {
          if (products[i]['size'] === selectedSize && products[i]['color'] === color) {
            inArray = true;
          }
          i++;
        }
        if (inArray) {
          showOverlay();
          return $('.cartWrapper').addClass('isVisible');
        } else {
          return addProduct({
            name: window.product.name,
            img: $('#mainImg').attr('src'),
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
        setAdded();
        while (i < products.length) {
          if (products[i]['size'] === selectedSize && products[i]['color'] === color) {
            inArray = true;
          }
          i++;
        }
        if (inArray) {
          showOverlay();
          return $('.cartWrapper').addClass('isVisible');
        } else {
          return addProduct({
            name: window.product.name,
            img: $('#mainImg').attr('src'),
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
      var r, rId, thisId;
      log($(this).parent());
      thisId = $(this).parent().parent().attr('data-id');
      console.log(products);
      r = 0;
      while (r < products.length) {
        rId = products[r]['id'];
        if (JSON.stringify(rId) === thisId) {
          products.splice(r, 1);
          updateCart(products);
          return;
        }
        r++;
      }
    });
  };

  addToProductList = function(product) {
    if (product && product.active === true) {
      product.id = Math.random();
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
        img: $(this).attr('quick-image'),
        name: $(this).attr('quick-name'),
        price: $(this).attr('quick-price'),
        color: $(this).attr('quick-color') || void 0,
        size: $(this).attr('quick-size') || void 0,
        active: true
      };
      return addToProductList(this.mixMatchProduct, 1);
    });
  };

  checkout = function() {
    return $('.goToCheckout').click(function() {
      $('.cartWrapper').removeClass('isVisible');
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
