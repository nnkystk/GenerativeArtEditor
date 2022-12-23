
export interface IAdoptor{
  
  /**
   * Summary:
   *  RAW形式のTDModelを各レンダリングライブラリに適したTDModelへ変換する
   * @param tdModels 
   */
  adopt(tdModels: Array<TDModelForRaw>): Array<any>
  
}

// !!! 仮 !!!
class TDModelForRaw{}

export default IAdoptor