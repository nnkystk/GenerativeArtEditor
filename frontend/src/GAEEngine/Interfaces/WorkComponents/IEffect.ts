export interface IEffect{
  
  uid       : any;
  type      : EffectType;
  parameter : EffectParameter;
  // 他Effectと比較しどの程度先にEffectを発火させるべきかを示す識別値 小さいほど優先度が高い
  activatePriority  : number;

  /**
   * Summary: 
   *  3DモデルにEffectを適用した後の表示状態（位置や色など）を出力するメソッド
   * @param tdModelParam  : Effect適用前の3Dモデルの表示状態をまとめたパラメータ 
   * @param effectParam   : 適用するEffectの調整を行うパラーメータ
   */
  calculate(tdModelParam: TDModelParameter, effectParam: EffectParameter): TDModelParameter
  
}

// !!! 仮 !!!
class EffectType{}
class EffectParameter{}
class TDModelParameter{}

export default IEffect