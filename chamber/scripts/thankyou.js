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