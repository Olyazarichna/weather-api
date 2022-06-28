// const axios = require('axios').default;
const key = "a98d70d03d8de2cdd126f4062901ce92";

const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".search-field");
const cityName = document.querySelector(".city-name");
const currentLoc = document.querySelector(".location");
const iconEl = document.querySelector(".icon");
const temperatureEl = document.querySelector(".text-title");
const divEl = document.querySelector(".wrapper");
const tempCel = document.querySelector(".tempC");
const tempFahr = document.querySelector(".tempF");

formEl.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let city = inputEl.value;
  if (city === "") {
    return;
  }
  event.currentTarget.reset();
  searchCity(city);
}

function showWeather(response) {
  cityName.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  temperatureEl.innerHTML = temp;
  let description = response.data.weather[0].description;
  iconEl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconEl.setAttribute("alt", response.data.weather[0].description);

  const windEl = document.querySelector(".wind");
  const humidity = document.querySelector(".humidity");
  const descriptionEl = document.querySelector(".descritpion");
  cityName.innerHTML = response.data.name;

  //time
  const timeEl = document.querySelector(".time");
  timeEl.innerHTML = formatDate(response.data.dt * 1000);

  descriptionEl.innerHTML = description;
  windEl.innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

  let tempF = Math.round((temp * 9) / 5 + 32);

  tempFahr.addEventListener("click", (event) => {
    event.preventDefault();
    temperatureEl.innerHTML = tempF;
    tempCel.classList.remove("active");
    tempFahr.classList.add("active");
  });

  tempCel.addEventListener("click", (event) => {
    event.preventDefault();
    temperatureEl.innerHTML = temp;
    tempFahr.classList.remove("active");
    tempCel.classList.add("active");
  });
}

currentLoc.addEventListener("click", onBtnClick);

function onBtnClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}

function searchCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}

searchCity("Kyiv");
displayForecast();

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let time = `${day} ${hours}:${minutes}`;
  return `Last updated: ${time}`;
}


function displayForecast() {
  let forecastEl = document.querySelector('.weather-forecast');
  forecastEl.innerHTML = ` <div class="row">
  <div class="col-2">
      <div class="weather-forecast-date">Thu</div>
    <img
      src="http://openweathermap.org/img/wn/50d@2x.png"
      alt=""
      width="42"
    />
    <div class="weather-forecast-temperatures">
      <span class="max"> 18° </span>
      <span class="min"> 12° </span>
    </div>

  </div>

</div>`;
}