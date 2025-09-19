  var swiper = new Swiper(".mySwiper", {
    loop: true,
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
    });