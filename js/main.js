//today data
let todayName = document.getElementById("todayName") 
let todayNumber = document.getElementById("todayDate-number")
let todayMonth = document.getElementById("todayDate-month")
let todayLocation = document.getElementById("todayLocation")
let todayTemp = document.getElementById("todayTemp")
let todayConditionImg = document.getElementById("todayConditionImg")
let todayConditionText = document.getElementById("todayCondidtionText")
let humidity= document.getElementById("humidity")
let wind= document.getElementById("wind")
let windDirection= document.getElementById("windDirection")
let date = new Date()
console.log(date)
//next day data
let nextDayName = document.getElementsByClassName("nextDayName")
let nextMaxTemp = document.getElementsByClassName("num-tomorow")
let nextMinTemp = document.getElementsByClassName("small-num-tomorow")
// let nextConditionImg = document.getElementById("")
let nextConditionText = document.getElementsByClassName("custom")
//search input
let searchInput = document.getElementById("search")
// fetch data from Api
async function getWeatherData(cityName){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a997780e42f64e90970104807242201&q=${cityName}&days=4`)
    let weatherData =await weatherResponse.json()//await 3lshan ablaha kant el data btrga3 b type promise
    return weatherData
}

//display today data
function displayTodayData(data){
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-us",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us",{month:"long"})
todayLocation.innerHTML = data.location.name
todayTemp.innerHTML = data.current.temp_c+"^C"
todayConditionImg.setAttribute("src", data.current.condition.icon)
todayConditionText.innerHTML = data.current.condition.text
humidity.innerHTML = data.current.humidity+"%"
wind.innerHTML = data.current.wind_kph+"km/h"
windDirection.innerHTML = data.current.wind_dir

}
//display next days data
function displayNextData(data){
    let forecastData = data.forecast.forecastday
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i+1].date)
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-us",{weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text

        
    }
}

//start calling
async function startApp(city = "cairo"){
    let weatherData = await getWeatherData(city)
    if (!weatherData.error) 
        displayTodayData(weatherData)// hena b3at eldata ellu 3amltlha fetch mn al api ll func ally hat3mellaha display fel today data
        displayNextData(weatherData)
        
}
startApp()

searchInput.addEventListener("input",function(){
startApp(searchInput.value)
})