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

const graph = buildGraph(roads);
console.log(graph);
