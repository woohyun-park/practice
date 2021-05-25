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
