(function() {
  var addToCart, addToProductList, changeStep, checkout, checkoutButtonNextStep, closeCart, closeOverlay, colorSelector, getInfos, getProducts, getUrlParameter, initBuySticky, initCheckboxes, initCheckout, initCheckoutButton, initConfirm, initNav, initPDP, initRadios, initSections, initSurvey, initTabs, initUI, log, quickAddToCart, removeProduct, setAdded, showCart, showOverlay, sizeSelector, stickyBuyNow, updateCart, updateCartCount, watchField;

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
    $(window).scroll(function(event) {
      var scroll;
      scroll = $(window).scrollTop();
      if (scroll > 40) {
        $('.navContent').addClass('reduced');
      }
      if (scroll < 40) {
        return $('.navContent').removeClass('reduced');
      }
    });
    $('nav.mobile, .navContent.desktop').headroom({
      tolerance: {
        up: 5,
        down: 10
      },
      offset: 300 || $('.sizeSelector').offset().top
    });
    if ($('.buySticky').length) {
      initBuySticky();
    }
  };

  sizeSelector = function() {
    return $('.sizeList li').click(function() {
      $('.sizeList li').each(function() {
        return $(this).removeClass('active');
      });
      $(this).addClass('active');
      $('.sizeSelected').html($(this).text());
      $('.right > .btn-gradient').removeClass('added').find('.label').text('Add size ' + $(this).text() + ' to Cart');
      return $('a.addToCart').removeClass('added').find('.label').html('Add to cart');
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
      $('.btn.addToCart').addClass('added').find('.label').html('Added! Open cart');
      return $('.right > .btn-gradient').addClass('added').find('.label').html('Added! Open cart');
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
        if ($('nav.desktop').length) {
          return $('html, body').animate({
            scrollTop: 0
          }, 640);
        } else {
          return $('html, body').animate({
            scrollTop: $('.colorList').position().top
          }, 640);
        }
      }
    });
  };

  removeProduct = function() {
    return $('body').on('click touchstart', '.removeItem', function() {
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
      if ($('body').hasClass('desktop')) {
        $(this).attr('href', 'checkoutDesktop.html?products=' + JSON.stringify(products)).click();
      } else {
        return $(this).attr('href', 'checkout.html?products=' + JSON.stringify(products)).click();
      }
    });
  };

  initCheckboxes = function() {
    return $('.check').click(function() {
      return $(this).toggleClass('checked');
    });
  };

  initRadios = function() {
    return $('.radio').click(function() {
      $(this).parent().find('.radio').each(function() {
        return $(this).removeClass('checked');
      });
      return $(this).toggleClass('checked');
    });
  };

  initTabs = function() {
    return $('.tab').click(function() {
      var container, tab;
      console.log('tap');
      $(this).parent().find('.tab').each(function() {
        return $(this).removeClass('selected');
      });
      $(this).toggleClass('selected');
      container = $(this).attr('data-container');
      tab = $(this).attr('data-tab');
      $(container).removeClass('active');
      return $(container + '[data-tab=' + tab + ']').addClass('active');
    });
  };

  initSections = function() {
    return $('.editSection').click(function() {
      return $(this).parent().removeClass('inactive filled').addClass('active');
    });
  };

  watchField = function(el, nextLabel) {
    var elements, i, j, len, results, toValidate;
    if (el !== false) {
      elements = el.split(',');
      toValidate = elements.length;
      $('.nextStep').html(nextLabel);
      results = [];
      for (j = 0, len = elements.length; j < len; j++) {
        i = elements[j];
        results.push($(i).on('focus', function() {
          console.log('yeee');
          toValidate--;
          if (toValidate === 0) {
            return $('.nextStep').removeClass('btn-inactive');
          }
        }));
      }
      return results;
    } else {
      return $('.nextStep').html(nextLabel).removeClass('btn-inactive');
    }
  };

  checkoutButtonNextStep = function() {
    var maxStep;
    maxStep = '3';
    return $('.nextStep').click(function() {
      var thisStep;
      if ($('.nextStep').hasClass('btn-inactive')) {

      } else {
        thisStep = $(this).attr('data-current-step');
        if (JSON.stringify(thisStep) === JSON.stringify(maxStep)) {
          $('.nextStep').attr('href', '/confirm.html?products=' + JSON.stringify(products) + '&infos={email:' + $('#first-email').val() + '}');
          $('.nextStep').click();
          return;
        }
        $('.section[data-step=' + thisStep + ']').addClass('filled inactive');
        thisStep++;
        $('.section[data-step=' + thisStep + ']').removeClass('filled inactive').addClass('active');
        setTimeout((function() {
          return $('html, body').animate({
            scrollTop: $('.section[data-step=' + thisStep + ']').position().top - $('nav').outerHeight()
          }, 640);
        }), 640);
        $(this).attr('data-current-step', thisStep).addClass('btn-inactive');
        return changeStep();
      }
    });
  };

  changeStep = function() {
    switch ($('.nextStep').attr('data-current-step')) {
      case '0':
        watchField('#first-fn,#first-ln,#first-email', 'Continue to shipping');
        return checkoutButtonNextStep();
      case '1':
        $('.section[data-step=0] .surcontent').html('<span>' + $('#first-fn').val() + ' ' + $('#first-ln').val() + '</span><span>' + $('#first-email').val() + '</span>');
        $('#second-fn').val($('#first-fn').val());
        $('#second-ln').val($('#first-ln').val());
        watchField('#second-address', 'Continue to payment');
        return checkoutButtonNextStep();
      case '2':
        $('.section[data-step=1] .surcontent').html('<span>' + $('#second-fn').val() + ' ' + $('#second-ln').val() + '</span><span>' + $('#second-pn').val() + '</span>');
        watchField('#third-cc, #third-cvc', 'Continue to review');
        return checkoutButtonNextStep();
      case '3':
        if (!$('body').hasClass('desktop')) {
          $('.cartSummary').hide();
        }
        setTimeout((function() {
          return $('.nextStep').html('Complete your purchase').removeClass('btn-inactive');
        }), 320);
        return checkoutButtonNextStep();
    }
  };

  initCheckoutButton = function() {
    return changeStep();
  };

  getUrlParameter = function(sParam) {
    var i, sPageURL, sParameterName, sURLVariables;
    sPageURL = decodeURIComponent(window.location.search.substring(1));
    sURLVariables = sPageURL.split('&');
    sParameterName = void 0;
    i = void 0;
    i = 0;
    while (i < sURLVariables.length) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        if (sParameterName[1] === void 0) {
          return true;
        } else {
          return sParameterName[1];
        }
      }
      i++;
    }
  };

  initSurvey = function() {
    return $('.surveyOptions a').click(function() {
      if (!$('.surveyOptions').hasClass('active')) {
        $('.surveyOptions').addClass('active');
        $(this).parent().addClass('added');
        $(this).addClass('active');
        $(this).find('.label').html('Voted');
        return;
      }
    });
  };

  getProducts = function() {
    var pro, totalValue;
    pro = getUrlParameter('products');
    if (pro) {
      window.products = JSON.parse(pro);
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
        productRowTmpl += '<span>Qty. 1</span></div></div><div class="options"><div class="price">' + this.price + '</div></div></li>';
        return $('.productsCart').append(productRowTmpl);
      });
      $('.subtotalPrice').html('$' + (totalValue * 1).toFixed(2));
      $('.totalPrice').html('$' + (totalValue * 1.15).toFixed(2));
      return $('.taxes').html('$' + (totalValue * 0.15).toFixed(2));
    }
  };

  getInfos = function() {
    var haveInfos, infos;
    haveInfos = getUrlParameter('infos');
    if (haveInfos) {
      infos = eval('(' + haveInfos + ')');
      if (infos.email) {
        return $('span.emailReplace').html(infos.email);
      }
    }
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
    stickyBuyNow();
    return initSurvey();
  };

  initUI = function() {
    initCheckboxes();
    return initRadios();
  };

  initCheckout = function() {
    window.products = [];
    getProducts();
    initSections();
    return initCheckoutButton();
  };

  initConfirm = function() {
    window.products = [];
    getProducts();
    return getInfos();
  };

  $(document).ready(function() {
    initUI();
    if ($('body.checkout').length) {
      initCheckout();
    }
    if ($('body.confirm').length) {
      initNav();
      initConfirm();
    }
    if ($('body.pdp').length) {
      initNav();
      return initPDP();
    }
  });

}).call(this);
