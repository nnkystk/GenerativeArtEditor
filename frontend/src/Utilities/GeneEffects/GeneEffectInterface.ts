import GeneEffectParameter from './GeneEffectParameter'
import { EffectID } from '../GlobalVarriables/EffectCatalog'

interface GeneEffectInterface{

  // 実装必須
  id        : EffectID;
  uid       : number;
  parameter : GeneEffectParameter;  // Effectの強さや方向等を調整するためのパラメータ
  calculate(parameter: GeneEffectParameter): GeneEffectParameter;   // Effect適用後のパラメータを産出するメソッド

  instructions  ?: Array<string>;        // Effectの説明テキスト
  // parameterType?: "NUMBER";          // パラメータのタイプを識別するテキスト UIの自動生成時に利用する
}


export default GeneEffectInterface