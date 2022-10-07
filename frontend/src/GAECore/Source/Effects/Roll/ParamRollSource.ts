import Vector from 'src/Utilities/GlobalVarriables/Vector'
import EffectParameterSource from '../EffectParameterSource'

class ParamRollSource implements EffectParameterSource{

  rotation: Vector = { x: 0.05, y: 0, z: 0 }

}

export default ParamRollSource