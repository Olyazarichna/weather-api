// const axios = require('axios').default;

const key = "a98d70d03d8de2cdd126f4062901ce92";

const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".search-field");
const cityName = document.querySelector(".city-name");
const currentLoc = document.querySelector(".location");
const iconEl = document.querySelector(".icon-title");
const temperatureEl = document.querySelector(".text-title");
const divEl = document.querySelector(".wrapper");
const tempCel = document.querySelector(".tempC");
const tempFahr = document.querySelector(".tempF");

console.log(temperatureEl);
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
  if (description === 'snow') {
    iconEl.innerHTML = "❄️";
  }  else if (description === 'clouds') {
    iconEl.innerHTML = "🌥";
  }   else if (description === 'clear') {
    iconEl.innerHTML = "☀️";
  } else if (description === 'rain') {
    iconEl.innerHTML = "🌧";
  }else if (description === 'thunderstorm') {
    iconEl.innerHTML = "⛈";
  }else if (description === 'clear sky') {
    iconEl.innerHTML = "☀️";
  }else if (description === ' scattered clouds') {
    iconEl.innerHTML = "☁️";
  } else if (description === 'overcast clouds') {
    iconEl.innerHTML = "☁️";
  } else {
    iconEl.innerHTML = "🌥";
  }

  const windEl = document.querySelector(".wind");
  const humidity = document.querySelector(".humidity");
  const descriptionEl = document.querySelector(".descritpion");
  cityName.innerHTML = response.data.name;
  setTime();

  
  descriptionEl.innerHTML = description.toUpperCase();
  windEl.innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

  let tempF = Math.round((temp * 9) / 5 + 32);
  console.count(tempF);
 

  tempFahr.addEventListener("click", (event) => {
    event.preventDefault();
    temperatureEl.innerHTML = tempF;
    tempCel.classList.remove('active');
    tempFahr.classList.add('active');
  });

  tempCel.addEventListener("click", (event) => {
    event.preventDefault();
    temperatureEl.innerHTML = temp;
    tempFahr.classList.remove('active');
    tempCel.classList.add('active');

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
  timeEl.innerHTML = `Last updated: ${time}`;
}
