(function(){

    // Add bootstrap carousel number of slides

    let totalItems = $('.item').length;
    let currentIndex = $('div.active').index() + 1;
    $('.slides-number').html(`${currentIndex} / ${totalItems}`);
// Bind number of slides

    $('#myCarousel').on('slide.bs.carousel', function () {
        //Do something on entry
    });
    $('#myCarousel').on('slid.bs.carousel', function () {
        currentIndex = $('div.active').index() + 1;
        $('.slides-number').html(`${currentIndex} / ${totalItems}`);
    });

})();