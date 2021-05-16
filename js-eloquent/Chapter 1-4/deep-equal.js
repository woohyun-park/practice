function deepEqual(a, b){
    const tA = typeof a;
    const tB = typeof b;

		//만약 a와 b가 같다면 true
    if(a === b)
        return true;
		//만약 a 또는 b가 object가 아니고 null도 아니라면 false
    if(a == null || typeof a != 'object' || b == null || typeof b != 'object')
        return false;

		//a와 b가 모두 object일때
    let cA = 0;
    let cB = 0;
    for(let props in a){
        cA++;
    }
    for(let props in b){
        cB++;
				//a와 b속에있는 모든 속성값을 deepEqual로 비교하고
				//하나라도 false일시 false
        if(!(props in a) || !deepEqual(a[props], b[props]))
            return false;
    }
		//잘 빠져나왔다면 모든 props를 확인했는지까지 확인
    return cA == cB;
}

let tmp1 = {name: 'hi', age: 'whatever'};
let tmp2 = {name: 'hi', age: 'whateve'};

let a = {name: 'dooddi', age: 24, watever: tmp1};
let b = {name: 'dooddi', age: 24, watever: tmp2};

console.log(deepEqual(a, b));
