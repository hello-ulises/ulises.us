var Ps = require('perfect-scrollbar');

$(function() {

    // Perfect Scrollbar parameters

    var params= {
        minScrollbarLength: 25,
        maxScrollbarLength: 25,
        supressScrollX: true
    };

    var breakpoint = 768;

    function setPerfectScrollbars (params, breakpoint) {
        
        if ($(window).width() > breakpoint) {

            var columnLeft = document.querySelector('#left');     
            var columnRight = document.querySelector('#right');
            var columnPasp = document.querySelector('.column#pasp');
            var columnSplash = document.querySelector('.splash-panel .scroll-wrapper');
            Ps.initialize(columnLeft, params);
            Ps.initialize(columnRight, params);
            Ps.initialize(columnPasp, params);
            Ps.initialize(columnSplash, {
                supressScrollX: true
            });

        }

        return false;
    }

    // sets infinite scroll on splash

    var el = $('.splash-panel .scroll-wrapper');
    var height = el.height() * 2;
    var splash = $('.splash-panel a');
    var themes = ['default', 'inverse', 'hw', 'ms', 'bd'];

    el.on('scroll', function() {

      if ( el.scrollTop() > height * 2) {
        el.scrollTop(height);
      }
      if ( el.scrollTop() < height / 4) {
        el.scrollTop(height);
      }
      if ( (Math.floor(el.scrollTop()) % 50) == 0) {
        
        splash.removeClass();
        splash.addClass(themes[Math.floor(Math.random()*themes.length)]);
      }

    });

    // function toggles classes on parent element

    function setExpandPanel(el) {

        var parent = el.data('parent');
        $('#' + parent + ' .excerpted').toggleClass('hide');
        $('#' + parent + ' .expanded').toggleClass('show');
    }

    // function reveal PasP panel on click

    function setRevealPasP(el,toggleClass) {

        var target = el.data('target');
        $('.' + target ).toggleClass(toggleClass);
    }

    function checkHeaders() {

        if($(this).width() < 769) {            
            $('header.left').append(header.remove());
        } else {            
            $('header.right').append(header.remove());
        }
    }

    // sets expand on info panel

    // handles on how titles appear based on screen width

    var header = $('.site-header .content-wrapper');

    function init() {

        setPerfectScrollbars(params,breakpoint);
        checkHeaders();
        $('#info-button').on('click', function(e){
            e.preventDefault();
            setExpandPanel($(e.currentTarget));
        });
        $('#splash-body-anchor').on('click', function(e){
            e.preventDefault();
            setRevealPasP($(e.currentTarget),'hide');
        });
        $('#pasp-reveal').on('click', function(e){
            e.preventDefault();
            if( $(window).width() > 768 ) {
                setRevealPasP($(e.currentTarget),'reveal');
                $(e.currentTarget).find('svg').toggleClass('hide');
            }
        });
        $('.pasp-reveal').on('click', function(e){
            e.preventDefault();
            if( $(window).width() < 769 ) {
                setExpandPanel($(e.currentTarget));
            }
        });    
    }

    init()

    $(window).on('resize',function(){
        init();
    });
});