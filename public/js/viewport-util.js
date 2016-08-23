$(function () {
    var vpHeight;
    var vpWidth;
    var xsViewport = 768;
    // var smViewport = 992;
    // var mdViewport = 1200;

    //A very small viewport display utility : use <div id="viewport"></div> in html (remove in production)
    function getViewport() {
        var viewport = $('.viewport');
        vpHeight = window.outerHeight;
        vpWidth = window.outerWidth;

        viewport.empty().append(vpWidth, ' x ' , vpHeight).css({
          'z-index' : '9999', 'position' : 'fixed', 'bottom' : '0', 'left' : '0', 'background' : '#fff', 'padding' : '10px', 'font-weight' : '800'
        });

    } getViewport();

    $(window).resize(function () {
        getViewport();
    });


});