function setup(){
  createCanvas(100, 100);
	//strokeWeight을 통해 선의 굵기를 지정
  strokeWeight(8);
}

function draw(){
  background(204);
	//현재 마우스 위치와 이전 마우싀 위치를 잇는 선을 그린다
  line(mouseX, mouseY, pmouseX, pmouseY);
}
