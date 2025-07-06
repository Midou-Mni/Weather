const apiKey = `f6b153e6f40d6270220b4489e14f6c3c`;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

const inputEl = document.querySelector('#inpt');
const btnEl = document.querySelector('.btn');
const changedEl = document.querySelector('.changed');

// Event Listeners
btnEl.addEventListener('click', citySearch);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") citySearch();
});

// City Search Function
function citySearch() {
  const city = inputEl.value.trim();
  if (!city) return;

  const url = `${baseUrl}&q=${city}&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      updateUI(data);
    })
    .catch(error => {
      changedEl.classList.remove("loaded");
      changedEl.innerHTML = `<p style="color: #ffbaba; text-align: center;">${error.message}</p>`;
    });
}

// Update UI with data
function updateUI(data) {
  const weatherMain = data.weather[0].main;
  let iconSrc = "images/clear.png";

  switch (weatherMain) {
    case "Clouds": iconSrc = "images/clouds.png"; break;
    case "Drizzle": iconSrc = "images/drizzle.png"; break;
    case "Mist": iconSrc = "images/mist.png"; break;
    case "Rain": iconSrc = "images/rain.png"; break;
    case "Snow": iconSrc = "images/snow.png"; break;
  }

  changedEl.classList.remove("loaded");
  changedEl.innerHTML = `
    <img class="state" src="${iconSrc}" title="${data.weather[0].description}">
    <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
    <h2 class="city">${data.name}</h2>

    <section class="weather">
      <div class="humidity">
        <img src="images/bx-water.svg" alt="Humidity Icon">
        <div>
          <h3>${data.main.humidity}%</h3>
          <h3>Humidity</h3>
        </div>
      </div>
      <div class="wind">
        <img src="images/bx-wind.svg" alt="Wind Icon">
        <div>
          <h3>${data.wind.speed} km/h</h3>
          <h3>Wind Speed</h3>
        </div>
      </div>
    </section>
  `;

  setTimeout(() => changedEl.classList.add("loaded"), 50);
}

// Load random city on first visit
const cities = ["New York", "London", "Tokyo", "Delhi", "Paris", "Berlin", "Moscow", "Sydney", "Toronto", "Dubai"];

function loadRandomCity() {
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  inputEl.value = randomCity;
  citySearch();
}

window.addEventListener("DOMContentLoaded", loadRandomCity);
