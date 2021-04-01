//to-do 리스트를 설정하고 불러오는 자바스크립트

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDos";

let toDos = [];

function deleteToDo(event){
  //eventListener를 통해서 불러온 event 오브젝트의 타켓과, 그 타겟의 부모노드를 가져옴으로써 삭제할 엘레먼트를 가져온다.
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  //filter(function)는 함수를 인자로 받아서, 해당 함수가 참을 반환하는 엘레먼트만을 가진 배열을 반환한다.
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  //JSON.stringify()는 인자를 받아서 해당 인자를 string의 형식으로 변환해준다. localStroge는 모든 정보를 value에 string 형식으로 저장하는데, 따라서 JSON.stringfy를 통해 string으로 변환하여 저장한 뒤, 다시 JSON.parse를 통해 string을 기존 형태로 바꾸어주는 트릭을 사용하였다.
  localStorage.setItem(TODO_LS, JSON.stringify(toDos))
}

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODO_LS);
  if(loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos);
    //forEach(function)는 함수를 인자로 받아서, 그 함수를 모든 요소에 적용시켜주는 함수이다.
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    })
  } else{

  }
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
