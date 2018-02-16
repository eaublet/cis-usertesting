log = (msg) ->
	console.log(msg)

initReveal = () ->
	targetIn = '.revealSection'
	inView(targetIn).on('enter', (el) ->
		if $('.bigNumber').length
			unless $('.bigNumber').hasClass 'active'
				$('.bigNumber').addClass 'active'
				bigNumber = false
				num = $('.bigNumber').attr('data-number')
				n = 5
				t = 10
				inter = setInterval ( ->
					if num > n
						$('.bigNumber').html n
						n++
					else
						clearInterval(inter)
				), 20
		$(el).removeClass 'active'
	).on 'exit', (el) ->
		# el.removeClass 'active'
		return

initParalax = () ->
	$(window).scroll ->
		scrolledY = $(window).scrollTop()
		$('.paralax').css 'background-position', 'center ' + (scrolledY * -0.1) + 'px'
		return

initPanelNav = () ->
	$(document).mouseup (e) ->
		if $('.megaNav').hasClass 'active'
			container = $('.megaNav')
			if !container.is(e.target) and container.has(e.target).length == 0
				unless $('.navItem').is(e.target)
					hidePanel()
			return

	$('.megaNav').mouseleave (e) ->
		if $(@).hasClass 'active'
			hidePanel()

	$(window).scroll ->
		if $('.megaNav').hasClass 'active'
			hidePanel()
	$('.navItem').mouseenter ->
		unless $(@).hasClass 'active'
			panel = $(@).attr('data-panel')
			showMegaNav(panel)
			$(@).addClass 'active'
		else
			$(@).removeClass 'active'

hidePanel = () ->
	$('body').removeClass 'overlayed'
	$(@).removeClass 'active'
	$('.navpanel, .navItem').each ->
		$(@).removeClass 'active'
	$('.megaNav').addClass 'inactive'
	setTimeout (->
		$('.megaNav').removeClass 'active sale inactive'
	), 320

showMegaNav = (panel) ->
	$('body').addClass 'overlayed'
	$('.megaNav').removeClass 'men women sale'
	$('.megaNav').addClass 'active'
	$('.megaNav').addClass panel
	unless panel is $('.navpanel.active').attr('data-panel')
		$('.navpanel, .navItem').each ->
			$(@).removeClass 'active'
		setTimeout ( ->
			$('.navpanel[data-panel=' + panel + ']').addClass 'active'
		), 320



initBuySticky = () ->
	buySticky = $('.buySticky')
	targetIn = ".addToCart"
	pageTop = $(document).scrollTop()
	elemTop = $(targetIn).offset().top

	showSticky = () ->
		if $(document).scrollTop() >= $(targetIn).offset().top
			buySticky.addClass 'visible'
			$('nav.mobile, .navContent.desktop').addClass 'headroom--unpinned'
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
	$('nav.mobile, body.desktop.pdp .navContent').headroom
		tolerance:
			up: 5
			down: 10
		offset: 300 || $('.addToCart').offset().top
	if $('.buySticky').length
		initBuySticky()
	return

addToWishList = () ->
	$('.addToWishList').click ->
		totalFav = $('#fav .count').text()
		$(@).toggleClass 'added'
		if $(@).hasClass 'added'
			val = parseInt(totalFav) + 1
			$('#fav').find('.count').text(val)
		else
			val = parseInt(totalFav) - 1
			$('#fav').find('.count').text(totalFav - 1)

