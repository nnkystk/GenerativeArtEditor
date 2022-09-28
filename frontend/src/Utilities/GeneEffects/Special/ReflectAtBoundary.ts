import GeneEffectParameter from '../GeneEffectParameter'
import AtBoundaryInterface from './AtBoundaryInterface';

class ReflectAtBoundary implements AtBoundaryInterface{

  /** Summary:
   *    3Dオブジェクトが境界を越えた際に反射したような挙動を行うEffect
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

  calculate(parameter: GeneEffectParameter): GeneEffectParameter{
    if(parameter.position.x >= this.boundary.x){
      parameter.vector.x = - (parameter.vector.x);
    }
    return parameter
  }
 
}


export default ReflectAtBoundary