interface GeneEffectInterface{

  // 実装必須
  id  : string;
  uid : string;
  play(mesh: THREE.Mesh): THREE.Mesh;

  // 実装任意
  parameters   ?: any;            // Effectの強さや方向等を調整するためのパラメータ Effectごとに用途が大きく異なるため型を不定で定義している
  instructions ?: Array<string>;  // Effectの説明テキスト
  // parameterType?: "NUMBER";         // パラメータのタイプを識別するテキスト UIの自動生成時に利用する
}


export default GeneEffectInterface