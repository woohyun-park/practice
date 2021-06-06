//재시도
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(n1, n2){
  const rand = Math.random();
  if(rand < 0.2){
    return n1 * n2;
  } else {
    throw new MultiplicatorUnitFailure();
  }
}

for(;;){
  try{
    console.log(primitiveMultiply(1, 2));
    break;
  } catch(e){
    console.log(e);
  }
}

//잠긴 상자
const box = {
  locked: true,
  unlock(){
    this.locked = false;
  },
  lock(){
    this.locked = true;
  },
  _content: [],
  get content(){
    if(this.locked){
      throw new Error("Locked!");
    }
    return this._content;
  }
}

function withBoxUnlocked(body){
  const locked = box.locked;
  box.unlock();
  try{
    body();
  } finally{
    if(locked){
      box.lock();
    }
  }
}

withBoxUnlocked(function(){
  box.content.push("gold piece");
});

try{
  withBoxUnlocked(function(){
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch(e){
  console.log("Error raised: ", e);
}
console.log(box.locked);
