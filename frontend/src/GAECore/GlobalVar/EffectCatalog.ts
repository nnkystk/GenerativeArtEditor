import EffectRollSource from "../Source/Effects/Roll/EffectRollSource";
import EffectMoveSource from "../Source/Effects/Move/EffectMoveSource";

export type EFFECT_ID = 'ROLL' | 'MOVE';
export const EFFECT_CATALOG = [
  { id: 'ROLL', effect: EffectRollSource },
  { id: 'MOVE', effect: EffectMoveSource }
];