sizeSelector = () ->

	$('.sizeList li').click ->
		if !$(@).hasClass('disabled')
			if $(@).hasClass('active')
				$(@).removeClass 'active'
			else
				$('.sizeList li').each ->
					$(@).removeClass 'active'
				$(@).addClass 'active'
			$('.sizeSelected').html($(@).text())
			sizeSelectedVal = $(@).text()
			$(".size-selectbox option[selected=selected]").removeAttr("selected")
			$(".size-selectbox option[value='"+	sizeSelectedVal+"']").attr('selected', 'selected')
			$('.right > .btn-gradient').removeClass('added').find('.label').text('Add size ' + $(@).text() + ' to Cart')
			$('a.addToCart').removeClass('added').find('.label').html('Add to cart')


	$('.size-selectbox').change (e) ->
		sizeSelectedVal = e.target.value
		$(".size-selectbox option[selected=selected]").removeAttr("selected")
		$(".size-selectbox option[value='"+	sizeSelectedVal+"']").attr('selected', 'selected')
		# $(@).val(e.target.value)
		$('.sizeSelected').html(sizeSelectedVal)
		$('.sizeList li').each ->
			$(@).removeClass 'active'
			if $(@).text() == sizeSelectedVal
				$(@).addClass 'active'
		$('.sizeSelected').html(sizeSelectedVal)
		$('.right > .btn-gradient').removeClass('added').find('.label').text('Add to bag')
		$('a.addToCart').removeClass('added').find('.label').html('Add to cart')

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
	$(document).mouseup (e) ->
		if $('.cartWrapper').hasClass 'isVisible'
			if $('body').hasClass 'desktop'
				container = $('.cartWrapper')
				if !container.is(e.target) and container.has(e.target).length == 0
					closeOverlay()
					$('.cartWrapper').removeClass 'isVisible'
				return
	# $(document).mouseup (e) ->
	# 	if $('.cartWrapper').hasClass 'isVisible'
	# 		closeOverlay()
	# 		$('.cartWrapper').removeClass 'isVisible'
	$('.u-btn__content').click ->
		closeOverlay()
		$('.cartWrapper').removeClass 'isVisible'
		# $('.cartWrapper').addClass 'isHidden'

updateCartCount = (count) ->
	$('#bagCount .count').removeClass('have1 have2 have3 have4').addClass('have' + count).attr('data-count', count)
	$('.c-heading .count').html('(' + count + ')')

updateCart = (products) ->
	$('.productsCart').empty()
	$('nav.mobile, .desktop.navContent').addClass('headroom--pinned').removeClass('headroom--unpinned')
	$('#navBag').addClass('adding')
	setTimeout ( ->
		updateCartCount(products.length)
		$('#navBag').removeClass('adding')
	), 1300
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
		if $('body').hasClass 'desktop'
			$(@).attr('href', 'checkoutDesktop.html?products=' + JSON.stringify(products)).click()
			return
		else
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
		unless $('body').hasClass 'desktop'
			$(@).parent().find('.radio').each ->
				$(@).removeClass 'checked'
			$(@).toggleClass 'checked'
		else
			$(@).parent().parent().find('.radio').each ->
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
		# $('.nextStep').html(nextLabel)
		log(toValidate)
		for i in elements
			$(i).on 'focus', ->
				toValidate--
				log(toValidate)
				if toValidate is 0
					setTimeout (->
						$('.nextStep').removeClass 'btn-inactive isHidden', {duration:500}
						$('.section.inactive').first().find('h2').animate {opacity: 0.25}, 500
					), 500
	else
		$('.nextStep').html(nextLabel).removeClass('isHidden')

checkoutButtonNextStep = (thisStep) ->
	maxStep = '3'
	$('.nextStep').click ->
		if $('.nextStep').hasClass 'btn-inactive isHidden'
			return
		else
			# thisStep = $(@).attr('data-current-step')
			nextStep = parseInt(thisStep) + 1
			log(thisStep == maxStep)
			if parseInt(thisStep) == parseInt(maxStep)
				if $('body').hasClass 'desktop'
					$('.nextStep[data-current-step=' + thisStep + ']').attr('href', '/confirmDesktop.html?products=' + JSON.stringify(products) + '&infos={email:"' + $('#first-email').val() + '", name:"' + $('#first-fn').val() + ' ' + $('#first-ln').val() + '" }')
				else
					$('.nextStep[data-current-step=' + thisStep + ']').attr('href', '/confirm.html?products=' + JSON.stringify(products) + '&infos={email:"' + $('#first-email').val() + '"}')
				$('.nextStep[data-current-step=' + thisStep + ']').click()
				return
			else
				$('.section[data-step=' + thisStep + ']').addClass 'filled inactive'
				thisStep++
				$('.section[data-step=' + nextStep + ']').removeClass('filled inactive').addClass 'active'
				setTimeout (-> $('html, body').animate { scrollTop: ($('.section[data-step=' + nextStep + ']').position().top - $('nav').outerHeight()) }, 640), 640
				# $(@).attr('data-current-step', thisStep).addClass('btn-inactive isHidden')
				$('.btn[data-current-step=' + nextStep + ']').addClass('btn-inactive isHidden')
				changeStep(nextStep)

