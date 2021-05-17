const tmp = {coords: [0, 2, 3], length: 5};

function normalize1() {
  console.log(this.coords.map(n => n / this.length));
}

function normalize2(){
  console.log(this.coords.map(function(n){
    return n / this.length;
  }));
};

const normalize11 = (n) => console.log(this);
const normalize22 = function(n){
  console.log(this);
}

normalize1.call(tmp);
normalize2.call(tmp);
normalize11.call(tmp);
normalize22.call(tmp);


// const person = {name: 'dooddi', age: 4};
//
// const fn1 = function(arg){
//   console.log(this, arg);
// };
//
// const fn2 = arg => {
//   console.log(this, arg);
// };
//
// fn1.call(person, 10);
// fn2.call(person, 10);

class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line){
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
killerRabbit.speak("I WILL KILL YOU");
