let map = {one: true, two: true, hasOwnProperty: "watever"};

console.log(hasOwnProperty.call(map, 'one'));
