$(".closeloginmodal").click(function () {
    $(".loginmodal").fadeOut(50);
});
$(".openloginmodal").click(function () {
    $(".loginmodal").fadeIn(50);
});

$(".closecarouselmodal").click(function () {
    $(".carouselmodal").fadeOut(50);
});
$(".opencarouselmodal").click(function () {
    $(".carouselmodal").fadeIn(50);
});


// carousel
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});