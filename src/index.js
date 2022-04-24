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

//Temperature and more
function showTemp(response) {
    let inputCity = document.querySelector(".city")
    inputCity.innerHTML = response.data.name;

    let temperature = Math.round(response.data.main.temp)
    let currentTemp = document.querySelector(".current-temp")
    currentTemp.innerHTML = `${temperature}`;

    let sky = document.querySelector("#sky");
    let skyCondition = response.data.weather[0].description;
    sky.innerHTML = skyCondition;

    let feel = document.querySelector("#feel");
    let feelCondition = Math.round(response.data.main.feels_like);
    feel.innerHTML = `feels like ${feelCondition}℃`;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`

    let wind = document.querySelector("#wind");
    wind.innerHTML = `Wind: ${response.data.main.wind.speed}km/h`
    
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


//Celsius & Fahrenheit
function changeUnitCelsius(event) {
    event.preventDefault();
    let currentTemp = document.querySelector(".current-temp")
    currentTemp.innerHTML = "17";
}

let celsius = document.querySelector("#current-celsius");
celsius.addEventListener("click", changeUnitCelsius);

function changeUnitFahrenheit(event) {
    event.preventDefault();
    let currentTemp = document.querySelector(".current-temp");
    currentTemp.innerHTML = "66";
}
let fahrenheit = document.querySelector("#current-fahrenheit");
fahrenheit.addEventListener("click", changeUnitFahrenheit);
