const data = document.querySelector(".data");
const city = document.querySelector("#city");
const search = document.querySelector(".search");

const weather_type={
    0:["Clear Sky","0"],
    1:["Mainly Clear","1"],
    2:["Partly Cloudy","1"],
    3:["Overcast","1"],
    45:["Fog","45"],
    48:["Depositing Rime Fog","45"],
    51:["Light Drizzle","51"],
    53:["Moderate Drizzle","51"],
    55:["Dense Intensity Drizzle","51"],
    56:["Light Freezing Drizzle","51"],
    57:["Dense Intensity Freezing Drizzle","51"],
    61:["Slight Rain","51"],
    63:["Moderate Rain","51"],
    65:["Heavy Intensity Rain","51"],
    66:["Light Freezing Rain","51"],
    67:["Heavy Intensity Freezing Rain","51"],
    71:["Slight Snow fall","71"],
    73:["Moderate Snow fall","71"],
    75:["Heavy Intensity Snow fall","71"],
    77:["Snow grains","71"],
    80:["Slight Rain Showers","51"],
    81:["Moderate Rain Showers","51"],
    82:["Violent Rain Showers","51"],
    85:["Slight Snow Showers","71"],
    86:["Heavy Snow Showers","71"],
    95:["Thunderstorm","95"],
    96:["Thunderstorm with slight hail","95"],
    99:["Thunderstorm with heavy hail","95"]
}

let city_name = "Noida";
let city_print,country;

async function city_details(city_name) {
    let api = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city_name}`);
    let details = await api.json();

    return details;
}

async function weather(city_name) {
    let city_api = await city_details(city_name);
    let lat = city_api.results[0].latitude;
    let long = city_api.results[0].longitude;

    // console.log(lat);
    // console.log(long);

    city_print=city_api.results[0].name;
    country=city_api.results[0].country;

    // console.log(city_print);
    // console.log(country);

    let weather_details = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,visibility,precipitation_probability,pressure_msl&daily=temperature_2m_max,temperature_2m_min,weather_code`);
    let details=await weather_details.json();

    return details;

}

async function show_weather(){
    if(city.value) city_name=city.value;

    let details=await weather(city_name);

    let temp=details.current.temperature_2m;
    let feels_like=details.current.apparent_temperature;
    let humidity=details.current.relative_humidity_2m;
    let wind=details.current.wind_speed_10m;
    let pressure=details.current.pressure_msl;
    let visi=details.current.visibility;
    let precipitation=details.current.precipitation_probability;
    let weathercode=details.current.weather_code;

    let min_temp=details.daily.temperature_2m_min;
    let max_temp=details.daily.temperature_2m_max;
    let weekly_weathercode=details.daily.weather_code;
    let dates=details.daily.time;

    // console.log(weather_type[weathercode][1])

    // console.log(min_temp);
    // console.log(max_temp);
    // console.log(weekly_weathercode);
    // console.log(dates);

    data.innerHTML=`<div class="city-name">${city_print}, ${country}</div>
            <div class="today-weather">
                <div class="temperatures">
                    <div class="current-temp">${temp}°C</div>
                    <div class="max-min">L ${min_temp[0]}° | H ${max_temp[0]}° </div>

                </div>
                <div class="weather"><img src="assets/${weather_type[weathercode][1]}.png" alt="">
                    <div class="about">${weather_type[weathercode][0]}</div>
                </div>
            </div>
            <hr>
            <div class="middle">
                <div class="prop"> <img src="assets/feels_like.png" alt="">&ThinSpace;Feels like</div>
                <div class="value"> ${feels_like}°C
                </div>
            </div>
            <div class="middle"><img src="assets/humidity.png" alt="">&ThinSpace;Humidity <div class="value">${humidity}%</div>
            </div>
            <div class="middle"><img src="assets/wind_speed.png" alt="">&ThinSpace;Wind Speed <div class="value">${wind}
                    km/h</div>
            </div>
            <div class="middle"><img src="assets/pressure.png" alt="">&ThinSpace;Pressure <div class="value">${pressure} hPa
                </div>
            </div>
            <div class="middle"><img src="assets/visibility.png" alt="">&ThinSpace;Visibility <div class="value">${visi/1000} km
                </div>
            </div>
            <div class="middle"><img src="assets/51.png" alt="">&ThinSpace;Precipitation <div class="value">${precipitation}%</div>
            </div>
            <hr>
            <div class="week">
                <div class="date">${dates[1]}</div> <img src="assets/${weather_type[weekly_weathercode[1]][1]}.png" alt="">
                <div class="low-high">L ${min_temp[1]}° | H ${max_temp[1]}°</div>
            </div>
            <hr>
            <div class="week">
                <div class="date">${dates[2]}</div> <img src="assets/${weather_type[weekly_weathercode[2]][1]}.png" alt="">
                <div class="low-high">L ${min_temp[2]}° | H ${max_temp[2]}°</div>
            </div>
            <hr>
            <div class="week">
                <div class="date">${dates[3]}</div> <img src="assets/${weather_type[weekly_weathercode[3]][1]}.png" alt="">
                <div class="low-high">L ${min_temp[3]}° | H ${max_temp[3]}°</div>
            </div>
            <hr>
            <div class="week">
                <div class="date">${dates[4]}</div> <img src="assets/${weather_type[weekly_weathercode[4]][1]}.png" alt="">
                <div class="low-high">L ${min_temp[4]}° | H ${max_temp[4]}°</div>
            </div>
            <hr>
            <div class="week">
                <div class="date">${dates[5]}</div> <img src="assets/${weather_type[weekly_weathercode[5]][1]}.png" alt="">
                <div class="low-high">L ${min_temp[5]}° | H ${max_temp[5]}°</div>
            </div>
            <hr>
            <div class="week">
                <div class="date">${dates[6]}</div> <img src="assets/${weather_type[weekly_weathercode[6]][1]}.png" alt="">
                <div class="low-high">L ${min_temp[6]}° | H ${max_temp[6]}°</div>
            </div>`;
    city.value="";
}
show_weather();

search.addEventListener("click",show_weather);

city.addEventListener("keydown",(e)=>{
    if(e.key=="Enter") show_weather();
})