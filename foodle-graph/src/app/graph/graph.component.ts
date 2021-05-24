import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  canvas;
  ctx;
  cur = 0;

  constructor() { }

  ngOnInit(): void {
    // const canvas = document.createElement('canvas');
    // const ctx = canvas.getContext('2d');

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    console.log(this.canvas.width);
    document.body.appendChild(this.canvas);

    this.canvas.width = 600;
    this.canvas.height = 300;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(t){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.draw([3, 1, 5]);

    requestAnimationFrame(this.animate.bind(this));
  }

  draw([a, b, c]){
    let points = [{x: 0, y: (6 - a) * 55}, {x: 300, y: (6 - b) * 55}, {x: 600, y: (6 - c) * 55}];
    this.ctx.beginPath();
    this.ctx.fillStyle = "#33333B";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);



    // this.ctx.moveTo(points[0].x, points[0].y);
    // if(this.cur.x < points[1].x){
    //   const cx = (points[0].x + this.cur.x);
    //   const cy = (points[0].y + this.cur.y);
    //
    //   this.ctx.quadraticCurveTo(cx, cy, points[0].x, points[0].y);
    // }
    // this.cur.x += 3;
    // this.cur.y += 2;
    // this.ctx.lineTo(this.cur.x, this.cur.y);
    // this.ctx.lineTo(this.cur.x, this.canvas.height);
    // this.ctx.lineTo(0, this.canvas.height);
    // this.ctx.lineTo(points[0].x, points[0].y);
    //
    // this.ctx.fillStyle = "blue";
    // this.ctx.fill();
    // this.ctx.closePath();



    this.ctx.moveTo(points[0].x, points[0].y);
    for(let i = 1; i < points.length; i++){
      const cx = (points[i - 1].x + points[i].x) / 2;
      const cy = (points[i - 1].y + points[i].y) / 2;
      this.ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, cx, cy);
    }

    this.ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

    // if(this.ctx.lineDashOffset >= -600){
    //   this.ctx.setLineDash([20, 10]);
    //   this.ctx.lineDashOffset -= 3;
    // } else if(this.ctx.lineDashOffset >= -700){
    //   this.ctx.lineDashOffset -= 2;
    // } else if(this.ctx.lineDashOffset >= -800){
    //   this.ctx.lineDashOffset -= 1;
    // }
    this.ctx.strokeStyle = "rgba(218, 180, 45, 1)";
    this.ctx.lineWidth = 5;
    this.ctx.stroke();

    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.lineTo(points[0].x, points[0].y);

    const gra = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gra.addColorStop(0, "rgba(69, 95, 84, 0.5)");
    gra.addColorStop(0.5, "rgba(188, 101, 37, 0.5)");
    gra.addColorStop(1, "rgba(148, 30, 52, 0.5)");

    this.ctx.fillStyle = gra;
    this.ctx.fill();

    if(this.cur < this.canvas.width){
      this.ctx.fillStyle = "#33333B";
      this.ctx.fillRect(this.cur, 0, this.canvas.width, this.canvas.height);
      this.cur += 3;
    }

    this.ctx.closePath();
  }

}
