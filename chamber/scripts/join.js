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

document.getElementById("timestamp").value = new Date().toISOString();

const modalButtons = document.querySelectorAll(".learn-more");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);
        modal.showModal();
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});