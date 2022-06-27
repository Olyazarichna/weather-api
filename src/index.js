// const axios = require('axios').default;

const key = "a98d70d03d8de2cdd126f4062901ce92";

const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".search-field");
const cityName = document.querySelector(".city-name");
const currentLoc = document.querySelector(".location");
const iconEl = document.querySelector(".icon-title");
const temperature = document.querySelector(".text-title");
const divEl = document.querySelector(".wrapper");
const tempCel = document.querySelector(".tempC");
const tempFahr = document.querySelector(".tempF");

console.log(tempCel);

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
  console.log(response.data);
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
  const humidity = document.querySelector(".humidity");
  const descriptionEl = document.querySelector(".descritpion");
  cityName.innerHTML = response.data.name;
  setTime();

  let description = response.data.weather[0].description;
  descriptionEl.innerHTML = description.toUpperCase();
  windEl.innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

  let tempF = Math.round((temp * 9) / 5 + 32);
  console.count(tempF);

  tempFahr.addEventListener("click", (event) => {
    event.preventDefault();
    temperature.innerHTML = tempF;
  });

  tempCel.addEventListener("click", (event) => {
    event.preventDefault();
    temperature.innerHTML = temp;
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

function setTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentTime = new Date();
  let day = currentTime.getDay();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  day = days[day];
  let time = `${day} ${hours}:${minutes}`;
  const timeEl = document.querySelector(".time");
  timeEl.innerHTML = `Last updated: ${time}</p>`;
}

// // let tempC = 17;
// // let tempF = Math.round((tempC * 9) / 5 + 32);

// const refs = {
//   tempCel: document.querySelector('.tempC'),
//   tempFahr: document.querySelector('.tempF'),

// }
// refs.tempFahr.addEventListener("click", (event) =>{
//   event.preventDefault();
//   temperature.innerHTML = tempF;
// });

// refs.tempCel.addEventListener("click", (event) => {
//   event.preventDefault();
//   temperature.innerHTML = tempC;
// });
