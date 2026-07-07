// ===============================
// Mobile Navigation
// ===============================
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});
// ===============================
// Scroll Animations
// ===============================
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle(
            "show",
            entry.isIntersecting
        );
    });
}, {
    threshold: 0.15
});
document.querySelectorAll(
    ".fade-up, .fade-down, .fade-left, .fade-right, .zoom-in"
).forEach(el => observer.observe(el));

// ===============================
// Lucide Icons
// ===============================

if (window.lucide) {
    lucide.createIcons();
}
// ==========================================================
// HERO SLIDER
// ==========================================================
const heroData = [
    {
        tag: "Our Mission",
        title: "Empowering Rural Women to Build Better Lives",
        text: "We are committed to creating opportunities that help rural women achieve independence, dignity and lasting economic empowerment."
    },
    {
        tag: "Education & Care",
        title: "Every Child Deserves the Opportunity to Thrive",
        text: "We strive to improve the lives of children by promoting access to quality education, healthcare and a safe environment."
    },
    {
        tag: "Sustainable Development",
        title: "Creating Stronger Communities Together",
        text: "We work alongside communities to encourage sustainable development through collaboration, advocacy and shared responsibility."
    }
];
const heroContent = document.querySelector(".hero-content");
const heroTag = document.querySelector(".hero-tag");
const heroTitle = document.querySelector(".hero h1");
const heroText = document.querySelector(".hero p");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const progressBar = document.querySelector(".hero-progress-bar");
let currentSlide = 0;
let slideInterval;
function updateHero(index) {
    heroContent.classList.add("fade-out");
    setTimeout(() => {
        heroTag.textContent = heroData[index].tag;
        heroTitle.textContent = heroData[index].title;
        heroText.textContent = heroData[index].text;
        heroSlides.forEach(slide => slide.classList.remove("active"));
        heroDots.forEach(dot => dot.classList.remove("active"));
        heroSlides[index].classList.add("active");
        heroDots[index].classList.add("active");
        heroContent.classList.remove("fade-out");
        restartProgress();
    }, 300);
}
function nextSlide() {
    currentSlide++;
    if (currentSlide >= heroData.length) {
        currentSlide = 0;
    }
    updateHero(currentSlide);
}
function restartProgress() {
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    requestAnimationFrame(() => {
        progressBar.style.transition = "width 7s linear";
        progressBar.style.width = "100%";
    });
}
function startSlider() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 9000);
}
heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlide = index;
        updateHero(currentSlide);
        startSlider();
    });
});
updateHero(currentSlide);
startSlider();