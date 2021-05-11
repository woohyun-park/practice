function setup() {
  createCanvas(100, 100);
  noStroke();
  fill(0);
}
function draw() {
  background(204);
	//마우스가 사각형 범위 안에 있다면 흰색으로 그렇지 않다면 검정색으로 표시
  if ((mouseX > 40) && (mouseX < 80) && (mouseY > 20) && (mouseY < 80)){
    fill(255);
  }
  else {
    fill(0);
  }
  rect(40, 20, 40, 60);
}

function draw() {
  background(204);
	//동서남북으로 조건을 나누어서 마우스가 위치한 공간을 검정색으로 표시
  if ((mouseX <= 50) && (mouseY <= 50)) {
    rect(0, 0, 50, 50);   // Upper-left
  }
  else if ((mouseX <= 50) && (mouseY > 50)) {
    rect(0, 50, 50, 50);  // Lower-left
  }
  else if ((mouseX > 50) && (mouseY <= 50)) {
    rect(50, 0, 50, 50);  // Upper-right
  }
  else {
    rect(50, 50, 50, 50); // Lower-right
  }
}
