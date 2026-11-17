const menuButton = document.getElementById("menu-button");
const navUl = document.querySelector("#main-nav ul");

menuButton.addEventListener("click", () => {
    navUl.classList.toggle("open");

    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
});

document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent =
    "Last Modification: " + document.lastModified;

const visitMessage = document.getElementById("visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent =
        "Welcome! Let us know if you have any questions about Viamão.";
} else {
    const difference = currentVisit - Number(lastVisit);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days === 0) {
        visitMessage.textContent =
            "Welcome back! You visited us earlier today.";
    } else if (days === 1) {
        visitMessage.textContent =
            "Welcome back! Your last visit was 1 day ago.";
    } else {
        visitMessage.textContent =
            `Welcome back! Your last visit was ${days} days ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);