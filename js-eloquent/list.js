function arrayToList(array){
    let list = null;
    for(let i = array.length - 1; i >= 0; i--){
				//rest에 자기자신을 참조함으로써 안에서 바깥으로 구현
				//다르게 말하면, 뒤에서부터 리스트를 구현한것.
        list = {value: array[i], rest: list};
    }
    return list;
}

function listToArray(list){
    let array = [];
    for(let node = list; node !== null; node = node.rest){
				//현재 node가 null일때까지 array에 계속해서
				//node.value를 푸시해준다
        array.push(node.value);
    }
    return array;
}

function prepend(value, list){
		//처음에는 return {value, rest: list}와 같은 식으로 구현했으나,
		//그렇게 할 경우 rest에 있는 list는 같은 list를 가리키게 되므로
		//list를 직접 복사해주는 과정이 필요

		//따라서 list를 array로 복사, array의 앞에 value unshift,
		//그리고 array를 다시 list로 변환후 반환
    let list_tmp = listToArray(list);
    list_tmp.unshift(value);
    return arrayToList(list_tmp);
}

function nth(list, n){
		//count를 설정하여 n번째를 찾으면 반환
    for(let node = list, count = 0; node !== null; node = node.rest, count++){
        if(count === n)
            return node.value;
    }
    return undefined;
}

//nth와 같으나, 재귀를 사용하여 풀었다.
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

// { value: 10, rest: { value: 20, rest: null } }
// [ 10, 20, 30 ]
// { value: 10, rest: { value: 20, rest: null } }
// 20
// 20
