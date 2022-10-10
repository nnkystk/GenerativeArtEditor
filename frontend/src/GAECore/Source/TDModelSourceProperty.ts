import HexadecimalColor from "src/Utilities/GlobalVarriables/HexadecimalColor";
import Vector from "src/Utilities/GlobalVarriables/Vector";


class TDModelSourceProperty{
  
  position: Vector = { x: 0, y: 0, z: 0 };
  scale   : Vector = { x: 0, y: 0, z: 0 };
  vector  : Vector = { x: 0, y: 0, z: 0 };
  rotation: Vector = { x: 0, y: 0, z: 0 };
  color   : HexadecimalColor = { r: '0', g: '0', b: '0' };

  setPosition(position: { x: number, y: number, z: number } ){
    this.position = position;
  }

  setVector(vector: { x: number, y: number, z: number }){
    this.vector = vector;
  }

  setRotation(rotation: { x: number, y: number, z: number }){
    this.rotation = rotation;
  }

  setColor(color: HexadecimalColor){
    this.color = color
  }

}


export default TDModelSourceProperty