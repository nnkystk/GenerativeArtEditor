class TDModelSourceProperty{
  
  position: { x: number, y: number, z: number } = { x: 0, y: 0, z: 0 };
  vector  : { x: number, y: number, z: number } = { x: 0, y: 0, z: 0 };
  rotation: { x: number, y: number, z: number } = { x: 0, y: 0, z: 0 };
  color   : { r: number, g: number, b: number } = { r: 0, g: 0, b: 0 };

  setPosition(position: { x: number, y: number, z: number } ){
    this.position = position;
  }

  setVector(vector: { x: number, y: number, z: number }){
    this.vector = vector;
  }

  setRotation(rotation: { x: number, y: number, z: number }){
    this.rotation = rotation;
  }

  setColor(color: { r: number, g: number, b: number }){
    this.color = color
  }

}


export default TDModelSourceProperty