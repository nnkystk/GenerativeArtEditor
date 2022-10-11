import Vector from 'src/Utilities/GlobalVarriables/Vector'
import EffectParameterSource from '../EffectParameterSource'

class ParamMoveSource implements EffectParameterSource{

  vector: Vector = { x: 0.05, y: 0, z: 0 }

}

export default ParamMoveSource