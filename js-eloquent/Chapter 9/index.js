//1. 정규 표현식 골프
// const regex1 = /ca(r|t)/g;
const regex1 = /ca[rt]/g;
console.log("car or cat".match(regex1));

const regex2 = /pr?op/g;
console.log("pop or prop".match(regex2));

const regex3 = /ferr(et|y|ari)/g;
console.log("ferret or ferry or ferrari".match(regex3));

//단어의 경계 + 영문자 0개이상 + ious + 단어의 경계
const regex4 = /\b\w*ious\b/g;
console.log("how delicious, spacious room".match(regex4));

const regex5 = /\s[.,;:]/g;
console.log(" .       , ; :".match(regex5));

//단어의 경계 + 공백이 아닌 문자가 6개 이상 + 단어의 경계
// const regex6 = /\b[^\s]{6,}?\b/g;
const regex6 = /\w{6,}/g;
console.log("this is six correct hellllo".match(regex6));

//단어의 경계 + e, E, 공백이 아닌 문자가 1개이상 (탐욕x) + 단어의 경계
const regex7 = /\b[^eE\s]+?\b/g;
console.log("this contains CONTAINER container".match(regex7));

//2. 인용구 스타일
const regex8 = /\W'|'\W/g;
// console.log(" 'This isn't real' ".match(regex8));
console.log(" 'This isn't real' ".replace(regex8, "\""));

//3. 숫자 반복
// (\+|-)?: +-가 있거나 없거나
// (\d+(\.\d*)?: 숫자, 숫자.숫자의 형태이거나
// (\.\d+): .숫자의 형태이거나
// (((e|E)(\+|-)?)\d+)?: e숫자 또는 E숫자의 형태이거나
const number = /^(\+|-)?((\d+(\.\d*)?)|(\.\d+))(((e|E)(\+|-)?)\d+)?$/;
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
                 "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
                 ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}
