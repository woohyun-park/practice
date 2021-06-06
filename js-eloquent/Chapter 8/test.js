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
