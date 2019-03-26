function showTips(text){
		$('body').append('<div class="Tips">'+ text +'</div>')
		if($('.Tips').css('display')=='none'){
			$('.Tips').stop(true).fadeIn();
			setTimeout(function(){
				$('.Tips').fadeOut();
				$('.Tips').remove();
			},1500);
		}
	}