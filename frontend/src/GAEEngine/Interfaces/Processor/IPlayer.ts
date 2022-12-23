export interface IPlayer{

  // フレームの更新状況を同定するための識別値 作品の再生状況の管理に使用する
  reqAnmID: any;

  /**
   * Summary:
   *  作品の再生を開始するメソッド
   *  フレームが更新される度に各3Dモデルの表示状態（位置や色など）を更新する
   * @param tdModels 
   */
  play(tdModels: Array<TDModel>): void;

  /**
   * Summary:
   *  作品の再生を停止するメソッド
   */
  stop(): void;

  /**
   *  Summary:
   *    3Dモデルの表示状態（位置や色など）をEffect適用後の状態に更新するメソッド
   * @param param   : Effect適用前の3Dモデルの表示状態をまとめたパラメータ 
   * @param effects : 3Dモデルに適用するEffect
   */
  activateEffect(param: TDModelPrameter, effects: Array<Effect>): void

}

// !!! 仮 !!!
class TDModel{}
class Effect{}
class TDModelPrameter{}

export default IPlayer