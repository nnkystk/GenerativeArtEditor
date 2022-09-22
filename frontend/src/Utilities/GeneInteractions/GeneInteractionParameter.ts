type Vector = { x: number, y: number, z: number }
type Coordinate = { x: number, y: number, z: number }
export class GeneInteractionParameter{

  // WARN: 任意実装とすると、呼び出し側で逐一nullチェックを行い必要がでてくるため実装必須としている
  vector    : Vector = {x: 0, y: 0, z: 0};
  vectorSub1: Vector = {x: 0, y: 0, z: 0};
  vectorSub2: Vector = {x: 0, y: 0, z: 0};

  position    : Coordinate = {x: 0, y: 0, z: 0};
  positionSub1: Coordinate = {x: 0, y: 0, z: 0};
  positionSub2: Coordinate = {x: 0, y: 0, z: 0};  

  constructor(){
  }

}

export default GeneInteractionParameter