//인사말을 불러오는 자바스크립트

const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text){
  //localStorage에는 간단한 정보들을 string의 형태로 로컬에 저장해 놓을 수 있다.
  //setItem(key, value)의 형식을 통해서 정보를 저장가능하.
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
  //event.preventDefault()를 통해서 페이지가 새로고침되는것을 방지해주었다.
  //form을 submit하게되면, 자동으로 페이지가 새로고침되는데, 이를 해당 함수로 막아주는 것이다.
  event.preventDefault();
  const currentValue = input.value;
  paintGreetings(currentValue);
  saveName(currentValue);
}

function askForName(){
  //classList는 해당 엘레먼트에 적용된 모슨 클래스를 오브젝트의 형태로 포함하고 있다.
  //classlist속 add()와 remove()를 사용하여 해당 엘리먼트에 클래스를 적용하거나 삭제할 수 있다.
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreetings(text){
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName(){
  //localStorge속 getItem()을 사용하여 해당 key값의 value값을 string으로 반환할 수 있다.
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  } else{
    paintGreetings(currentUser);
  }
}

function init(){
  loadName();
}

init();
