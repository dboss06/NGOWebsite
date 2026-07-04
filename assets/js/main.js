const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
    });

}, {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
});

document.querySelectorAll(".fade-up, .fade-down, .fade-left, .fade-right, .zoom-in")
    .forEach(el => observer.observe(el));