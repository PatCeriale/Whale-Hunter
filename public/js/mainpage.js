import bulmaCarousel from "~bulma-carousel/dist/js/bulma-carousel.min.js";

// Initialize all elements with carousel class.
const carousels = bulmaCarousel.attach(".carousel", {
  slidesToScroll: 3,
  slidesToShow: 1,
});

// To access to bulmaCarousel instance of an element
const element = document.querySelector("#my-element");
if (element && element.bulmaCarousel) {
  // bulmaCarousel instance is available as element.bulmaCarousel
  element.bulmaCarousel.on("start", function (bulmaCarouselInstance) {
    console.log(bulmaCarouselInstance.index);
  });
}
