import TDModelProperty from '../TDModelProperty';
import EffectParameter from './EffectParameter'
import { EffectID } from '../../../Utilities/GlobalVarriables/EffectCatalog'

interface EffectModel{

  id        : EffectID;
  parameter : EffectParameter;

  /**
   * 3Dモデルのプロパティをもとに、Effectを適用した後のプロパティを算出するメソッド
   * @param property 
   * @param parameter : 任意で設定可能なオプション。設定しなければインスタンスのparameterを用いるが、設定した場合は本parameterを用いる
   */
  calculate(property: TDModelProperty, parameter?: EffectParameter): TDModelProperty;

}

export default EffectModel