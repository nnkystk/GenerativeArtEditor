import GeneEffectRoll from "../GeneEffects/GeneEffectRoll";
import GeneEffectMove from "../GeneEffects/GeneEffectMove";

export type EffectID = "ROLL" | "MOVE";
export const EFFECT_CATALOG = [ { id: 'ROLL', effect: GeneEffectRoll },  { id: 'MOVE', effect: GeneEffectMove } ];