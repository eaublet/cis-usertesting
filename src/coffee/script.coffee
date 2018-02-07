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
	$(window).scroll (event) ->
		scroll = $(window).scrollTop()
		if scroll > 40
			$('.navContent').addClass 'reduced'
		if scroll < 40
			$('.navContent').removeClass 'reduced'
	$('nav.mobile, .navContent.desktop').headroom
		tolerance:
			up: 5
			down: 10
		offset: 300 || $('.sizeSelector').offset().top
	if $('.buySticky').length
		initBuySticky()
	return


sizeSelector = () ->
	$('.sizeList li').click ->
		$('.sizeList li').each ->
			$(@).removeClass 'active'
		$(@).addClass 'active'
		$('.sizeSelected').html($(@).text())
		$('.right > .btn-gradient').removeClass('added').find('.label').text('Add size ' + $(@).text() + ' to Cart')
		$('a.addToCart').removeClass('added').find('.label').html('Add to cart')
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
			# $('.cartWrapper').removeClass 'isHidden'
			$('.cartWrapper').addClass 'isVisible'

closeCart = () ->
	$('.u-btn__content').click ->
		closeOverlay()
		$('.cartWrapper').removeClass 'isVisible'
		# $('.cartWrapper').addClass 'isHidden'

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
		productRowTmpl = '<li data-id=' + @id + '><div class="img"><img src="' + @img + '"></div><div class="data"><div class="title">' + @name + '</div><div class="infos">'
		if @color
			productRowTmpl += '<span>' + @color + '</span>'
		if @size
			productRowTmpl += '<span>Size ' + @size + '</span>'
		productRowTmpl += '<span>Qty. 1</span></div></div><div class="options"><div class="price">' + @price + '</div><a class="btnLink">Edit</a><a class="btnLink removeItem">Remove</a></div></li>'
		$('.productsCart').append productRowTmpl
	$('.totalPrice').html('$' + totalValue)
setAdded = () ->
	setTimeout ( ->
		$('.btn.addToCart').addClass('added').find('.label').html('Added! Open cart')
		$('.right > .btn-gradient').addClass('added').find('.label').html('Added! Open cart')
	), 640
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
			setAdded()
			while i < products.length
				if products[i]['size'] == selectedSize and products[i]['color'] == color
					inArray = true
				i++
			if inArray
				showOverlay()
				# $('.cartWrapper').removeClass 'isHidden'
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
			setAdded()
			while i < products.length
				if products[i]['size'] == selectedSize and products[i]['color'] == color
					inArray = true
				i++

			if inArray
				showOverlay()
				# $('.cartWrapper').removeClass 'isHidden'
				$('.cartWrapper').addClass 'isVisible'
			else
				addProduct({name: window.product.name,img: $('#mainImg').attr('src'), price: window.product.price, color: color, size: selectedSize, active: true })
		else
			if $('nav.desktop').length
				$('html, body').animate { scrollTop: 0 }, 640
			else
				$('html, body').animate { scrollTop: $('.colorList').position().top }, 640


removeProduct = () ->
	$('body').on 'click touchstart', '.removeItem',  () ->
		log $(@).parent()
		thisId = $(@).parent().parent().attr('data-id')
		console.log(products)
		r = 0
		while r < products.length
			rId = products[r]['id']
			if JSON.stringify(rId) == thisId
				products.splice(r, 1)
				updateCart(products)
				return
			r++
		


addToProductList = (product) ->
	if product and product.active == true
		product.id = Math.random()
		products.push(product)
		log('Product ' + product.name + ' added to Cart')
		updateCart(products)
		log('Cart updated')
	else
		console.log('Cart initialized')


quickAddToCart = () ->
	$('.btn.quickAddToCart').click ->
		@mixMatchProduct = {img:$(this).attr('quick-image'), name: $(this).attr('quick-name'), price: $(this).attr('quick-price'), color: $(this).attr('quick-color') || undefined, size: $(this).attr('quick-size') || undefined, active: true }
		addToProductList(@mixMatchProduct, 1)

checkout = () ->
	$('.goToCheckout').click ->
		$(@).attr('href', 'checkout.html?products=' + JSON.stringify(products)).click()
		# $('.cartWrapper').removeClass 'isVisible'
		# $('.cartWrapper').addClass 'isHidden'
		# $('.c-checkout__wrapper').removeClass 'isHidden'
		# $('.c-checkout__wrapper').addClass 'isVisible'


initCheckboxes = () ->
	$('.check').click ->
		$(@).toggleClass 'checked'

initRadios = () ->
	$('.radio').click ->
		$(@).parent().find('.radio').each ->
			$(@).removeClass 'checked'
		$(@).toggleClass 'checked'

initTabs = () ->
	$('.tab').click ->
		console.log('tap')
		$(@).parent().find('.tab').each ->
			$(@).removeClass 'selected'
		$(@).toggleClass 'selected'
		container = $(@).attr('data-container')
		tab = $(@).attr('data-tab')
		$(container).removeClass('active')
		$(container + '[data-tab=' + tab + ']').addClass('active')
		
initSections = () ->
	$('.editSection').click ->
		$(@).parent().removeClass('inactive filled').addClass('active')
	# $('.section h2').click ->
	# 	if $(@).parent().hasClass 'active'
	# 		return
	# 	$(@).parent().removeClass('inactive filled').addClass('active')
	# 	$(@).parent().nextAll().removeClass('active').addClass('inactive')
	# 	$(@).parent().prevAll().removeClass('active').addClass('inactive filled')

