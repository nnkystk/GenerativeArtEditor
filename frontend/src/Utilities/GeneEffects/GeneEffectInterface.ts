import GeneEffectParameter from './GeneEffectParameter'
import { EffectID } from '../GlobalVarriables/EffectCatalog'

interface GeneEffectInterface{

  id        : EffectID;
  uid       : number;
  parameter : GeneEffectParameter;  // Effectの強さや方向等を調整するためのパラメータ

  /** Summary:
   *    - Effect適用後のパラメータを産出するメソッド
   *  Args:
   *    - parameter: Effect適用前のパラメータ。描画されている3Dオブジェクトのパラメータ
   *  Returns:
   *    - parameterReturm: Effect適用後のパラメータ
  */
  calculate(parameter: GeneEffectParameter): GeneEffectParameter;

  instructions  ?: Array<string>;        // Effectの説明テキスト
}


export default GeneEffectInterface