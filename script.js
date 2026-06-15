const canvas = document.getElementById("particles");

if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
            }

            if (this.y < 0 || this.y > canvas.height) {
                this.speedY *= -1;
            }
        }

        draw() {
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];

        for (let i = 0; i < 40; i++) {
            particlesArray.push(new Particle());
        }
    }

    let lastFrame = 0;

    function animate(timestamp) {
        if (timestamp - lastFrame < 16) {
            requestAnimationFrame(animate);
            return;
        }

        lastFrame = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const particle of particlesArray) {
            particle.update();
            particle.draw();
        }

        requestAnimationFrame(animate);
    }

    init();
    requestAnimationFrame(animate);
}

window.addEventListener(
    "scroll",
    () => {},
    { passive: true }
);

window.addEventListener("error", () => {
    document.body.style.overflow = "";
});

window.addEventListener("unhandledrejection", () => {
    document.body.style.overflow = "";
});

let currentImages = [];
let currentIndex = 0;

function openProjectModal(title, description, images) {
    currentImages = images;
    currentIndex = 0;

    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn">✕</button>

            <h2>${title}</h2>

            <div class="carousel-wrapper">
                <button class="nav-btn prev">❮</button>

                <img
                    id="modal-carousel-img"
                    src="${images[0]}"
                    alt="${title}"
                >

                <button class="nav-btn next">❯</button>
            </div>

            <p class="modal-description">${description}</p>
        </div>
    `;

    document.body.appendChild(modal);

    document.body.style.overflow = "hidden";

    const image = modal.querySelector("#modal-carousel-img");

    modal.querySelector(".prev").addEventListener("click", () => {
        currentIndex =
            (currentIndex - 1 + currentImages.length) %
            currentImages.length;

        image.src = currentImages[currentIndex];
    });

    modal.querySelector(".next").addEventListener("click", () => {
        currentIndex =
            (currentIndex + 1) %
            currentImages.length;

        image.src = currentImages[currentIndex];
    });

    modal.querySelector(".close-btn").addEventListener("click", () => {
        modal.remove();
        document.body.style.overflow = "";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = "";
        }
    });
}

let currentSlide = 0;

function scrollCarousel(direction) {
    const carousel = document.getElementById("carousel");

    if (!carousel) return;

    const slides = carousel.querySelectorAll("img");
    const totalSlides = slides.length;

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    carousel.scrollTo({
        left: carousel.clientWidth * currentSlide,
        behavior: "smooth"
    });
}

const typedText = document.getElementById("typed-text");

if (typedText) {
    const words = [
        "I design digital experiences",
        "UI/UX Designer",
        "System Architect",
        "Product Strategist",
        "Creative Problem Solver"

    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!deleting) {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }
        } else {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 50 : 100);
    }

    typeEffect();
}

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
});

function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = outlineX + "px";
    cursorOutline.style.top = outlineY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();


const hoverTargets = document.querySelectorAll(
    "a, button, .sys-card, .poster-card"
);

hoverTargets.forEach(item => {
    item.addEventListener("mouseenter", () => {
        cursorOutline.style.width = "65px";
        cursorOutline.style.height = "65px";
    });

    item.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
    });
});
