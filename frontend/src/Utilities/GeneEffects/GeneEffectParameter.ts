type Vector = { x: number, y: number, z: number }
type Coordinate = { x: number, y: number, z: number }
import HexadecimalColor from '../../Utilities/GlobalVarriables/HexadecimalColor'

export class GeneEffectParameter{

  // WARN: 任意実装とすると、呼び出し側で逐一nullチェックを行う必要がでてくるため実装必須としている

  vector    : Vector = { x: 0, y: 0, z: 0 };
  vectorSub1: Vector = { x: 0, y: 0, z: 0 };
  vectorSub2: Vector = { x: 0, y: 0, z: 0 };

  rotation    : Vector = { x: 0, y: 0, z: 0 };
  rotationSub1: Vector = { x: 0, y: 0, z: 0 };
  rotationSub2: Vector = { x: 0, y: 0, z: 0 };

  position    : Coordinate = { x: 0, y: 0, z: 0 };
  positionSub1: Coordinate = { x: 0, y: 0, z: 0};
  positionSub2: Coordinate = { x: 0, y: 0, z: 0 };

  color       : HexadecimalColor = { r: '0', g: '0', b: '0' };

  memoVector    : Vector      = { x: 0, y: 0, z: 0 };
  memoPosition  : Coordinate  = { x: 0, y: 0, z: 0 };

  constructor(){
  }

}

export default GeneEffectParameter