function countBy(items, groupName){
  let counts = [];
  for(let item of items){
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if(known == -1){
      counts.push({ name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function evenOdd(n){
  return n % 2 === 0 ? 'even' : 'odd';
}

function dominantEvenOdd(str){
  return countBy(str.split(""), evenOdd).
    reduce((a,b) => a.count > b.count ? a : b).
    name;
}

console.log(dominantEvenOdd("1234861982"));
