//날씨정보를 가져오는 자바스크립트

const weather = document.querySelector(".js-weather");

//API 키를 통해서 API를 가져올수 있도록 한다. 뒤에 설명 참조
const API_KEY = "4d022992c384e5464e8587ccf69f6a6f";
const COORDS = 'coords';

function getWeather(lat, lng){
  //fetch라는 함수를 통해서 웹사이트의 정보를 가져올 수 있다. openweathermap에서 제공하는 링크의 형식대로 fetch를 하면 해당 링크에서 정보를 가져오게 되는 것이다.
  //then이라는 함수는 이전 함수가 실행이 되고 나서 해당 명령을 실행하도록 해주는 함수이다.
  //fetch된 정보가 response라는 변수에 저장되고, 그 변수에서 json값만 return 해줌으로써 다음 함수를 실행하게 된다. 해당 API에서 제공하는 정보에는 main.temp속에 temperature 정보가, name속에 도시정보가 들어있으므로, json.main.temp, json.name을 통해 필요한 정보만을 가져와서 html속에 업데이트 해주는 모습이다.
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
    return response.json();
  })
  .then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature}@ ${place}`;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log("Can't access geo location")
}

function askForCoords(){
  //navigator.geolocation.getCurrentPosition을 통해서 위치정보를 가져오는데 성공하면 전자를 실행하고, 실패하면 후자를 실행하게 된다.
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }
  else{
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
