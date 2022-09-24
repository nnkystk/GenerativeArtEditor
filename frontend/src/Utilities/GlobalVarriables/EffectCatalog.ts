import GeneEffectRoll from "../GeneEffects/GeneEffectRoll";
import GeneEffectMove from "../GeneEffects/GeneEffectMove";
import GeneEffectReflectOnBound from "../GeneEffects/GeneEffectReflectOnBound";

export type EffectID = 'ROLL' | 'MOVE' | 'REFLECT_ON_BOUND';
export const EFFECT_CATALOG = [
  { id: 'ROLL', effect: GeneEffectRoll },
  { id: 'MOVE', effect: GeneEffectMove },
  { id: 'REFLECT_ON_BOUND', effect: GeneEffectReflectOnBound }
];