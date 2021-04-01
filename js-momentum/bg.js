//백그라운드 이미지를 불러오는 자바스크립트

const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
  //new Image()를 통해서 새로운 image 엘레먼트를 생성
  const image = new Image();

  //image에 src와 class를 더해준다
  image.src = `image/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");

  //body에 prepend를 통해 image를 삽입해준다
  body.prepend(image);
}

function getRandom(){
  const number = Math.floor(Math.random() * 3);
  return number;
}

//니꼬썜은 언제나 init()을 통해서 모든걸 제어하는 방식을 사용한다
function init(){
  const randomNumber = getRandom();
  paintImage(randomNumber);
}

init();
