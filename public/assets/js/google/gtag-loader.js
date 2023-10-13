function loadScript(src, callback) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

loadScript('public/assets/js/google/gtag.js', function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-WG6S6Z4TNZ');
});
