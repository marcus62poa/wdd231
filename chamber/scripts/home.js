// ================================
// MOBILE NAVIGATION
// ================================

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


// ================================
// FOOTER
// ================================

document.getElementById("currentyear").textContent =
    new Date().getFullYear();

document.getElementById("lastModified").textContent =
    `Last Modification: ${document.lastModified}`;


// ================================
// WEATHER API
// ================================

// Viamão, Rio Grande do Sul, Brazil
const latitude = -30.0819;
const longitude = -51.0233;

// IMPORTANT:
// Replace YOUR_API_KEY with your own OpenWeatherMap API key.
const apiKey = "YOUR_API_KEY";

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;


// ================================
// CURRENT WEATHER
// ================================

async function getCurrentWeather() {

    try {

        const response = await fetch(currentWeatherURL);

        if (!response.ok) {
            throw new Error(`Weather request failed: ${response.status}`);
        }

        const data = await response.json();

        displayCurrentWeather(data);

    } catch (error) {

        console.error("Error loading current weather:", error);

        document.getElementById("current-temp").textContent =
            "Unavailable";

        document.getElementById("weather-description").textContent =
            "Weather data unavailable";
    }
}


function displayCurrentWeather(data) {

    const temperature =
        Math.round(data.main.temp);

    const description =
        data.weather[0].description;

    const iconCode =
        data.weather[0].icon;

    const iconURL =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("current-temp").textContent =
        `${temperature} °C`;

    document.getElementById("weather-description").textContent =
        description;

    const weatherIcon =
        document.getElementById("weather-icon");

    weatherIcon.setAttribute("src", iconURL);

    weatherIcon.setAttribute(
        "alt",
        `Weather icon showing ${description}`
    );

    document.getElementById("weather-caption").textContent =
        description;
}


// ================================
// THREE-DAY FORECAST
// ================================

async function getForecast() {

    try {

        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error(`Forecast request failed: ${response.status}`);
        }

        const data = await response.json();

        displayForecast(data.list);

    } catch (error) {

        console.error("Error loading forecast:", error);

        document.getElementById("forecast-container").innerHTML =
            "<p>Forecast unavailable.</p>";
    }
}


function displayForecast(forecastList) {

    const forecastContainer =
        document.getElementById("forecast-container");

    forecastContainer.innerHTML = "";

    const dailyForecasts = {};

    forecastList.forEach((forecast) => {

        const date = forecast.dt_txt.split(" ")[0];

        if (!dailyForecasts[date]) {
            dailyForecasts[date] = forecast;
        }

    });

    const forecastDates =
        Object.keys(dailyForecasts).slice(0, 3);

    forecastDates.forEach((date) => {

        const forecast =
            dailyForecasts[date];

        const temperature =
            Math.round(forecast.main.temp);

        const description =
            forecast.weather[0].description;

        const dateObject =
            new Date(`${date}T12:00:00`);

        const formattedDate =
            dateObject.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric"
            });

        const card =
            document.createElement("article");

        card.classList.add("forecast-card");

        card.innerHTML = `
            <h4>${formattedDate}</h4>
            <p><strong>Temperature:</strong> ${temperature} °C</p>
            <p><strong>Conditions:</strong> ${description}</p>
        `;

        forecastContainer.appendChild(card);

    });
}


// ================================
// COMPANY SPOTLIGHTS
// ================================

const membersURL = "data/members.json";


async function getMembers() {

    try {

        const response =
            await fetch(membersURL);

        if (!response.ok) {
            throw new Error(
                `Members request failed: ${response.status}`
            );
        }

        const members =
            await response.json();

        displaySpotlights(members);

    } catch (error) {

        console.error("Error loading members:", error);

        document.getElementById(
            "spotlights-container"
        ).innerHTML =
            "<p>Company information unavailable.</p>";
    }
}


// ================================
// RANDOM GOLD/SILVER SPOTLIGHTS
// ================================

function displaySpotlights(members) {

    const container =
        document.getElementById("spotlights-container");

    container.innerHTML = "";

    // Keep only Gold and Silver members
    const qualifiedMembers =
        members.filter((member) => {

            const level =
                String(member.level).toLowerCase();

            return level === "gold" || level === "silver";

        });


    // Shuffle the qualified members
    const shuffled =
        qualifiedMembers.sort(() => Math.random() - 0.5);


    // Select 2 or 3 members
    const selectedMembers =
        shuffled.slice(0, Math.min(3, shuffled.length));


    selectedMembers.forEach((member) => {

        const card =
            document.createElement("article");

        card.classList.add("spotlight-card");

        const image =
            document.createElement("img");

        image.setAttribute("src", member.image);

        image.setAttribute(
            "alt",
            `Logo of ${member.name}`
        );

        image.setAttribute("loading", "lazy");

        const name =
            document.createElement("h3");

        name.textContent =
            member.name;

        const address =
            document.createElement("p");

        address.innerHTML =
            `<strong>Address:</strong> ${member.address}`;

        const phone =
            document.createElement("p");

        phone.innerHTML =
            `<strong>Phone:</strong> ${member.phone}`;

        const website =
            document.createElement("a");

        website.setAttribute(
            "href",
            member.website
        );

        website.setAttribute(
            "target",
            "_blank"
        );

        website.setAttribute(
            "rel",
            "noopener noreferrer"
        );

        website.textContent =
            "Visit Website";

        const level =
            document.createElement("span");

        level.classList.add("membership-level");

        level.textContent =
            `${member.level} Member`;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(level);
        card.appendChild(website);

        container.appendChild(card);

    });
}


// ================================
// START APPLICATION
// ================================

getCurrentWeather();
getForecast();
getMembers();