changeStep = (step = 0) ->
	switch step
		when 0
			watchField('#first-fn,#first-ln,#first-email', 'Continue to shipping')
			checkoutButtonNextStep(step)
		when 1
			$('.section[data-step=0] .surcontent .name').text($('#first-fn').val() + ' ' + $('#first-ln').val())
			$('.section[data-step=0] .surcontent .email').text($('#first-email').val())
			$('#second-fn').val($('#first-fn').val())
			$('#second-ln').val($('#first-ln').val())
			$('.address span.name').html($('#first-fn').val() + ' ' + $('#first-ln').val())
			watchField('#second-address', 'Continue to payment')
			checkoutButtonNextStep(step)
		when 2
			$('.section[data-step=1] .surcontent .name').text($('#first-fn').val() + ' ' + $('#first-ln').val())
			watchField('#third-cc', 'Continue to review')
			checkoutButtonNextStep(step)
		when 3
			unless $('body').hasClass 'desktop'
				$('.cartSummary').hide()
			setTimeout ( -> $('.nextStep[data-current-step=3]').html('Complete your purchase').removeClass('btn-inactive isHidden') ), 320
			checkoutButtonNextStep(JSON.stringify(step))
		else

initCheckoutButton = () ->
	changeStep(0)
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
		if infos.name
			$('span.name').html(infos.name)

initPDP = () ->
	window.products = []
	window.product = {name: $('h1.productName').text(), price: $('p.price').first().text(), active: false}
	# window.activeSize = 0
	sizeSelector()
	# colorSelector()
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
	addToWishList()
	scrollTop()
	showUtility()
	# initTabs()

showUtility = () ->
	$(window).scroll ->
		scrolledY = $(window).scrollTop()
		if scrolledY > 900
			$('.scrollToTop').removeClass 'isHidden'
		else
			$('.scrollToTop').addClass 'isHidden'

checkAddress = () ->
	$('#second-address').keyup (event) ->
		if $('#second-address').val().length > 2
			$('.hidden-address').addClass 'active'

scrollTop = () ->
	$('.scrollToTop').click () ->
    $("html, body").animate({ scrollTop: 0 }, 600)
    return false

checkCC = () ->
	$('#third-cc').keyup (event) ->
		if $('#third-cc').val().length > 0
			$('#third-cc').val('4111 1111 1111 1111')
			$('.img.cc img:first-child').addClass 'inactive'
			$('#third-exp').val('08/22')
			$('#third-cvc').val('321')

initCheckout = () ->
	window.products = []
	getProducts()
	initSections()
	initCheckoutButton()
	checkAddress()
	checkCC()

initConfirm = () ->
	window.products = []
	getProducts()
	getInfos()

$(document).ready ->
	initUI()
	$('.surnav').dblclick ->
		window.location = './'
	$('.desktop .brand').click ->
		window.location = './homepage.html'
	if $('body.desktop').length
		if $('.plp.hidden').length
			$('#loadMore').click ->
				$('.plp.hidden').removeClass 'hidden'
		initPanelNav()
	if $('body.checkout').length
		initCheckout()
	if $('body.confirm').length
		initNav()
		initConfirm()
	if $('body.pdp').length
		initNav()
		initPDP()
	if $('body.nav').length
		initNav()
	if $('.revealSection').length
		initReveal()
	if $('.paralax').length
		initParalax()
