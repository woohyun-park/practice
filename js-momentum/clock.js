//시계를 불러오는 자바스크립트

const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
  //new Date()을 통해 현재 시간정보를 불러온다.
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  //백택 속에서 변수를 사용할때, 삼항연산자를 사용해서 간단한 조건식을 만들어 줄 수 있다.
  //${조건 ? 참일시 실행 : 거짓일시 실행}과 같은 방식으로 사용이 가능하다
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

function init(){
  //먼저 getTime을 한번 불러주고,
  getTime();
  //그 이후부터는 setInterval()을 통해서 몇초마다 함수를 실행할 것인지를 결정한다.
  setInterval(getTime, 1000);
}

init();
