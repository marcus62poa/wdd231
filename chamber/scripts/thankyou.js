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


// foot er  year
 
document.getElementById("currentyear").textContent =
    new Date().getFullYear();


// last mo dified

document.getElementById("lastModified").textContent =
    "Last Modification: " + document.lastModified;


// form data

const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName") || "";
const lastName = params.get("lastName") || "";
const email = params.get("email") || "";
const phone = params.get("phone") || "";
const organization = params.get("organization") || "";
const timestamp = params.get("timestamp") || "";


// show form data

const applicationInfo = document.getElementById("application-info");

applicationInfo.innerHTML = `
    <p>
        <strong>First Name:</strong> ${firstName}
    </p>

    <p>
        <strong>Last Name:</strong> ${lastName}
    </p>

    <p>
        <strong>Email:</strong> ${email}
    </p>

    <p>
        <strong>Phone:</strong> ${phone}
    </p>

    <p>
        <strong>Organization:</strong> ${organization}
    </p>

    <p>
        <strong>Application Date and Time:</strong> ${timestamp}
    </p>
`;

// confetti

const confettiContainer = document.querySelector(".confetti-container");

const confettiColors = [
    "#2e7d32",
    "#003366",
    "#f4b400",
    "#d32f2f",
    "#7b1fa2"
];

for (let i = 0; i < 25; i++) {
    const confetti = document.createElement("span");

    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "%";

    confetti.style.backgroundColor =
        confettiColors[Math.floor(Math.random() * confettiColors.length)];

    confetti.style.animationDelay =
        Math.random() * 0.8 + "s";

    confetti.style.transform =
        `rotate(${Math.random() * 360}deg)`;

    confetti.addEventListener("animationend", () => {
        confetti.remove();
    });

    confettiContainer.appendChild(confetti);
}