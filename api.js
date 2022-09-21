key = 'daaab66f88053202e572ccb7149b2d29';

getweather = (city) => {
  let a = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}&units=metric`;
  fetch(a).then(res => res.json()).then(weatherdata => show(weatherdata))
};

show = (data) => {
  const { name } = data;
  const { country } = data.sys;
  const { temp, humidity } = data.main;
  const { icon, main } = data.weather[0];
  const { speed } = data.wind;
  const { lat, lon } = data.coord;
  console.log("current: ", name, country, temp, humidity, icon, main,lat,lon);

  // connecting the javascript with the html 

  document.querySelector(".city").innerText = "Weather in " + name + "," + country;
  document.querySelector(".wicon").src = "https://openweathermap.org/img/wn/" + icon + "@2x" + ".png";
  document.querySelector(".description").innerText = main;
  document.querySelector(".temp").innerText = temp.toFixed(0) + "°C";
  document.querySelector(".humidity").innerText = humidity + "%";
  document.querySelector(".wind").innerText = (speed * (3.6)).toFixed(0) + " km/h";
  document.querySelector(".latitude").innerText = lat;
  document.querySelector(".longitude").innerText = lon;

//this is the api u must use rather than forecast it is one call api https://api.openweathermap.org/data/2.5/onecall?lat=19.0144&lon=72.8479&exclude=hourly,minutely,alerts&appid=daaab66f88053202e572ccb7149b2d29

  let b = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${key}`
  fetch(b).then(res => res.json()).then(forcastdata => forcast(forcastdata))

};

forcast = (newdata) => {
  const { temp } = newdata.list[0].main;
  const { main, icon } = newdata.list[0].weather[0];
  console.log("forcast: ", temp, main, icon)

  // todo: you have to loop all the api data with the html 
  //  and also loop the days 

  // loop for 5 days temperature 

  for (let i = 4; i < 40; i += 8) {
    document.querySelector(".th").innerText = newdata.list[i].main.temp;
    desc = newdata.list[i].weather[0].description;
    dailyicon = newdata.list[i].weather[0].icon;
    console.log(desc, dailyicon);
  }

}

getweather("mumbai");