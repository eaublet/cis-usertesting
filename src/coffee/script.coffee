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
		$('.right > .btn-gradient').text('Add to Cart')
		# window.product.size = $(@).text()

colorSelector = () ->
	$('.colorList li').click ->
		$('.colorList li').each ->
			$(@).removeClass 'active'
		$(@).addClass 'active'
		$('.colorSelected').html($(@).text())
		# window.product.color = $(@).text()

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
		productRowTmpl = $('<div>').addClass('whoWrap').attr('data-index', index).html('<div>' + @name + '</div><div>' + @price + '</div><div>' + @color + '</div><div>Size ' + @size + '</div><div class="removeItem">Remove</div>')
		$('#dir').append productRowTmpl
		return

addToCart = () ->
	$('.btn.addToCart').on 'click', (e) ->
		log('Click fired')
		e.stopPropagation()
		e.preventDefault()
		if $('.sizeList li').hasClass('active')
			product = {}
			selectedSize = parseFloat($('.sizeList li.active').text())
			color = if typeof(product.color) == 'undefined' then $('.colorList li.active').text() else product.color
			addProduct = (product) ->
				addToProductList(product)

			inArray = false
			i = 0
			while i < products.length
				if products[i]['size'] == selectedSize and products[i]['color'] == color
					inArray = true
				i++

			if inArray
				showOverlay()
				$('.c-cart-wrapper').removeClass 'isHidden'
				$('.c-cart-wrapper').addClass 'isVisible'
			else
				addProduct({name: window.product.name, price: window.product.price, color: color, size: selectedSize, active: true })
		else
			alert('Select a size first')

stickyBuyNow = () ->
	$('.right > .btn-gradient').on 'click', () ->
		if $('.sizeList li').hasClass('active')
			product = {}
			selectedSize = parseFloat($('.sizeList li.active').text())
			color = if typeof(product.color) == 'undefined' then $('.colorList li.active').text() else product.color
			addProduct = (product) ->
				addToProductList(product)

			inArray = false
			i = 0
			while i < products.length
				if products[i]['size'] == selectedSize and products[i]['color'] == color
					inArray = true
				i++

			if inArray
				showOverlay()
				$('.c-cart-wrapper').removeClass 'isHidden'
				$('.c-cart-wrapper').addClass 'isVisible'
			else
				addProduct({name: window.product.name, price: window.product.price, color: color, size: selectedSize, active: true })
		else
			$('html, body').animate { scrollTop: $('.colorList').position().top }, 1000


removeProduct = () ->
	$('body').on 'click', '.removeItem',  () ->
		log $(@).parent()
		$(@).parent().remove()


addToProductList = (product) ->
	if product and product.active == true
		products.push(product)
		log('Product ' + product.name + ' added to Cart')
		updateCart(products)
		log('Cart updated')
	else
		console.log('Cart initialized')


quickAddToCart = () ->
	$('.btn.quickAddToCart').click ->
		@mixMatchProduct = {name: 'Ramaswamy', price: '49.99$', color: 'black', size: 'one size', active: true }
		addToProductList(@mixMatchProduct, 1)

checkout = () ->
	$('.goToCheckout').click ->
		$('.c-cart-wrapper').removeClass 'isVisible'
		$('.c-cart-wrapper').addClass 'isHidden'
		$('.c-checkout__wrapper').removeClass 'isHidden'
		$('.c-checkout__wrapper').addClass 'isVisible'


initPDP = () ->
	window.products = []
	window.product = {name: $('h1.productName').text(), price: $('p.price').first().text(), active: false}
	# window.activeSize = 0
	sizeSelector()
	colorSelector()
	showCart()
	closeCart()
	addToCart()
	checkout()
	quickAddToCart()
<<<<<<< HEAD
	# addToProductList()
=======
	addToProductList()
	removeProduct()
	stickyBuyNow()
>>>>>>> 1213f0a840a61e0f917f069c1b0935ee065b0a76

$(document).ready ->
	initNav()
	initPDP()
