/**
 * Created by GVTar on 25.11.2017.
 */
;
// menu-mobile
$('.menu-toggle').click(function() {

    $('ul').toggleClass('opening');
    $(this).toggleClass('open');

});

// settings slick slaider
$(document).ready(function(){
    $('.responsive').slick({
        accessibility: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 795,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 510,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0"
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

// banner random show
(function () {
    var banners = [
            "<a href=\'#\'><img src=\"banners/league-gothic-1.png\" alt='click me\'></a>",
            "<a href=\'#\'><img src=\"banners/league-gothic-2.png\" alt='click me\'></a>",
            "<a href=\'#\'><img src=\"banners/league-gothic-3.png\" alt='click me\'></a>",
            "<a href=\'#\'><img src=\"banners/league-gothic-4.png\" alt='click me\'></a>",
            "<a href=\'#\'><img src=\"banners/league-gothic-5.png\" alt='click me\'></a>",
            "<a href=\'#\'><img src=\"banners/league-gothic-6.png\" alt='click me\'></a>"
        ],
        rand = Math.trunc(Math.random() * (banners.length - 0) + 0);

    $('.banner').append(banners[rand]);
})();
