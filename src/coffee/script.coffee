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
			# updateCart()
			showOverlay()
			$('.c-cart-wrapper').removeClass 'isHidden'
			$('.c-cart-wrapper').addClass 'isVisible'

closeCart = () ->
	$('.o-close-button').click ->
		closeOverlay()
		$('.c-cart-wrapper').removeClass 'isVisible'
		$('.c-cart-wrapper').addClass 'isHidden'

updateCart = (products) ->
	$('#dir').empty()
	$('#bagCount').empty().html(products.length)
	$.each products, (index) ->
		$('#dir').append $('<div>').addClass('whoWrap').text(@name)
		$('#dir').append $('<div>').addClass('whoWrap').text(@price)
		$('#dir').append $('<div>').addClass('whoWrap').text('Color: ' + @color)
		$('#dir').append $('<div>').addClass('whoWrap').text('Size: ' + @size)
		return

addToCart = () ->
	if $('.colorList li').hasClass('active')
		$('.btn.addToCart').click ->
			products[0] = {}
			color = if typeof(product.color) == 'undefined' then $('.colorList li.active').text() else product.color
			@product = {name: $('h1.productName').text(), price: $('p.price').first().text(), color, size: product.size }
			addToProductList(@product , 0)

addToProductList = (product, index) ->
	products.splice(index, 1, product)
	log('Product ' + product.name + ' added to Cart')
	updateCart(window.products)
	log('Cart updated')

quickAddToCart = () ->
	$('.btn.quickAddToCart').click ->
		@mixMatchProduct = {name: 'Ramaswamy', price: '49.99$', color: 'black', size: 'one size' }
		addToProductList(@mixMatchProduct, 1)

checkout = () ->
	$('.goToCheckout').click ->
		$('.c-cart-wrapper').removeClass 'isVisible'
		$('.c-cart-wrapper').addClass 'isHidden'
		$('.c-checkout__wrapper').removeClass 'isHidden'
		$('.c-checkout__wrapper').addClass 'isVisible'


initPDP = () ->
	window.products = []
	window.product = {}
	sizeSelector()
	colorSelector()
	showCart()
	closeCart()
	addToCart()
	checkout()
	quickAddToCart()
	# addToProductList()

$(document).ready ->
	initNav()
	initPDP()
