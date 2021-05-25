const roads = [
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop", "Marketplace-Farm",
  "Marketplace-Post Office", "Marketplace-Shop",
  "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edge){
  const graph = {};
  function addGraph(start, end){
    if(graph[start] == null){
      graph[start] = [end];
    } else {
      graph[start].push(end);
    }
  }
  for(let [start, end] of edge.map(n => n.split("-"))){
    addGraph(start, end);
    addGraph(end, start);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState{
  constructor(place, parcels){
    this.place = place;
    this.parcels = parcels;
  }

  move(destination){
    if(!roadGraph[this.place].includes(destination)){
      return this;
    } else {
      //map은 물건의 이동, filter는 물건의 배달을 처리
      let parcels = this.parcels.map(p => {
        if(p.place != this.place) return p;
        return { place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

let first = new VillageState(
  "Post Office", [{place: "Post Office", address: "Alice's House"}]
)
let next = first.move("Alice's House");

console.log(next.place);
console.log(next.parcels);
console.log(first.place);

function runRobot(state, robot, memory){
  for (let turn = 0;;turn++){
    if (state.parcels.length == 0){
      console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array){
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state){
  return { direction: randomPick(roadGraph[state.place])};
}

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
]

function routeRobot(state, memory){
  if (memory.length == 0){
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1)};
}

VillageState.random = function(parcelCount = 5){
  let parcels = [];
  for (let i = 0; i < parcelCount; i++){
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while(place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
}

function findRoute(graph, from, to){
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++){
    let { at, route } = work[i];
    for (let place of graph[at]){
      if(place == to) return route.concat(place);
      if(!work.some(w => w.at == place)){
        work.push({at:place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route){
  if(route.length == 0){
    let parcel = parcels[0];
    if (parcel.place != place){
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

// runRobot(VillageState.random(), goalOrientedRobot, mailRoute);



function compareRobots(robot1, robot2, num = 100){
  let count1 = 0, count2 = 0;
  for(let i = 0; i < num; i++){
    const state = VillageState.random();
    count1 += runRobot(state, robot1, mailRoute);
    count2 += runRobot(state, robot2, mailRoute);
  }
  return `Robot1: ${count1 / num}, Robot2: ${count2 / num}`;
}

console.log(compareRobots(goalOrientedRobot, goalOrientedRobot, 10));
