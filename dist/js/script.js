(function() {
  var addToCart, addToProductList, addToWishList, changeStep, checkAddress, checkCC, checkout, checkoutButtonNextStep, closeCart, closeOverlay, colorSelector, getInfos, getProducts, getUrlParameter, hidePanel, initBuySticky, initCheckboxes, initCheckout, initCheckoutButton, initConfirm, initNav, initPDP, initPanelNav, initParalax, initRadios, initReveal, initSections, initSurvey, initTabs, initUI, log, quickAddToCart, removeProduct, scrollTop, setAdded, showCart, showMegaNav, showOverlay, showUtility, sizeSelector, stickyBuyNow, updateCart, updateCartCount, watchField;

  log = function(msg) {
    return console.log(msg);
  };

  initReveal = function() {
    var targetIn;
    targetIn = '.revealSection';
    return inView(targetIn).on('enter', function(el) {
      var bigNumber, inter, n, num, t;
      if ($('.bigNumber').length) {
        if (!$('.bigNumber').hasClass('active')) {
          $('.bigNumber').addClass('active');
          bigNumber = false;
          num = $('.bigNumber').attr('data-number');
          n = 5;
          t = 10;
          inter = setInterval((function() {
            if (num > n) {
              $('.bigNumber').html(n);
              return n++;
            } else {
              return clearInterval(inter);
            }
          }), 20);
        }
      }
      return $(el).removeClass('active');
    }).on('exit', function(el) {});
  };

  initParalax = function() {
    return $(window).scroll(function() {
      var scrolledY;
      scrolledY = $(window).scrollTop();
      $('.paralax').css('background-position', 'center ' + (scrolledY * -0.1) + 'px');
    });
  };

  initPanelNav = function() {
    $(document).mouseup(function(e) {
      var container;
      if ($('.megaNav').hasClass('active')) {
        container = $('.megaNav');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if (!$('.navItem').is(e.target)) {
            hidePanel();
          }
        }
      }
    });
    $('.megaNav').mouseleave(function(e) {
      if ($(this).hasClass('active')) {
        return hidePanel();
      }
    });
    $(window).scroll(function() {
      if ($('.megaNav').hasClass('active')) {
        return hidePanel();
      }
    });
    return $('.navItem').mouseenter(function() {
      var panel;
      if (!$(this).hasClass('active')) {
        panel = $(this).attr('data-panel');
        showMegaNav(panel);
        return $(this).addClass('active');
      } else {
        return $(this).removeClass('active');
      }
    });
  };

  hidePanel = function() {
    $('body').removeClass('overlayed');
    $(this).removeClass('active');
    $('.navpanel, .navItem').each(function() {
      return $(this).removeClass('active');
    });
    $('.megaNav').addClass('inactive');
    return $('.megaNav').removeClass('active sale inactive');
  };

  showMegaNav = function(panel) {
    $('body').addClass('overlayed');
    $('.megaNav').removeClass('men women sale');
    $('.megaNav').addClass('active');
    $('.megaNav').addClass(panel);
    if (panel !== $('.navpanel.active').attr('data-panel')) {
      $('.navpanel, .navItem').each(function() {
        return $(this).removeClass('active');
      });
      return $('.navpanel[data-panel=' + panel + ']').addClass('active');
    }
  };

  initBuySticky = function() {
    var buySticky, elemTop, hideSticky, pageTop, showSticky, targetIn;
    buySticky = $('.buySticky');
    targetIn = ".addToCart";
    pageTop = $(document).scrollTop();
    elemTop = $(targetIn).offset().top;
    showSticky = function() {
      if ($(document).scrollTop() >= $(targetIn).offset().top) {
        buySticky.addClass('visible');
        return $('nav.mobile, .navContent.desktop').addClass('headroom--unpinned');
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
    $('nav.mobile, body.desktop.pdp .navContent').headroom({
      tolerance: {
        up: 5,
        down: 10
      },
      offset: 300 || $('.addToCart').offset().top
    });
    if ($('.buySticky').length) {
      initBuySticky();
    }
  };

  addToWishList = function() {
    return $('.addToWishList').click(function() {
      var totalFav, val;
      totalFav = $('#fav .count').text();
      $(this).parent().toggleClass('added');
      if ($(this).parent().hasClass('added')) {
        val = parseInt(totalFav) + 1;
        return $('#fav').find('.count').text(val);
      } else {
        val = parseInt(totalFav) - 1;
        return $('#fav').find('.count').text(totalFav - 1);
      }
    });
  };

  sizeSelector = function() {
    $('.sizeList li').click(function() {
      var sizeSelectedVal;
      if (!$(this).hasClass('disabled')) {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
        } else {
          $('.sizeList li').each(function() {
            return $(this).removeClass('active');
          });
          $(this).addClass('active');
        }
        $('.sizeSelected').html($(this).text());
        sizeSelectedVal = $(this).text();
        $(".size-selectbox option[selected=selected]").removeAttr("selected");
        $(".size-selectbox option[value='" + sizeSelectedVal + "']").attr('selected', 'selected');
        $('.right > .btn-gradient').removeClass('added').find('.label').text('Add size ' + $(this).text() + ' to Cart');
        return $('a.addToCart').removeClass('added').find('.label').html('Add to cart');
      }
    });
    return $('.size-selectbox').change(function(e) {
      var sizeSelectedVal;
      sizeSelectedVal = e.target.value;
      $(".size-selectbox option[selected=selected]").removeAttr("selected");
      $(".size-selectbox option[value='" + sizeSelectedVal + "']").attr('selected', 'selected');
      $('.sizeSelected').html(sizeSelectedVal);
      $('.sizeList li').each(function() {
        $(this).removeClass('active');
        if ($(this).text() === sizeSelectedVal) {
          return $(this).addClass('active');
        }
      });
      $('.sizeSelected').html(sizeSelectedVal);
      $('.right > .btn-gradient').removeClass('added').find('.label').text('Add to bag');
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
    $(document).mouseup(function(e) {
      var container;
      if ($('.cartWrapper').hasClass('isVisible')) {
        if ($('body').hasClass('desktop')) {
          container = $('.cartWrapper');
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            closeOverlay();
            $('.cartWrapper').removeClass('isVisible');
          }
        }
      }
    });
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
    $('nav.mobile, .desktop.navContent').addClass('headroom--pinned').removeClass('headroom--unpinned');
    $('#navBag').addClass('adding');
    setTimeout((function() {
      return updateCartCount(products.length);
    }), 1000);
    setTimeout((function() {
      return $('#navBag').removeClass('adding');
    }), 2300);
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

  window.goto = function(link) {
    return window.location = link || '/';
  };

  initCheckboxes = function() {
    return $('.check').click(function() {
      return $(this).toggleClass('checked');
    });
  };

  initRadios = function() {
    return $('.radio').click(function() {
      if (!$('body').hasClass('desktop')) {
        $(this).parent().find('.radio').each(function() {
          return $(this).removeClass('checked');
        });
        return $(this).toggleClass('checked');
      } else {
        $(this).parent().parent().find('.radio').each(function() {
          return $(this).removeClass('checked');
        });
        return $(this).toggleClass('checked');
      }
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
    return $(el).keyup(function(event) {
      if ($(el).val().length > 0) {
        log($('.nextStep'));
        return setTimeout((function() {
          $('.nextStep').removeClass('isHidden');
          $('a.btn').removeClass('btn-inactive');
          $('.nextStep-wrapper.isHidden').removeClass('isHidden').addClass('transition');
          return setTimeout((function() {
            return $('.nextStep-wrapper').removeClass('transition');
          }), 100);
        }), 500);
      }
    });
  };

  checkoutButtonNextStep = function() {
    var maxStep;
    maxStep = '3';
    return $('.nextStep').unbind('click').click(function() {
      var desktopScrollStep, elAnchor, mobileScrollStep, step, thisStep;
      thisStep = $(this).attr('data-current-step');
      mobileScrollStep = [0, 235, 430, 622];
      desktopScrollStep = [0, 315, 538, 639];
      elAnchor = $('body').hasClass('desktop') ? $('#checkout') : $('body');
      step = $('body').hasClass('desktop') ? desktopScrollStep[parseInt(thisStep) + 1] : mobileScrollStep[parseInt(thisStep) + 1];
      if (thisStep === maxStep) {
        if ($('body').hasClass('desktop')) {
          $('.nextStep[data-current-step=' + thisStep + ']').attr('href', '/confirmDesktop.html?products=' + JSON.stringify(products) + '&infos={email:"' + $('#first-email').val() + '", name:"' + $('#first-fn').val() + ' ' + $('#first-ln').val() + '" }');
        } else {
          $('.nextStep[data-current-step=' + thisStep + ']').attr('href', '/confirm.html?products=' + JSON.stringify(products) + '&infos={email:"' + $('#first-email').val() + '"}');
        }
        $('.nextStep[data-current-step=' + thisStep + ']').click();
      } else {
        $('.section[data-step=' + thisStep + ']').addClass('filled inactive');
        thisStep++;
        $('.section[data-step=' + thisStep + ']').removeClass('filled inactive').addClass('active');
        elAnchor.animate({
          scrollTop: step
        });
        $('.btn[data-current-step=' + thisStep + ']').addClass('btn-inactive isHidden');
        return changeStep();
      }
    });
  };

  changeStep = function() {
    switch ($('.nextStep.isHidden').attr('data-current-step')) {
      case '0':
        watchField('#first-email', 'Continue to shipping');
        return checkoutButtonNextStep();
      case '1':
        $('.section[data-step=0] .surcontent .name').text($('#first-fn').val() + ' ' + $('#first-ln').val());
        $('.section[data-step=0] .surcontent .email').text($('#first-email').val());
        $('#second-fn').val($('#first-fn').val());
        $('#second-ln').val($('#first-ln').val());
        $('.address span.name').html($('#first-fn').val() + ' ' + $('#first-ln').val());
        watchField('#second-address', 'Continue to payment');
        return checkoutButtonNextStep();
      case '2':
        $('.section[data-step=1] .surcontent .name').text($('#first-fn').val() + ' ' + $('#first-ln').val());
        watchField('#third-cc', 'Continue to review');
        return checkoutButtonNextStep();
      case '3':
        if (!$('body').hasClass('desktop')) {
          $('.cartSummary').hide();
        }
        setTimeout((function() {
          return $('.nextStep[data-current-step=3]').html('Complete your purchase').removeClass('btn-inactive isHidden');
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
        $('span.emailReplace').html(infos.email);
      }
      if (infos.name) {
        return $('span.name').html(infos.name);
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
    initRadios();
    addToWishList();
    scrollTop();
    return showUtility();
  };

  showUtility = function() {
    return $(window).scroll(function() {
      var scrolledY;
      scrolledY = $(window).scrollTop();
      if (scrolledY > 900) {
        return $('.scrollToTop').removeClass('isHidden');
      } else {
        return $('.scrollToTop').addClass('isHidden');
      }
    });
  };

  checkAddress = function() {
    return $('#second-address').keyup(function(event) {
      if ($('#second-address').val().length > 2) {
        return $('.hidden-address').addClass('active');
      }
    });
  };

  scrollTop = function() {
    return $('.scrollToTop').click(function() {
      $("html, body").animate({
        scrollTop: 0
      }, 600);
      return false;
    });
  };

  checkCC = function() {
    return $('#third-cc').keyup(function(event) {
      if ($('#third-cc').val().length > 0) {
        $('#third-cc').val('4111 1111 1111 1111');
        $('.img.cc img:first-child').addClass('inactive');
        $('#third-exp').val('08/22');
        return $('#third-cvc').val('321');
      }
    });
  };

  initCheckout = function() {
    window.products = [];
    getProducts();
    initSections();
    initCheckoutButton();
    checkAddress();
    return checkCC();
  };

  initConfirm = function() {
    window.products = [];
    getProducts();
    return getInfos();
  };

  $(document).ready(function() {
    $('#openFilters').click(function() {
      $('body').addClass('overlayed');
      return $('.filterPanel').addClass('active');
    });
    $('.filterPanel .close').click(function() {
      $('body').removeClass('overlayed');
      return $('.filterPanel').removeClass('active');
    });
    initUI();
    $('.surnav').dblclick(function() {
      return window.location = './';
    });
    $('.desktop .brand').click(function() {
      return window.location = './homepage.html';
    });
    if ($('body.desktop').length) {
      if ($('.plp.hidden').length) {
        $('#loadMore').click(function() {
          return $('.plp.hidden').removeClass('hidden');
        });
      }
      initPanelNav();
    }
    if ($('body.checkout').length) {
      initCheckout();
    }
    if ($('body.confirm').length) {
      initNav();
      initConfirm();
    }
    if ($('body.pdp').length) {
      initNav();
      initPDP();
    }
    if ($('body.nav').length) {
      initNav();
    }
    if ($('.revealSection').length) {
      initReveal();
    }
    if ($('.paralax').length) {
      return initParalax();
    }
  });

}).call(this);
