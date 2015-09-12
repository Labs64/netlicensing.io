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
