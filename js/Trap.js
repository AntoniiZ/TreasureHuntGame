class Trap extends Point {
  constructor(x, y, name){
      super(x, y);
      this.type = name;
  }

  get(){
    return this.type;
  }
}
