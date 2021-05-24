class Vec {
  constructor(x, y){
    this.vec = {
      x, y
    };
  }
  plus(other){
    return new Vec(this.x + other.x, this.y + other.y);
  }
  minus(other){
    return new Vec(this.x - other.x, this.y - other.y);
  }
}

let length = Symbol("length");

Vec.prototype[length] = function() {
  return Math.sqrt(this.vec.x * this.vec.x + this.vec.y + this.vec.y);
}

let test = new Vec(2, 2);
console.log(test.vec);
console.log(test[length]());
