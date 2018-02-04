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
	$('body').addClass('fixed')
	# $('.c-overlay').removeClass 'isHidden'
	# $('.c-overlay').addClass 'isVisible'

closeOverlay = () ->
	$('body').removeClass('fixed')
	$('.c-overlay').removeClass 'isVisible'
	# $('.c-overlay').addClass 'isHidden'

showCart = () ->
	if $('.colorList li').hasClass('active')
		$('#navBag').click ->
			# updateCart()
			showOverlay()
			# $('.c-cart-wrapper').removeClass 'isHidden'
			$('.cartWrapper').addClass 'isVisible'

closeCart = () ->
	$('.u-btn__content').click ->
		closeOverlay()
		$('.cartWrapper').removeClass 'isVisible'
		# $('.c-cart-wrapper').addClass 'isHidden'

updateCartCount = (count) ->
	$('#bagCount .count').removeClass('have1 have2 have3 have4').addClass('have' + count).attr('data-count', count)
	$('.c-heading .count').html('(' + count + ')')

updateCart = (products) ->
	$('.productsCart').empty()
	$('nav.mobile').addClass('headroom--pinned').removeClass('headroom--unpinned')
	$('#navBag').addClass('adding')
	setTimeout ( ->
		updateCartCount(products.length)
		$('#navBag').removeClass('adding')
	), 640
	totalValue = 0
	$.each products, (index) ->
		oldVal = totalValue
		totalValue = ((oldVal * 1000) + (parseInt(@price.replace('$', '') * 1000))) / 1000
		productRowTmpl = '<li><div class="img"><img src="' + @img + '"></div><div class="data"><div class="title">' + @name + '</div><div class="infos"><span>' + @color + '</span><span>Size ' + @size + '</span><span>Qty. 1</span></div></div><div class="options"><div class="price">' + @price + '</div><a class="btnLink">Edit</a><a class="btnLink">Remove</a></div></li>'
		$('.productsCart').append productRowTmpl
	$('.totalPrice').html('$' + totalValue)

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
			setTimeout ( ->
				$('.btn.addToCart').addClass('added').html('Added! Open cart')
			), 640
			while i < products.length
				if products[i]['size'] == selectedSize and products[i]['color'] == color
					inArray = true
				i++

			if inArray
				showOverlay()
				# $('.c-cart-wrapper').removeClass 'isHidden'
				$('.cartWrapper').addClass 'isVisible'
			else
				addProduct({name: window.product.name, img: $('#mainImg').attr('src'), price: window.product.price, color: color, size: selectedSize, active: true })
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
				# $('.c-cart-wrapper').removeClass 'isHidden'
				$('.c-cart-wrapper').addClass 'isVisible'
			else
				addProduct({name: window.product.name, price: window.product.price, color: color, size: selectedSize, active: true })
		else
			$('html, body').animate { scrollTop: $('.colorList').position().top }, 1000


removeProduct = () ->
	$('body').on 'click', '.removeItem',  () ->
		log $(@).parent()
		$(@).parent().remove()
		updateCartCount($('#bagCount .count').attr('data-count') - 1)


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
		@mixMatchProduct = {img:$(this).attr('quick-image'), name: $(this).attr('quick-name'), price: $(this).attr('quick-price'), color: $(this).attr('quick-color'), size: $(this).attr('quick-size'), active: true }
		addToProductList(@mixMatchProduct, 1)

checkout = () ->
	$('.goToCheckout').click ->
		$('.c-cart-wrapper').removeClass 'isVisible'
		# $('.c-cart-wrapper').addClass 'isHidden'
		# $('.c-checkout__wrapper').removeClass 'isHidden'
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
	addToProductList()
	removeProduct()
	stickyBuyNow()

$(document).ready ->
	initNav()
	initPDP()
