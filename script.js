const weatherApi = {
    key : '1583a8c1140f569ff45c57f17ec621eb',
    baseUrl : 'https://api.openweathermap.org/data/2.5/weather'
}


function getWeatherReport(city){
    //  * fetch('https://api.openweathermap.org/data/2.5/weather?q=Tunis&appid=1583a8c1140f569ff45c57f17ec621eb&units=metric')
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(data => { return  data.json()})
    .then(showWeatherReport)
    .catch(err => alert('ERRO HAPPENED'))
}

let searchInputBox = document.getElementById('input-box');

searchInputBox.addEventListener('keypress', (e)=>{
if(e.key === 'Enter'){
  getWeatherReport(searchInputBox.value)
}
})
function showWeatherReport(weather){
let city_code = weather.cod ;
if(city_code === '400'){
    alert('Empty input, enter any city name')
}
else if (city_code ==='404'){
    alert("Bad input , city name is not matched")
}
else {
    let op=document.getElementById('weather-body');
    let parent=document.getElementById('parent');
    op.style.display='block';
    op.innerHTML=`
    <div class='location-details'>
    <div class='city'> ${weather.name}, ${weather.sys.country}</div>
    <div class='date'> ${new Date()}</div>
    </div>
    <div class="weater-status">
 <div class="temp">
     ${Math.round(weather.main.temp)}&deg;c
 </div>
 <div class="weather"> ${weather.weather[0].main} 
 <i class="${getIcon(weather.weather[0].main)}"></i></div>
 </div>
 <div class="min_max">
    ${Math.floor(weather.main.temp_min)}&deg;c (min) /
    ${Math.ceil(weather.main.temp_max)}&deg;c (max) 
 </div>
 
 
  
  `;
  parent.append(op);
  changeBg(weather.weather[0].main);

}
}
function getIcon(classIcone) {
    if (classIcone === 'Rain') {
        return 'fas fa-cloud-showers-heavy';
    } if (classIcone === 'Sun') {
        return 'fas fa-sun';
    }  if (classIcone === 'Clouds') {
        return 'fas fa-cloud';
    }  if (classIcone === 'Snow') {
        return 'fas fa-snowflake';
    }  if (classIcone === 'Thunderstorm') {
        return 'fas fa-bolt';
    }  if (classIcone === 'ClearNight') {
        return 'fas fa-moon';
    }  if (classIcone === 'CloudyNight') {
        return 'fas fa-cloud-moon';
    } else {
        // Si le weather icon n'est pas reconnu, retourner une icône par défaut
        return 'fas fa-question';
    }
}



/*function getIcon(classIcone){
    if(classIcone === 'Rain'){
        return 'fas fa-cloud-showers-heavy'
    }
    // Rain,Snow,sunny,clouds
}*/

function changeBg(weather_status){
    if(weather_status === 'Clear'){
        document.body.style.backgroundImage = 'url(img/clear.jpeg)'
    }
    if(weather_status === 'Rain'){
        document.body.style.backgroundImage = 'url(img/rain.jpeg)'
    }
    if(weather_status === 'Snow'){
        document.body.style.backgroundImage = 'url(img/snow.jpeg)'
    }
    if(weather_status === 'Clouds'){
        document.body.style.backgroundImage = 'url(img/clouds.jpeg)'
    }
    if(weather_status === 'Sunny'){
        document.body.style.backgroundImage = 'url(img/sunny.jpeg)'
    }
    // Rain,Snow,sunny,clouds
}
