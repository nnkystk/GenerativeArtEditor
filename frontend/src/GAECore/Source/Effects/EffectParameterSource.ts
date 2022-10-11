import Vector from "src/Utilities/GlobalVarriables/Vector";
import Coordinate from "src/Utilities/GlobalVarriables/Corrdinate";
import HexadecimalColor from "src/Utilities/GlobalVarriables/HexadecimalColor";

export class EffectParameterSource{

  vector    : Vector            = { x: 0, y: 0, z: 0 };
  rotation  : Vector            = { x: 0, y: 0, z: 0 };
  position  : Coordinate        = { x: 0, y: 0, z: 0 };
  color     : HexadecimalColor  = { r: '0', g: '0', b: '0' };

  constructor(){
  }

}

export default EffectParameterSource