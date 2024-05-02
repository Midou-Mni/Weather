// API
const apiKey = `f6b153e6f40d6270220b4489e14f6c3c`;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

// VARIABLES
let inputEl = document.querySelector('#inpt');
let btnEl = document.querySelector('.btn');
let changedEl = document.querySelector('.changed');
let cardEl = document.querySelector('.card');
let weatherIcon = document.querySelectorAll('.state');

// EVENTS
btnEl.addEventListener('click', citySearch);
inputEl.addEventListener("change", citySearch)
// FUNCTIONS
function citySearch(){
    let city = inputEl.value.trim();
    let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    fetch(apiUrlCity)
        .then((res) => {
            if(res.ok){
                return res.json();
            }
        })
        .then((data) => {
            console.log(data);
            cityDetails(data);
        })
}

function cityDetails(dataCity){
    changedEl.innerHTML = "";

    if(dataCity == null){
        changedEl.innerHTML = "<br>You did not enter any name fo any city"
    }


    //The Weather Icon
    if(dataCity.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
        weatherIcon.title = dataCity.weather[0].description;
    }
    else if(dataCity.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
        weatherIcon.title = dataCity.weather[0].description;
    }
    else if(dataCity.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
        weatherIcon.title = dataCity.weather[0].description;
    }
    else if(dataCity.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
        weatherIcon.title = dataCity.weather[0].description;
    }
    else if(dataCity.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png";
        weatherIcon.title = dataCity.weather[0].description;
    }
    else{
        weatherIcon.src = "images/clear.png";
        weatherIcon.title = dataCity.weather[0].description;
    };
    



    changedEl.innerHTML += 
        `
            <img class="state" src="${weatherIcon.src}" title="${weatherIcon.title}">
            <h1 class="temp">${Math.round(dataCity.main.temp)}°c</h1>
            <h2 class="city">${dataCity.name}</h2>

            <section class="weather">
                <div class="humidity">
                    <img src="images/bx-water.svg">
                    <div class="divHumid">
                        <h3 class="per">${dataCity.main.humidity}%</h3>
                        <h3 class="humid">Humidity</h3>
                    </div>
                </div>
                <div class="wind">
                    <img src="images/bx-wind.svg">
                    <div class="dicWindSpeed">
                        <h3 class="km">${dataCity.wind.speed} km/h</h3>
                        <h3 class="speed">WindSpeed</h3>
                    </div>
                </div>
            </section>
        `
        console.log(weatherIcon.alt)
}
    
    



/*

async function checkWeather(){
    const response = await fetch(apiUrl +`&q=${citytown}` + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);
}
checkWeather()
*/
