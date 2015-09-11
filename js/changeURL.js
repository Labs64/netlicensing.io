$("a#load-features").on("click", function () {
    var $this = $(this);
    var $content = $this.parent().prev("div.content");
    var linkText = $this.text().toUpperCase();
    var url = $this.attr('href');
    console.log(url);

    if (linkText === "SHOW MORE FEATURES") {
        linkText = "Hide";
        url="/features-all";
        $content.switchClass("hideContent", "showContent", 1500);
    } else {
        linkText = "Show more features";
        url="/features"
        $content.switchClass("showContent", "hideContent", 1500);
    };

    $this.text(linkText);

    if (url != window.location) {
        window.history.pushState(null, null, url);
    }

    return false;
});

/*$(document).ready(function () {
    $('a#load-features').click(function () {
        var url = $(this).attr('href');
        var linkText = $(this).text().toUpperCase();

        if (linkText === "SHOW MORE FEATURES") {
            linkText = "Hide";
            $(this).text(linkText);
            $('#showContent').addClass("hideContent");
            $.ajax({
                url: url + '?ajax=1',
                success: function (data) {
                    $('#showContent').html(data);
                    $('#showContent').switchClass("hideContent", "showContent", 1500);
                }
            });
        } else {
            linkText = "Show more features";
            $(this).text(linkText);
            url = "/features";
            $('#showContent').switchClass("showContent", "hideContent", 1500);
            $.ajax({
                url: url + '?ajax=1',
                success: function (data) {
                    $('#showContent').html('');
                }
            });
        }

        if (url != window.location) {
            window.history.pushState(null, null, url);
        }

        return false;
    });

    $(window).bind('popstate', function () {
        $.ajax({
            url: "/features",
            success: function (data) {
                $('#showContent').html('');
            }
        });
    });
});*/