watchField = (el, nextLabel) ->
	unless el is false
		elements = el.split(',')
		toValidate = elements.length
		$('.nextStep').html(nextLabel)
		for i in elements
			$(i).on 'focus', ->
				console.log('yeee')
				toValidate--
				if toValidate is 0
					$('.nextStep').removeClass('btn-inactive')
	else
		$('.nextStep').html(nextLabel).removeClass('btn-inactive')

checkoutButtonNextStep = () ->
	maxStep = '3'
	$('.nextStep').click ->
		if $('.nextStep').hasClass 'btn-inactive'
			return
		else
			thisStep = $(@).attr('data-current-step')
			if JSON.stringify(thisStep) is JSON.stringify(maxStep)
				$('.nextStep').attr('href', '/confirm.html?products=' + JSON.stringify(products) + '&infos={email:' + $('#first-email').val() + '}')
				$('.nextStep').click()
				return
			$('.section[data-step=' + thisStep + ']').addClass 'filled inactive'
			thisStep++
			$('.section[data-step=' + thisStep + ']').removeClass('filled inactive').addClass 'active'
			setTimeout (-> $('html, body').animate { scrollTop: ($('.section[data-step=' + thisStep + ']').position().top - $('nav').outerHeight()) }, 640), 640
			$(@).attr('data-current-step', thisStep).addClass('btn-inactive')
			changeStep()
				
changeStep = () ->
	switch $('.nextStep').attr('data-current-step')
		when '0'
			watchField('#first-fn,#first-ln,#first-email', 'Continue to shipping')
			checkoutButtonNextStep()
		when '1'
			$('.section[data-step=0] .surcontent').html('<span>' + $('#first-fn').val() + ' ' + $('#first-ln').val() + '</span><span>' + $('#first-email').val() + '</span>')
			$('#second-fn').val($('#first-fn').val())
			$('#second-ln').val($('#first-ln').val())
			watchField('#second-address', 'Continue to payment')
			checkoutButtonNextStep()
		when '2'
			$('.section[data-step=1] .surcontent').html('<span>' + $('#second-fn').val() + ' ' + $('#second-ln').val() + '</span><span>' + $('#second-pn').val() + '</span>')
			watchField('#third-cc, #third-cvc', 'Continue to review')
			checkoutButtonNextStep()
		when '3'
			$('.cartSummary').hide()
			setTimeout ( -> $('.nextStep').html('Complete your purchase').removeClass('btn-inactive') ), 320
			checkoutButtonNextStep()
		else

initCheckoutButton = () ->
	changeStep()
	# checkoutButtonNextStep('#second-address', 'Continue to payment')

getUrlParameter = (sParam) ->
	sPageURL = decodeURIComponent(window.location.search.substring(1))
	sURLVariables = sPageURL.split('&')
	sParameterName = undefined
	i = undefined
	i = 0
	while i < sURLVariables.length
		sParameterName = sURLVariables[i].split('=')
		if sParameterName[0] == sParam
			return if sParameterName[1] == undefined then true else sParameterName[1]
		i++
	return

initSurvey = () ->
	$('.surveyOptions a').click ->
		unless $('.surveyOptions').hasClass 'active'
			$('.surveyOptions').addClass 'active'
			$(@).parent().addClass 'added'
			$(@).addClass 'active'
			$(@).find('.label').html 'Voted'
			return
		return

getProducts = () ->
	pro = getUrlParameter('products');
	if pro
		window.products = JSON.parse(pro)
		totalValue = 0
		$.each products, (index) ->
			oldVal = totalValue
			totalValue = ((oldVal * 1000) + (parseInt(@price.replace('$', '') * 1000))) / 1000
			productRowTmpl = '<li data-id=' + @id + '><div class="img"><img src="' + @img + '"></div><div class="data"><div class="title">' + @name + '</div><div class="infos">'
			if @color
				productRowTmpl += '<span>' + @color + '</span>'
			if @size
				productRowTmpl += '<span>Size ' + @size + '</span>'
			productRowTmpl += '<span>Qty. 1</span></div></div><div class="options"><div class="price">' + @price + '</div></div></li>'
			$('.productsCart').append productRowTmpl
		$('.subtotalPrice').html('$' + (totalValue * 1).toFixed(2))
		$('.totalPrice').html('$' + (totalValue * 1.15).toFixed(2))
		$('.taxes').html('$' + (totalValue * 0.15).toFixed(2))

getInfos = () ->
	haveInfos = getUrlParameter('infos')
	if haveInfos
		infos = eval('(' + haveInfos + ')')
		if infos.email
			$('span.emailReplace').html(infos.email)

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
	initSurvey()

initUI = () ->
	initCheckboxes()
	initRadios()
	# initTabs()

initCheckout = () ->
	window.products = []
	getProducts()
	initSections()
	initCheckoutButton()

initConfirm = () ->
	window.products = []
	getProducts()
	getInfos()

$(document).ready ->
	initUI()
	if $('body.checkout').length
		initCheckout()
	if $('body.confirm').length
		initNav()
		initConfirm()
	if $('body.pdp').length
		initNav()
		initPDP()
