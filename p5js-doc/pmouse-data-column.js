function setup(){
  createCanvas(100, 100);
  noStroke();
  fill(0);
}

//2개의 단으로 나누어 왼족에 커서가 있으면 왼쪽에 사각형을,
//오른쪽에 커서가 있으면 오른쪽에 사각형을 표시하는 인터랙션
function draw(){
  background(204);
  if (mouseX < 50){
    rect(0, 0, 50, 100);
  } else {
    rect(50, 0, 50, 100);
  }
}

//마찬가지이지만 이번에는 3개의 단으로 나누는 인터랙션
function draw(){
  background(204);
  if (mouseX < 33){
    rect(0, 0, 33, 100);
  } else if (mouseX < 66){
    rect(33, 0, 33, 100);
  } else {
    rect(66, 0, 33, 100);
  }
}
