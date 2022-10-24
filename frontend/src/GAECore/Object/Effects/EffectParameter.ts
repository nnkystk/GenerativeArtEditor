import Vector from "src/Utilities/GlobalVarriables/Vector";
import Coordinate from "src/Utilities/GlobalVarriables/Corrdinate";
import HexadecimalColor from "src/Utilities/GlobalVarriables/HexadecimalColor";

export class EffectParameter{

  vector    : Vector;
  rotation  : Vector;
  position  : Coordinate;
  color     : HexadecimalColor;

  constructor(vector?: Vector, rotation?: Vector, position?: Coordinate, color?: HexadecimalColor){
    this.vector   = vector    ? vector    : { x: 0, y: 0, z: 0 };
    this.rotation = rotation  ? rotation  : { x: 0, y: 0, z: 0 };
    this.position = position  ? position  : { x: 0, y: 0, z: 0 };
    this.color    = color     ? color     : { r: '0', g: '0', b: '0' };
  }

}

export default EffectParameter