const weatherSearch = document.querySelector('.weather-search')

const country = document.querySelector('.country')
const city = document.querySelector('.city')
const time = document.querySelector('.time')
const value = document.querySelector('.value')
const shortDesc = document.querySelector('.short-desc')
const visibility = document.querySelector('.visibility span')
const wind = document.querySelector('.wind span')
const cloud = document.querySelector('.cloud span')
const body = document.querySelector('body')

async function changeWeatherUI (location) {
    let weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=e1604b36f1d6dec0ff7f35ee16660120`

    let data = await fetch(weatherApiURL)   .then(response => response.json())

    console.log(data)

    city.innerText = data.name
    country.innerText = data.sys.country
    value.innerText = data.main.temp
    let transImgByValue = data.main.temp
    let times = new Date();
    time.innerText = times.toLocaleString()

    shortDesc.innerText = data.weather[0].main
    visibility.innerText = data.visibility + ' m'
    wind.innerText = data.wind.speed + ' m/s'
    cloud.innerText = data.main.humidity + ' %'

    if(transImgByValue < 20) {
        body.classList.add('cold')
        body.classList.remove('hot')
    } else {
        body.classList.add('hot')
        body.classList.remove('cold')
    }
}

changeWeatherUI('ho chi minh')

weatherSearch.addEventListener('keypress' , function (e) {
    if(e.code == 'Enter') {
        changeWeatherUI(weatherSearch.value)
    }
})


