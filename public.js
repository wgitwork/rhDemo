$.ajax({
	url:'message.html',
	cache : true,
	async : false,
	success : function(html) {
		$(".header").html(html);
	}
})