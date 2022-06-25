// const axios = require('axios').default;

const key = "a98d70d03d8de2cdd126f4062901ce92";
let city = "";

const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".search-field");
const cityName = document.querySelector(".city-name");
const currentLoc = document.querySelector(".location");
const iconEl = document.querySelector(".icon-title");

formEl.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  // let city = inputEl.value;

  // if (!city) {
  //   return;
  // }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  // cityName.innerHTML = city;

  axios.get(url).then(showWeather);
  event.currentTarget.reset();
}

function showWeather(response) {
  if(!response.data.name) {
    return;
  } 
  
  let temp = Math.round(response.data.main.temp);
  const tempEl = document.querySelector(".text-title");
  tempEl.innerHTML = temp;
  if (temp >= 20) {
    iconEl.innerHTML = "☀️";
  } else if (temp < 0) {
    iconEl.innerHTML = "☃️";
  } else if (temp > 5 && 19) {
    iconEl.innerHTML = "🌥";
  }
  let wind = response.data.wind.speed;
  const windEl = document.querySelector(".wind");
  cityName.innerHTML = response.data.name;
  windEl.innerHTML = ` Wind speed: ${wind}`;
  console.log(temp);
}

currentLoc.addEventListener("click", onBtnClick);

function onBtnClick(event) {
  event.preventDefault();
  console.log("current location");
  navigator.geolocation.getCurrentPosition(showLocation);
}

navigator.geolocation.getCurrentPosition(showLocation);

function showLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}
