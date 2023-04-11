let allData = [];
let inputCountry = document.querySelector("#inputCountry");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const d = new Date();

async function getTodayWeather(countryCode) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.jsondt=2023-02-24?key=31aa1b0a7f5549a7800213957231902&q=${countryCode}&days=3`
  );
  let finalResult = await res.json();
  allData = finalResult;
  displayData();
  tomorrowData();
  afterTomorrowData();
}

function displayData() {
  let container = `       <div class="forecast-header d-flex justify-content-between">
    <div class="day">${days[d.getDay()]}</div>
    <div class="date">${d.getDate()}${months[d.getMonth()]}</div>
  </div>
  <div class="forecast-content p-4">
    <div class="location">${allData.location.name}</div>
    <div class="degree d-flex flex-wrap align-items-center text-white">
      <div class="num">${allData.current.temp_c}<sup>o</sup>C
      </div>
      <div class="icon">
        <img
          src="${allData.current.condition.icon}"
          alt=""
          width="90"
        />
      </div>
    </div>
    <div class="custom">${allData.current.condition.text}</div>
    <span>
      <img
        src="https://routeweather.netlify.app/images/icon-umberella.png"
        alt=""
      />
       ${allData.current.humidity}%
    </span>
    <span>
      <img
        src="https://routeweather.netlify.app/images/icon-wind.png"
        alt=""
      />
      ${allData.current.wind_kph}km/h
    </span>
    <span>
      <img
        src="https://routeweather.netlify.app/images/icon-compass.png"
        alt=""
      />
      ${allData.current.wind_dir} 
    </span>
  </div>`;
  document.querySelector(".today-forecast").innerHTML = container;
}

function tomorrowData() {
  const tomorrow = new Date(allData.forecast.forecastday[1].date);
  let container = `
  <div class="forecast-header">
              <div class="day">${days[tomorrow.getDay()]}</div>
            </div>

            <div class="forecast-content">
              <div class="icon mb-4">
                <img
                  src="${allData.forecast.forecastday[1].day.condition.icon}"
                  alt=""
                />
              </div>
              <div class="degree text-white">${
                allData.forecast.forecastday[1].day.maxtemp_c
              } <sup>o</sup> C</div>
              <small>${
                allData.forecast.forecastday[1].day.mintemp_c
              } <sup>o</sup> C</small>
              <div class="custom">${
                allData.forecast.forecastday[1].day.condition.text
              }</div>
            </div>`;
  document.querySelector(".tomorrow-forecast").innerHTML = container;
}

function afterTomorrowData() {
  const afterTomorrow = new Date(allData.forecast.forecastday[2].date);

  let container = `
  <div class="forecast-header">
              <div class="day">${days[afterTomorrow.getDay()]}</div>
            </div>

            <div class="forecast-content">
              <div class="icon mb-4">
                <img
                  src="${allData.forecast.forecastday[2].day.condition.icon}"
                  alt=""
                />
              </div>
              <div class="degree text-white">${
                allData.forecast.forecastday[2].day.maxtemp_c
              } <sup>o</sup> C</div>
              <small>${
                allData.forecast.forecastday[2].day.mintemp_c
              } <sup>o</sup> C</small>
              <div class="custom">${
                allData.forecast.forecastday[2].day.condition.text
              }</div>
            </div>`;
  document.querySelector(".forecast").innerHTML = container;
}

getTodayWeather("egypt");

inputCountry.addEventListener("keyup", function (e) {
  if (e.target.value.length > 3) {
    getTodayWeather(e.target.value);
  }
});
