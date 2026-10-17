const photos = [
{
title: "Mountain Escape",
category: "Nature",
src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85"
},
{
title: "Quiet Horizons",
category: "Landscape",
src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85"
},
{
title: "Into the Wild",
category: "Adventure",
src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85"
},
{
title: "Ocean Dreams",
category: "Ocean",
src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
},
{
title: "Golden Peaks",
category: "Travel",
src: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=85"
},
{
title: "Forest Stories",
category: "Wilderness",
src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85"
}
];

const galleryGrid = document.getElementById("galleryGrid");
const slideImage = document.getElementById("slideImage");
const slideTitle = document.getElementById("slideTitle");
const slideCounter = document.getElementById("slideCounter");
const pauseButton = document.getElementById("pauseSlide");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

let currentSlide = 0;
let currentGalleryImage = 0;
let isPaused = false;
let slideshowTimer;

// Create the gallery cards.
photos.forEach((photo, index) => {
const card = document.createElement("article");
card.className = "gallery-card";
card.tabIndex = 0;
card.setAttribute("role", "button");
card.setAttribute("aria-label", `Enlarge ${photo.title}`);


card.innerHTML = `
    <img src="${photo.src}" alt="${photo.title}" loading="lazy">
    <p>${photo.title} <span>— ${photo.category}</span></p>
`;

card.addEventListener("click", () => openLightbox(index));

card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
    }
});

galleryGrid.appendChild(card);


});

// Display a slideshow image.
function showSlide(index) {
currentSlide = (index + photos.length) % photos.length;


slideImage.classList.add("changing");

const nextPhoto = photos[currentSlide];
const preload = new Image();

preload.onload = () => {
    slideImage.src = nextPhoto.src;
    slideImage.alt = nextPhoto.title;
    slideTitle.textContent = nextPhoto.title;
    slideCounter.textContent =
        `${String(currentSlide + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;

    slideImage.classList.remove("changing");
};

preload.onerror = () => {
    slideImage.classList.remove("changing");
    console.error("Could not load slideshow image:", nextPhoto.src);
};

preload.src = nextPhoto.src;


}

function nextSlide() {
showSlide(currentSlide + 1);
}

function previousSlide() {
showSlide(currentSlide - 1);
}

function startSlideshow() {
clearInterval(slideshowTimer);


slideshowTimer = setInterval(() => {
    if (!isPaused && !lightbox.classList.contains("open")) {
        nextSlide();
    }
}, 4000);


}

document.getElementById("nextSlide").addEventListener("click", () => {
nextSlide();
startSlideshow();
});

document.getElementById("previousSlide").addEventListener("click", () => {
previousSlide();
startSlideshow();
});

pauseButton.addEventListener("click", () => {
isPaused = !isPaused;
pauseButton.textContent = isPaused ? "▶" : "Ⅱ";
pauseButton.setAttribute(
"aria-label",
isPaused ? "Resume slideshow" : "Pause slideshow"
);
});

// Open the enlarged image viewer.
function openLightbox(index) {
currentGalleryImage = index;
updateLightbox();


lightbox.classList.add("open");
lightbox.setAttribute("aria-hidden", "false");
document.body.style.overflow = "hidden";

document.getElementById("closeLightbox").focus();


}

function updateLightbox() {
const photo = photos[currentGalleryImage];


lightboxImage.src = photo.src;
lightboxImage.alt = photo.title;
lightboxCaption.textContent = `${photo.title} — ${photo.category}`;


}

function closeLightbox() {
lightbox.classList.remove("open");
lightbox.setAttribute("aria-hidden", "true");
document.body.style.overflow = "";
}

function moveLightbox(direction) {
currentGalleryImage =
(currentGalleryImage + direction + photos.length) % photos.length;


updateLightbox();


}

document.getElementById("closeLightbox")
.addEventListener("click", closeLightbox);

document.getElementById("lightboxPrev")
.addEventListener("click", () => moveLightbox(-1));

document.getElementById("lightboxNext")
.addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (event) => {
if (event.target === lightbox) {
closeLightbox();
}
});

document.addEventListener("keydown", (event) => {
if (!lightbox.classList.contains("open")) return;


if (event.key === "Escape") closeLightbox();
if (event.key === "ArrowLeft") moveLightbox(-1);
if (event.key === "ArrowRight") moveLightbox(1);


});

// Load the first slide and begin automatic transitions.
showSlide(0);
startSlideshow();
