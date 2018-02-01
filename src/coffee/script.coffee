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

colorSelector = () ->
	$('.colorList li').click ->
		$('.colorList li').each ->
			$(@).removeClass 'active'
		$(@).addClass 'active'
		$('.colorSelected').html($(@).text())
 
initPDP = () ->
	sizeSelector()
	colorSelector()

$(document).ready ->
	initNav()
	initPDP()
