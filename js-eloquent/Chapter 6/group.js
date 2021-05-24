class Group {
  constructor(){
    this.group = [];
  }

  add(member){
    if(this.group.indexOf(member) == -1){
      this.group.push(member);
    }
  }
  delete(member){
    const index = this.group.indexOf(member);
    if(index != -1){
      this.group.splice(index, 1);
    }
  }
  has(member){
    return this.group.indexOf(member) != -1;
  }
  static from(instance){
    const result = new Group();
    for(let member of instance)
      result.add(member);
    return result;
  }
}

let group = new Group();
group.add("Dooddi");
group.add("Tiara");
console.log(group.group);
group.delete("Dooddi");
console.log(group.group);
console.log(group.has("Dooddi"));
console.log(group.has("Tiara"));

let group2 = Group.from([1, 2, 3, 4, 5]);
console.log(group2.group);
