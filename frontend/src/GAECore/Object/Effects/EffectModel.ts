import TDModelProperty from '../TDModelProperty';
import EffectParameter from './EffectParameter'

interface EffectModel{

  parameter: EffectParameter;
  calculate(property: TDModelProperty): TDModelProperty;

}

export default EffectModel