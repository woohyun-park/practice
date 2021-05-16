//concat과 reduce를 사용해서 2차원 배열을 1차원 배열로 평활화

let array = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
];

//concat과 reduce를 사용하지 않은 버전
function to1DArray(array){
  let result = [];

  array.forEach(n => {
    n.forEach(n => result.push(n));
  })
  return result;
}

//concat과 reduce를 사용한 버전
function to1DArray2(array){
  return array.reduce((a, b) => a.concat(b));
}
