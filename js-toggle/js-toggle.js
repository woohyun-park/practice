// nomadcoders.co

const title = document.querySelector("#title");
const CLICKED_CLASS = "clicked";

function handleClick() {
  /* 해당 코드는 class가 여러개가 있을때는 제대로 작동하지 않음
  const currentClass = title.className;
  if (currentClass == CLICKED_CLASS){
    title.classList.remove(CLICKED_CLASS);
  } else {
    title.classList.add(CLICKED_CLASS);
  } */

  /* 해당 코드는 class가 여러개 있을때도 작동하나, 코드가 길다
  const hasClass = title.classList.contains(CLICKED_CLASS);
  if (hasClass){
    title.classList.remove(CLICKED_CLASS);
  } else {
    title.classList.add(CLICKED_CLASS);
  } */

  //해당 코드로 깔끔하게 해당 클래스를 토글할 수 있음
  //HTML, CSS, JS 각각의 혁할에 맞게 코드를 작성하는것이 중요함.
  //HTML에서는 마크업만, CSS에서는 스타일만, JS에서는 로직만 수행할 수 있도록
  //철저하게 나누어서 작성할 것.
  title.classList.toggle(CLICKED_CLASS);
}

function init() {
  title.addEventListener("click", handleClick);
}

init();
