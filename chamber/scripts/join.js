// mobile navigation

const menuButton = document.getElementById("menu-button");
const navUl = document.querySelector("#main-nav ul");

menuButton.addEventListener("click", () => {
    navUl.classList.toggle("open");

    const isOpen = navUl.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});


// footer year

document.getElementById("currentyear").textContent =
    new Date().getFullYear();


// last modified

document.getElementById("lastModified").textContent =
    "Last Modification: " + document.lastModified;


// form timestamp

document.getElementById("timestamp").value =
    new Date().toISOString();


// membership modals

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