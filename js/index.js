

searchInp =document.querySelector('#search')

async function search(city) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    if (data.ok && 400 != data.status) {
        let city = await data.json();
        displayToday(city.location, city.current),
        displayOther(city.forecast.forecastday)
    }
}
searchInp.addEventListener("keyup", function(city) {
    search(city.target.value)
}
);
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayToday(city, data) {
    if (null != data) {
        var time = new Date(data.last_updated);
        console.log(time)
        let box = `<div class="col-lg-4 firstcol">
          <div class="d-flex justify-content-between date">
            <span>${days[time.getDay()]}</span>
            <span>${time.getDate() + '  '+ monthNames[time.getMonth()]}</span>
          </div>
          <div class="info-prim">
            <p class="city">${city.name}</p>
            <p class="temp text-white">${data.temp_c}<sup>o</sup>C</p>
            <img width="90px" src="https:${data.condition.icon}" alt="">
            <p class="custom">${data.condition.text}</p>
            <span><i class="fa-solid fa-umbrella"></i>${data.cloud}%</span>
            <span><i class="fa-solid fa-wind"></i>${data.humidity}km/h</span>
            <span><i class="fa-regular fa-compass"></i>East</span>
          </div>
        </div>`
        document.getElementById("forecast").innerHTML = box
    }}
    
    


function displayOther(city) {
    let data = "";
    
    for (let i = 1; i < city.length; i++)
       
        data += 
    `   <div class="col-lg-4  text-center" >
            <div class=" date ">
                <span>${days[new Date(city[i].date).getDay()]}</span>
            </div>
            <div class="info">
                <img src="https:${city[i].day.condition.icon}" alt="" width="48px">
                <p class="deg text-white m-0">${city[i].day.maxtemp_c}<sup>o</sup>C</p>
                <small>${city[i].day.mintemp_c}<sup>o</sup></small>
                <p class="custom">${city[i].day.condition.text}</p>
            </div>
        </div> 
    `
    document.getElementById("forecast").innerHTML += data
}
search("london");


