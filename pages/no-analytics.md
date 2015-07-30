---
layout: compress
permalink: "/no-analytics/"
---
<html>
<head>
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', '{{ site.google_analytics_tracking_id }}']);
        _gaq.push(['_trackPageview']);
        (function () {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        })();
    </script>
</head>
<body onLoad="javascript:_gaq.push(['_setVar', 'no-analytics']);">
<h1>Google Analytics cookie has been created!</h1>
<h4><a href="/">Back to website</a></h4>
</body>
</html>
