var carouselAnchor = document.querySelector(".bitasCarousel .carousel-inner");

var carouselButton = document.querySelectorAll(".bitasCarousel button");

carouselAnchor.addEventListener("mouseenter", () => {
    carouselButton.forEach((item) => {
        item.classList.add("show");
    });
});
carouselAnchor.addEventListener("mouseleave", () => {
    carouselButton.forEach((item) => {
        item.classList.remove("show");
    });
});


// Attach Navigation Bar when Scroll
var mobileNav = document.querySelector(".header-mobile");

function NavScroll() {
    if (window.scrollY > 50) {
        mobileNav.style.cssText = "position: fixed; top: 0; left: 0; z-index: 5; scroll-behavior: smooth;";
    }
    else {
        mobileNav.style.cssText = "";
    }
}

window.addEventListener("scroll", function () {
    NavScroll();
});