const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navigationLinks = navLinks.querySelectorAll("a");

function closeMenu() {
navLinks.classList.remove("open");
menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
const isExpanded =
menuToggle.getAttribute("aria-expanded") === "true";


if (isExpanded) {
    closeMenu();
} else {
    navLinks.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
}


});

// Close the menu after selecting a navigation link.
navigationLinks.forEach((link) => {
link.addEventListener("click", closeMenu);
});

// Close the menu when the Escape key is pressed.
document.addEventListener("keydown", (event) => {
if (event.key === "Escape") {
closeMenu();
menuToggle.focus();
}
});

// Restore desktop navigation when the viewport becomes wider.
window.addEventListener("resize", () => {
if (window.innerWidth > 640) {
closeMenu();
}
});
