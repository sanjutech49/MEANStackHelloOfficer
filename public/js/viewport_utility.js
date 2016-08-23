$(function () {
    'use strict';
    var vpHeight;
    var vpWidth;
    var xsViewport = 768;
    var smViewport = 992;
    var mdViewport = 1200;

    //A very small viewport display utility : use <div id="viewport"></div> in html (remove in production)
    function getViewport() {
        var viewport = $('.viewport');
        vpHeight     = window.outerHeight;
        vpWidth      = window.outerWidth;

        viewport.html(vpWidth, ' x ' , vpHeight).css({
          'z-index' : '9999', 'position' : 'fixed', 'bottom' : '0', 'left' : '0', 'background' : '#fff', 'padding' : '10px', 'font-weight' : '800'
        });

    } getViewport();

    // Show Results if available otherwise show Mobile landing page instead.
    // On resize display results and map containers if over 768 pixelsß

    //This changes the container height to match mobile device onload
    // function mobileShowcase() {
    //     var mobileLanding = $('#mobile-landing');
    //     var mMenuHeight = 55;
    //     var mapContainer = $('.map_container');
    //     var mapCanvas = $('.map-canvas');

    //     if (vpWidth <= xsViewport) {

    //         mobileLanding.css({ 'min-height': vpHeight - mMenuHeight });

    //     } else {

    //         //

    //     }

    // } mobileShowcase();


    $(window).resize(function () {
        getViewport();
    });


});
