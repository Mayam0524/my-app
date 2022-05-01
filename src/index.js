let now = new Date();
let days = ["Sunday", "Monaday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let today = document.querySelector(".date");
today.innerHTML = `${day}, ${month} ${date}, ${year}`;
let hour = now.getHours();
let minutes = now.getMinutes();
let time = document.querySelector(".time");
if (hour < 10) {
    hour = `0${hour}`;
}
if (minutes < 10) {
    minutes = `0${minutes}`;
}
time.innerHTML = `${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


//Temperature and more
function showTemp(response) {
    let inputCity = document.querySelector(".city")
    inputCity.innerHTML = response.data.name;

    let temperature = Math.round(response.data.main.temp)
    let currentTemp = document.querySelector(".current-temp")
    currentTemp.innerHTML = `${temperature}℃`;

    let icon = document.querySelector("#icon");
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

    let sky = document.querySelector("#sky");
    let skyCondition = response.data.weather[0].description;
    sky.innerHTML = skyCondition;

    let feel = document.querySelector("#feel");
    let feelCondition = Math.round(response.data.main.feels_like);
    feel.innerHTML = `${feelCondition}℃`;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}%`;

    let wind = document.querySelector("#wind");
    let windElement = 
    wind.innerHTML = Math.round(response.data.wind.speed);
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML = forecastHTML +
            `<div class="col-2">
                <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                <img
                src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="38"
                class="icon"
                />
                <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                )}° </span>
                <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                )}° </span>
                </div>
            </div>`;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function searchCity(city) {
    let apiKey = "bde4594240bbd5634acfce653024105f";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemp);
}


function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-input");
    let cityElement = document.querySelector(".city");
    cityElement.innerHTML = `${cityInput.value}`;
    let city = `${cityInput.value}`;
    searchCity(city);
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", handleSubmit);

//Locate current position
function getLocation(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let unit = "metric";
    let apiKey = "bde4594240bbd5634acfce653024105f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemp);
}

function showPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", showPosition);
