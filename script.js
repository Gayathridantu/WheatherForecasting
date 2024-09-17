const cityName=document.querySelector(".input");
const search=document.querySelector(".searchbar");
const WeatherCard=document.querySelector(".days");
const currentWeatherCard=document.querySelector(".current");
const API_key="55e2775238f63edd851abcd4d593bf31";
const temp=document.querySelector("#temp")
const wind=document.querySelector("#wind")
const humidity=document.querySelector("#Humidity")
const date=document.querySelector("#date")
const createWeatherCard = (weatheritems,index) => {
    if(index==0){
        return  `<div class="details">
        <h2 id="date">(${weatheritems.dt_txt.split(" ")[0]})</h2>
        <p id="temp">Temperature: ${(weatheritems.main.temp -273.15).toFixed(2)}&deg;C</p>
        <p id="wind">Wind: ${weatheritems.wind.speed}ms</p>
        <p id="Humidity">Humidity: ${weatheritems.main.humidity} %</p>
    </div>
    <div class="logo">
                    <img src="https://openweathermap.org/img/wn/${weatheritems.weather[0].icon}@2x.png" alt="logo">
                    <h2 class="vl">${weatheritems.weather[0].description}</h2>
                </div>`

    }
    else{
    return `<div class="a">
    <h2 id="date">(${weatheritems.dt_txt.split(" ")[0]})</h2>
    <img src="https://openweathermap.org/img/wn/${weatheritems.weather[0].icon}@2x.png" alt="logo">
    <p id="temp">Temperature: ${(weatheritems.main.temp -273.15).toFixed(2)}&deg;C</p>
    <p id="wind">Wind:${weatheritems.wind.speed}ms</p>
    <p id="Humidity">Humidity:${weatheritems.main.humidity}%</p>
</div>`}
    /*temp.textContent=weatheritems.main.temp;
    wind.textContent=weatheritems.wind.speed;
    humidity.textContent=weatheritems.main.humidity;
    date.textContent=weatheritems.dt_txt;*/
    
}

const getWeatherDetails= (city,lat,lon)=>{
    const Weather_API_LINK=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;
    fetch(Weather_API_LINK).then(res=> res.json()).then(data => {
        //API forecast will give update for every 5hrs
        const uniqueDays=[];
        const fiveDaysForecast=data.list.filter(forecast => {
                const forecastDate= new Date(forecast.dt_txt).getDate();
                if(!uniqueDays.includes(forecastDate)){
                    return uniqueDays.push(forecastDate);  
                }
        });
        cityName.value="";
        WeatherCard.innerHTML="";
        currentWeatherCard.innerHTML=""
        console.log(fiveDaysForecast)
        fiveDaysForecast.forEach((weatheritems,index,city) => {
            if(index===0){
                currentWeatherCard.insertAdjacentHTML("beforeend",createWeatherCard(weatheritems,index,city));
            }
            else{
            WeatherCard.insertAdjacentHTML("beforeend",createWeatherCard(weatheritems,index,city));
            }
        });
    }).catch(()=>
        {
           alert("INVALID DATA") 
        }
    );
}


const getCityCoordinates=()=>{
    const city=cityName.value.trim();//removes spaces by using trim
    if(!city) return
    const GET_API=`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_key}`;
    
    fetch(GET_API).then(res=>res.json()).then(data=>{
        //if(data.length==0) return alert("Invalid data");
        const {name,lat,lon}=data[0];
        getWeatherDetails(name,lat,lon);
}).catch(()=>{
    alert("invalid data");
});
}

search.addEventListener("click",getCityCoordinates);