var submitButton = document.getElementById("submit-button")
var cityInputEl = document.getElementById("text-input")
var currentEl = document.getElementById("current-weather")
var fiveDayEl = document.getElementById("five-day")
//here
//var testIcon = "10d"
//var currentIcon = document.getElementById("current-icon").src="http://openweathermap.org/img/wn/"+testIcon+"@2x.png"
var todaysDate = dayjs().format("MM/DD/YYYY")
var cityURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"
var baseURL = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
var apiKey = "da2b293b3075b313e8d3a2cdf1a6b944"
//http://openweathermap.org/img/wn/10d@2x.png

//City fetcher
function getCurrentWeather(){
var city = cityInputEl.value
fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=da2b293b3075b313e8d3a2cdf1a6b944")
.then(function(response) {
    return response.json();
})
.then(function (data) {
    var lat = data[0].lat
    var lon = data[0].lon
    fetch("https://api.openweathermap.org/data/3.0/onecall?lat="+lat+"&lon="+lon+"&appid="+apiKey)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        currentEl.innerHTML=""
        console.log(data)
        var currentTempK = data.current.temp 
        var currentTempF = kToF(currentTempK)
        var currentHum = data.current.humidity
        var currentWind = data.current["wind_speed"]
        var icon = data.current.weather[0].icon 
        console.log(icon)
        var headerEl = document.createElement("h2")
        //var iconTestEl = document.innerHTML = "<img src = '//http://openweathermap.org/img/wn/10d@2x.png'>"
        headerEl.innerHTML = "Current Weather in " + city +" "+ todaysDate+":" 
        currentEl.appendChild(headerEl)
        var currentIcon = document.getElementById("current-icon").src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
        var tempEl = document.createElement("p")
        var windEl= document.createElement("p")
        var humEl = document.createElement("p")
        tempEl.innerHTML = "Temperature: "+currentTempF+"F"
        windEl.innerHTML = "Wind Speed: "+currentWind+" kts"
        humEl.innerHTML = "Humidity: "+currentHum+"%"
        currentEl.appendChild(currentIcon)
        currentEl.appendChild(tempEl)
        currentEl.appendChild(windEl)
        currentEl.appendChild(humEl)

        //Five day forecast
        for (var i = 0; i<5; i++){
            var forecastDiv = document.createElement("div")
            fiveDayEl.appendChild(forecastDiv)
            var forecastHeaderEl = document.createElement("h2")
            var forecastTempEl = document.createElement("p")
            var forecastWindEl= document.createElement("p")
            var forecastHumEl = document.createElement("p")
            forecastHeaderEl.innerHTML = todaysDate+":"
            var futureTempMaxK = data.daily[i].temp.max
            var futureTempMinK = data.daily[i].temp.min
            var futureTempMaxF = kToF(futureTempMaxK)
            var futureTempMinF = kToF(futureTempMinK)
            var forecastWind = data.daily[i]["wind_speed"]
            var forecastHum = data.daily[i].humidity
            forecastTempEl.innerHTML= "Temperature (Max/Min): "+futureTempMaxF+"F/"+futureTempMinF+"F"
            forecastWindEl.innerHTML= "Windspeed: "+forecastWind+" Kts"
            forecastHumEl.innerHTML = "Humidity: "+ forecastHum +"%"
            forecastDiv.appendChild(forecastTempEl)
            forecastDiv.appendChild(forecastWindEl)
            forecastDiv.appendChild(forecastHumEl)
        }
    })
})
}

//Kelvin to F converter
function kToF(kelvin){
    var far = Math.round((kelvin - 273.15) *1.8 + 32)
    return far
}

submitButton.addEventListener("click", function(){
    getCurrentWeather()
})