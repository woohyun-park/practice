class PGroup {
  constructor(){
    this.group = [];
  }

  add(member){
    const result = new PGroup();
    this.group.forEach(n => result.group.push(n));
    if(this.group.indexOf(member) == - 1){
      result.group.push(member);
    }
    return result;
  }
  delete(member){
    const result = new PGroup();
    this.group.forEach(n => result.group.push(n));

    const index = this.group.indexOf(member);
    if(index != -1){
      result.group.splice(index, 1);
    }
    return result;
  }
  has(member){
    return this.group.indexOf(member) != -1;
  }
}

let group = new PGroup();
group = group.add("dooddi");

let group1 = group.delete("dooddi");

console.log(group, group1);
