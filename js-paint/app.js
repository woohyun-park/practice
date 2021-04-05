//canvas의 getContext()를 통해 canvas 오브젝트를 사용할 수 있음
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  //painting이 false라면 계속해서 x, y위치를 초기화
  //painting이 true라면 line을 생성하고 stroke를 통해 선을 표시
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
  if(filling){
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleSaveClick(event){
  //canvas.toDataURL()을 통해 캔버스에 있는 이미지를 주소로 가져올 수 있음.
  const image = canvas.toDataURL("image/png");

  //HTML 엘리먼트를 생성하고, href에는 링크를, download에는 저장할 이미지 이름을 지정하고,
  //해당 엘리먼트를 click()함으로써 저장을 실행
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

function handleCM(event){
  //오른쪽 버튼을 클릭했을때 나오는 default 액션을 prevent한다
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

if(range){
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}

//HTML Collection인 colors를 Array.from()으로 array로 변환해준다.
//이후 forEach를 통해서 array에 있는 각 엘리먼트들에 eventlistener를 붙여준다.
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);
