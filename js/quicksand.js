$(document).ready(function() {

  var $filterType = $('#filterOptions li.active a').attr('class');
  var $holder = $('ul.NL_licensing_models');
  var $data = $holder.clone();

	$('#filterOptions li a').click(function(e) {
		$('#filterOptions li').removeClass('active');
		var $filterType = $(this).attr('id');
		$(this).parent().addClass('active');
		
		if ($filterType == 'all') {
			var $filteredData = $data.find('li');
		} 
		else {
			var $filteredData = $data.find('li[data-type~=' + $filterType  + ']');
		}
		
		$holder.quicksand($filteredData, {
			duration: 800,
			easing: 'easeInOutQuad'
		});
		return false;
	});
});