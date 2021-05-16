function everything1(array, fnt){
  let result = true;
  array.forEach(n => {
    if(!fnt(n))
      result = false;
  });
  return result;
}

function everything2(array, fnt){
  return !(array.some(n => !fnt(n)));
}

console.log(everything2([1, 3, 5], n => n < 10));
console.log(everything2([2, 4, 16], n => n < 10));
console.log(everything2([], n => n < 10));
