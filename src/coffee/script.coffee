log = (msg) ->
	console.log(msg)

initBuySticky = () ->
	buySticky = $('.buySticky')
	targetIn = ".addToCart"
	pageTop = $(document).scrollTop()
	elemTop = $(targetIn).offset().top

	showSticky = () ->
		if $(document).scrollTop() >= $(targetIn).offset().top
			buySticky.addClass 'visible'
	hideSticky = () ->
		buySticky.removeClass 'visible'

	if elemTop <= pageTop
		showSticky()

	if buySticky.length
		inView(targetIn).on('enter', (el) ->
			hideSticky()
		).on 'exit', (el) ->
			showSticky()
			return

initNav = () ->
	$('nav.mobile').headroom
		tolerance:
			up: 5
			down: 10
		offset: ($('.surnav.mobile').outerHeight() || 0 ) + $('nav.mobile').outerHeight()
	initBuySticky()
	return


sizeSelector = () ->
	$('.sizeList li').click ->
		$('.sizeList li').each ->
			$(@).removeClass 'active'
		$(@).addClass 'active'
		$('.sizeSelected').html($(@).text())
		window.product.size = $(@).text()

colorSelector = () ->
	$('.colorList li').click ->
		$('.colorList li').each ->
			$(@).removeClass 'active'
		$(@).addClass 'active'
		$('.colorSelected').html($(@).text())
		window.product.color = $(@).text()

showOverlay = () ->
	$('.c-overlay').removeClass 'isHidden'
	$('.c-overlay').addClass 'isVisible'

closeOverlay = () ->
	$('.c-overlay').removeClass 'isVisible'
	$('.c-overlay').addClass 'isHidden'

showCart = () ->
	if $('.colorList li').hasClass('active')
		$('#navBag').click ->
			updateCart()
			showOverlay()
			$('.c-cart-wrapper').removeClass 'isHidden'
			$('.c-cart-wrapper').addClass 'isVisible'

closeCart = () ->
	$('.o-close-button').click ->
		closeOverlay()
		$('.c-cart-wrapper').removeClass 'isVisible'
		$('.c-cart-wrapper').addClass 'isHidden'

updateCart = () ->
	productName = $('h1.productName').text()
	productPrice = $('p.price').first().text()
	$('[data-id="product-name"]').text(productName)
	$('[data-qa-id="cart-summary-subtotal-value"]').text(productPrice)
	$('[data-qa-id="product-final-price"]').text(productPrice)
	$('[data-qa-id="product-size"').text('Size ' + product.size)
	$('[data-qa-id="product-style"]').text(product.color)


addToCart = () ->
	if $('.colorList li').hasClass('active')
		$('.btn.addToCart').click ->
			updateCart()

checkout = () ->
	$('.goToCheckout').click ->
		$('.c-cart-wrapper').removeClass 'isVisible'
		$('.c-cart-wrapper').addClass 'isHidden'
		$('.c-checkout__wrapper').removeClass 'isHidden'
		$('.c-checkout__wrapper').addClass 'isVisible'



initPDP = () ->
	window.product = {}
	sizeSelector()
	colorSelector()
	showCart()
	closeCart()
	addToCart()
	checkout()

$(document).ready ->
	initNav()
	initPDP()
