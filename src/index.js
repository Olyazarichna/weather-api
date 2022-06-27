// const axios = require('axios').default;

const key = "a98d70d03d8de2cdd126f4062901ce92";

const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".search-field");
const cityName = document.querySelector(".city-name");
const currentLoc = document.querySelector(".location");
const iconEl = document.querySelector(".icon-title");
const temperature = document.querySelector(".text-title");

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
  temperature.innerHTML = temp;
  if (temp >= 20) {
    iconEl.innerHTML = "☀️";
  } else if (temp < 0) {
    iconEl.innerHTML = "☃️";
  } else if (temp > 5 && 19) {
    iconEl.innerHTML = "🌥";
  }
  const windEl = document.querySelector(".wind");
  cityName.innerHTML = response.data.name;
  windEl.innerHTML = `Wind speed: ${response.data.wind.speed}`;
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
