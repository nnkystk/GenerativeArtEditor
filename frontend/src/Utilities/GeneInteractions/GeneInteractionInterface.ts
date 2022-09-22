import { GeneInteractionParameter } from './GeneInteractionParameter'
import { EffectID } from '../GlobalVarriables/EffectCatalog'

interface GeneInteractionInterface{

  // 実装必須
  id        : EffectID;
  uid       : number;
  parameter : GeneInteractionParameter;  // Effectの強さや方向等を調整するためのパラメータ
  play(mesh: THREE.Mesh): THREE.Mesh;

  instructions  ?: Array<string>;        // Effectの説明テキスト
  // parameterType?: "NUMBER";          // パラメータのタイプを識別するテキスト UIの自動生成時に利用する
}


export default GeneInteractionInterface