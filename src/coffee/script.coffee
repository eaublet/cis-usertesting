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
	$('.megaNav').removeClass 'active sale inactive'

showMegaNav = (panel) ->
	$('body').addClass 'overlayed'
	$('.megaNav').removeClass 'men women sale'
	$('.megaNav').addClass 'active'
	$('.megaNav').addClass panel
	unless panel is $('.navpanel.active').attr('data-panel')
		$('.navpanel, .navItem').each ->
			$(@).removeClass 'active'
		$('.navpanel[data-panel=' + panel + ']').addClass 'active'



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
		$(@).parent().toggleClass 'added'
		if $(@).parent().hasClass 'added'
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
			$('a.addToCart').removeClass('added').find('.label').html('Add to bag')


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
	), 1000
	setTimeout ( ->
		$('#navBag').removeClass('adding')
	), 2300
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
		$('.btn.addToCart').addClass('added').find('.label').html('Added! Open bag')
		$('.right > .btn-gradient').addClass('added').find('.label').html('Added! Open bag')
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

window.goto = (link) ->
	window.location = link || '/';

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
	$(el).keyup (event) ->
		if $(el).val().length > 0
			log($('.nextStep'))
			setTimeout (->
				$('.nextStep').removeClass('isHidden')
				$('a.btn').removeClass('btn-inactive')
				$('.nextStep-wrapper.isHidden').removeClass('isHidden').addClass('transition')
				setTimeout (->
					$('.nextStep-wrapper').removeClass('transition')
				), 100
			), 500
	# console.log(el.split(','))
	# unless el is false
	# 	elements = el.split(',')
	# 	toValidate = elements.length
	# 	nextSection = $('.section.inactive').first()
	# 	nextStepIndex = parseInt($('.section.inactive').first().data('step'))
	# 	log(toValidate)
	# 	for i in elements
	# 		$(i).on 'focus', ->
	# 			toValidate--
	# 			if toValidate is 0
	# 				log($('.nextStep'))
	# 				setTimeout (->
	# 					$('.nextStep').removeClass('isHidden')
	# 					$('a.btn').removeClass('btn-inactive')
	# 					$('.nextStep-wrapper.isHidden').removeClass('isHidden').addClass('transition')
	# 					setTimeout (->
	# 						$('.nextStep-wrapper').removeClass('transition')
	# 					), 100
	# 				), 500
	# else
	# 	nextSection.css {overflow: 'visible'; display: 'block';}
	# 	$('.nextStep').html(nextLabel).removeClass('isHidden')

checkoutButtonNextStep = ->
	maxStep = '3'
	$('.nextStep').unbind('click').click ->
		# if $(@).hasClass 'isHidden'
		# 	return
		# else
		thisStep = $(@).attr('data-current-step')
		mobileScrollStep = [0, 235, 430, 622]
		desktopScrollStep = [0, 315, 538, 639]
		elAnchor = if $('body').hasClass('desktop') then $('#checkout') else $('body')
		step = if $('body').hasClass('desktop') then desktopScrollStep[parseInt(thisStep) + 1] else mobileScrollStep[parseInt(thisStep) + 1]
		if thisStep == maxStep
			if $('body').hasClass 'desktop'
				$('.nextStep[data-current-step=' + thisStep + ']').attr('href', '/confirmDesktop.html?products=' + JSON.stringify(products) + '&infos={email:"' + $('#first-email').val() + '", name:"' + $('#first-fn').val() + ' ' + $('#first-ln').val() + '" }')
			else
				$('.nextStep[data-current-step=' + thisStep + ']').attr('href', '/confirm.html?products=' + JSON.stringify(products) + '&infos={email:"' + $('#first-email').val() + '"}')
			$('.nextStep[data-current-step=' + thisStep + ']').click()
			return
		else

			$('.section[data-step=' + thisStep + ']').addClass 'filled inactive'
			thisStep++
			$('.section[data-step=' + thisStep + ']').removeClass('filled inactive').addClass 'active'
			# setTimeout (->
			# 	console.log('ujyjh')
			# 	$('.sideLeft').animate { scrollTop: ($('.section[data-step=' + thisStep + ']').position().top - $('nav').outerHeight()) }, 1640
			# ), 3640
			# $(@).attr('data-current-step', thisStep).addClass('btn-inactive isHidden')
			# console.log($('.section[data-step=' + thisStep + ']').offset().top)
			# elAnchor.animate {scrollTop: ($('.section[data-step=' + thisStep + ']').offset().top - $('.section[data-step=' + thisStep + ']').outerHeight()) }, 1000
			elAnchor.scrollTo '.section[data-step=' + (thisStep - 1) + '] h5', 800, offset: ->
				{
					margin: true,
					top: ($('nav').outerHeight() * -1) - 20
				}
			# setTimeout ( ->
			# 	elAnchor.scrollTo '.section[data-step=' + thisStep + '] .eyeBrow', 640, offset: ->
			# 		{
			# 			margin: true,
			# 			top: ($('nav').outerHeight() * -1) - 20
			# 		}
			# ), 640
			$('.btn[data-current-step=' + thisStep + ']').addClass('btn-inactive isHidden')
			changeStep()

changeStep = ->
	switch $('.nextStep.isHidden').attr('data-current-step')
		when '0'
			watchField('#first-email', 'Continue to shipping')
			checkoutButtonNextStep()
		when '1'
			$('.section[data-step=0] .surcontent .name').text($('#first-fn').val() + ' ' + $('#first-ln').val())
			$('.section[data-step=0] .surcontent .email').text($('#first-email').val())
			$('#second-fn').val($('#first-fn').val())
			$('#second-ln').val($('#first-ln').val())
			$('.address span.name').html($('#first-fn').val() + ' ' + $('#first-ln').val())
			watchField('#second-address', 'Continue to payment')
			checkoutButtonNextStep()
		when '2'
			$('.section[data-step=1] .surcontent .name').text($('#first-fn').val() + ' ' + $('#first-ln').val())
			watchField('#third-cc', 'Continue to review')
			checkoutButtonNextStep()
		when '3'
			unless $('body').hasClass 'desktop'
				$('.cartSummary').hide()
			setTimeout ( -> $('.nextStep[data-current-step=3]').html('Complete your purchase').removeClass('btn-inactive isHidden') ), 320
			checkoutButtonNextStep()
		else

initCheckoutButton = ->
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
		if infos.name
			$('span.name').html(infos.name)


toggleAvB = () ->
	$('.avb').click (e) ->
		if $(e.target).hasClass('disabled')
			return
		$(e.target).addClass('disabled')
		if $(e.target).hasClass('option-a')
			setTimeout (->
				$('.result-a').removeClass('isHidden')
			), 250
		else
			setTimeout (->
				$('.result-b').removeClass('isHidden')
			), 250



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
	toggleAvB()
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
	$('#openFilters').click ->
		$('body').addClass 'overlayed'
		$('.filterPanel').addClass 'active'
	$('.filterPanel .close').click ->
		$('body').removeClass 'overlayed'
		$('.filterPanel').removeClass 'active'
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
