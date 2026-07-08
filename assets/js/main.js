// ===============================
// Mobile Navigation
// ===============================
// Mobile Navigation

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

// Header Scroll

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    header.classList.toggle("scrolled", window.scrollY > 40);

});
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

const reveals = document.querySelectorAll(
    ".fade-up, .fade-down, .fade-left, .fade-right, .zoom-in"
);

reveals.forEach(el => observer.observe(el));

reveals.forEach((el, index) => {
    el.style.transitionDelay = `${index * 10}ms`;
});
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
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 150;
        const height = section.offsetHeight;

        if (window.scrollY >= top) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});
const backTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});

backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});
window.addEventListener("load", () => {
    const loader = document.getElementById("preloader");
    const page = document.getElementById("page-content");
    setTimeout(() => {
        loader.classList.add("hide");
        page.classList.add("show");
    }, 1800);
});
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

const modal = document.getElementById("successModal");
const closeBtn = document.getElementById("closeModal");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {

        const response = await fetch(form.action, {

            method: "POST",

            body: new FormData(form),

            headers: {
                Accept: "application/json"
            }

        });

        if (response.ok) {

            form.reset();

            modal.classList.add("show");

            lucide.createIcons();

        } else {

            alert("Unable to send message. Please try again.");

        }

    }
    catch {

        alert("Network error. Please try again.");

    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";

});

closeBtn.addEventListener("click", () => {

    modal.classList.remove("show");

});