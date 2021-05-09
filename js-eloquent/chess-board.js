let width = 5;
let height = 10;

for(let i = 1; i <= height; i++){
  let tmp = "";
  for(let j = 1; j <= width; j++){
    if((i + j) % 2 === 0){
      tmp += '#';
    } else{
      tmp += ' ';
    }
  }
  console.log(tmp);
}
