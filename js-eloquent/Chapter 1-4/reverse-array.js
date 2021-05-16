let array = [1, 2, 3, 4, 5];

function reverseArray(array){
  let result = [];
  for(let number of array){
    result.unshift(number);
  }
  return result;
}

function reverseArrayInPlace(array){
  const len = array.length;
  for(let i = 0; i < len / 2; i++){
    const tmp = array[i];
    array[i] = array[len - i - 1];
    array[len - i - 1] = tmp;
  }
}


function timer(func, num){
  let start = performance.now();
  for(let i = 0; i < num; i++){
    func;
  }
  let end = performance.now();
  console.log(end - start);
}

timer(reverseArray(array), 100);
timer(reverseArrayInPlace(array), 100);
timer(reverseArray(array), 1000000);
timer(reverseArrayInPlace(array), 1000000);
