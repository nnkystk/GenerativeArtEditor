import Coordinate from 'src/Utilities/GlobalVarriables/Corrdinate';
import GeneEffectParameter from '../GeneEffectParameter'
import AtBoundaryInterface from './AtBoundaryInterface';

class ReflectAtBoundary implements AtBoundaryInterface{

  /** Summary:
   *    - 3Dオブジェクトが境界を越えた際に反射したような挙動を行うEffect
   *  Property:
   *    - parameter:
   *      - vector: 反射が発生した時の速度を減速・加速させるパラメータ
   *  Implementation:
   *    - 
   */

  parameter: GeneEffectParameter;
  boundary  : { x: number, y: number, z: number };

  constructor(parameter: GeneEffectParameter, boundary: { x: number, y: number, z: number }){
    this.parameter = parameter;
    this.boundary = boundary;
  }

  /**
   * Summary:
   *  - 
   * @param parameter 
   * @param position 
   * @returns 
   */
  calculate(parameter: GeneEffectParameter, position: Coordinate): GeneEffectParameter{
    
    const positionMoved: Coordinate = {
      x: position.x + parameter.vector.x,
      y: position.y + parameter.vector.y,
      z: position.z + parameter.vector.z,
    }
    if(Math.abs(positionMoved.x) > Math.abs(this.boundary.x)){
      parameter.vector.x = - (parameter.vector.x);
    }
    return parameter
  }
 
}


export default ReflectAtBoundary