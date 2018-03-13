var Ps = require('perfect-scrollbar');

$(function() {

    // Perfect Scrollbar parameters

    var params= {
        minScrollbarLength: 25,
        maxScrollbarLength: 25,
        supressScrollX: true
    };

    var breakpoint = 768;
    var headerInfo = $('.content-wrapper.info');


    function setPerfectScrollbars (params, breakpoint) {
        
        if ($(window).width() > breakpoint) {

            var columnLeft = document.querySelector('#left');     
            var columnRight = document.querySelector('#right');
            var columnPasp = document.querySelector('#pasp');
            Ps.initialize(columnLeft, params);
            Ps.initialize(columnRight, params);
            Ps.initialize(columnPasp, params);

        }

        return false;
    }

    setPerfectScrollbars(params,breakpoint);

    $(window).on('resize', function(){
        setPerfectScrollbars(params,breakpoint);
    });

    // sets infinite scroll on splash

    var el = $('#splash .scroll-wrapper');
    var height = el.height() * 2;
    var splash = $('#splash');
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

    // sets splash scroll link to website body

    function scrollToNextElement(el) {

        el.on('click', function(e){

            e.preventDefault();
            var height = el.height();
            $("html,body").animate(
                { scrollTop: height }
            );
        });
    }

    scrollToNextElement($('#splash'));

    // function expands info panel on click

    function setExpandPost(el) {

        $(el).on('click',function(e){

            var parent = $(e.currentTarget).data('parent');
            $('.' + parent + ' .excerpted').toggleClass('hide');
            $('.' + parent + ' .expanded').toggleClass('show');

        });
    }

    setExpandPost('#info-button');

    // function reveal PasP panel on click

    function setRevealPasP(el) {

        $(el).on('click',function(e){

            var target = $(e.currentTarget).data('target');
            $('.' + target ).toggleClass('reveal');
        });
    }

    setRevealPasP('.pasp-reveal');

    // handles on how titles appear based on screen width

    if ($(this).width() < 768) {

        $('header.left').append(headerInfo.remove());
    }

    $(window).on('resize',function(){

        if($(this).width() < 768) {
            
            $('header.left').append(headerInfo.remove());
            setExpandPost('#info-button');
        }

        if($(this).width() > 768) {
            
            $('header.right').append(headerInfo.remove());
            setExpandPost('#info-button');
        }
    });


});