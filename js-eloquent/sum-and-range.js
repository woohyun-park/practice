function range(start, end, jump = 1){
  let result = [];
  for(let i = start; jump > 0 ? i <= end : i >= end; i += jump){
    result.push(i);
  }
  return result;
}

function sum(numbers){
  let result = 0;
  for(let number of numbers){
    result += number;
  }
  return result;
}
