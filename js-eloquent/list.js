function arrayToList(array){
    let list = null;
    for(let i = array.length - 1; i >= 0; i--){
        list = {value: array[i], rest: list};
    }
    return list;
}

function listToArray(list){
    let array = [];
    for(let node = list; node !== null; node = node.rest){
        array.push(node.value);
    }
    return array;
}

function prepend(value, list){
    let list_tmp = listToArray(list);
    list_tmp.unshift(value);
    return arrayToList(list_tmp);
}

function nth(list, n){
    for(let node = list, count = 0; node !== null; node = node.rest, count++){
        if(count === n)
            return node.value;
    }
    return undefined;
}

function nthRec(node, n, count = 0){
    if(n === count)
        return node.value;
    if(node.rest === null)
        return undefined;
    return nthRec(node.rest, n, ++count);
}

console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
console.log(nthRec(arrayToList([10, 20, 30]), 1));
