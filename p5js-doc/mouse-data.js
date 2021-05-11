function setup() {
  createCanvas(100, 100);
  noStroke();
}

//단순히 마우스의 위치에 원을 그리는 코드
function draw() {
  background(126);
  ellipse(mouseX, mouseY, 33, 33);
}

//원 3개를 각각 다른 위치에 그리고, 마우스의 X좌표에 따라
//좌우로 움직이도록 하는 인터랙션
function draw() {
  background(126);
  ellipse(mouseX, 16, 33, 33);    // Top circle
  ellipse(mouseX+20, 50, 33, 33); // Middle circle
  ellipse(mouseX-20, 84, 33, 33); // Bottom circle
}

//원 3개를 각각 다른 위치에 그리고, 마우스의 x좌표에 상수를 곱한값에 따라
//좌우로 각기 다른 속도로 움직이도록 하는 인터렉션
function draw() {
  background(126);
  ellipse(mouseX, 16, 33, 33);   // Top circle
  ellipse(mouseX/2, 50, 33, 33); // Middle circle
  ellipse(mouseX*2, 84, 33, 33); // Bottom circle
}

//기본 마우스 좌표인 x, y 그리고 반전되는 마우스 좌표인 ix, iy를 두어서
//정반대의 인터랙션을 보여주는 원을 두개 만드는 인터렉션
function draw() {
  let x = mouseX;
  let y = mouseY;
  let ix = width - mouseX;
  let iy = height - mouseY;
  background(126);
  fill(255, 150);
  ellipse(x, height/2, y, y);
  fill(0, 159);
  ellipse(ix, height/2, iy, iy);
}
