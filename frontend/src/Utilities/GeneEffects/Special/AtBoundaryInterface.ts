import GeneEffectParameter from '../GeneEffectParameter'
import Coordinate from '../../GlobalVarriables/Corrdinate'

interface AtBoundaryInterface{

  /** Summary:
   *    - 3Dオブジェクトが境界を超えた際に実行するアニメーション用のインターフェイス
   *  Implementation:
   *    - EffectInteraceに近い実装をとっているが、厳密には共通する必要がないため別実装としている
   */

  parameter : GeneEffectParameter;                    // Effectの強さや方向等を調整するためのパラメータ
  boundary  : { x: number, y: number, z: number };    // 境界の座標
  
  /** Summary:
   *    - Effect適用後のパラメータを産出するメソッド
   *  Args:
   *    - parameter : Effect適用前のパラメータ
   *    - position  : 境界を越えているか判定する際の基準点
   *  Returns:
   *    - parameterReturm: Effect適用後のパラメータ
  */
  calculate(parameter: GeneEffectParameter, position: Coordinate): GeneEffectParameter;

  instructions  ?: Array<string>;                   // Effectの説明テキスト
}


export default AtBoundaryInterface