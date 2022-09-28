import GeneEffectParameter from '../GeneEffectParameter'

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
   *    - parameter: Effect適用前のパラメータ
   *  Returns:
   *    - parameterReturm: Effect適用後のパラメータ
  */
  calculate(parameter: GeneEffectParameter): GeneEffectParameter;

  instructions  ?: Array<string>;                   // Effectの説明テキスト
}


export default AtBoundaryInterface