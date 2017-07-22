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

$("a#load-features").on("click", function () {
    var $this = $(this);
    var $content = $this.parent().prev("div.content");
    var linkText = $this.text().toUpperCase();
    var url = $this.attr('href');
    console.log(url);

    if (linkText === "SHOW MORE FEATURES") {
        linkText = "Hide";
        url = "/features-all";
        $content.switchClass("hideContent", "showContent", 1500);
    } else {
        linkText = "Show more features";
        url = "/features"
        $content.switchClass("showContent", "hideContent", 1500);
    }
    ;

    $this.text(linkText);

    if (url != window.location) {
        window.history.pushState(null, null, url);
    }

    return false;
});
