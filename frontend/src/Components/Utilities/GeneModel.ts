import GeneEffectInterface from './GeneEffectInterface'
import GeneEffectRoll from './GeneEffects/GeneEffectRoll'


class GeneModel{

  public id         : number;
  public mesh       : THREE.Mesh;
  public effectList : Array<GeneEffectInterface>;
  public name       : string | undefined;

  constructor(id:number, mesh: THREE.Mesh, effectList: Array<GeneEffectInterface>, name?: string) {
    this.id         = id;
    this.mesh       = mesh;
    this.effectList = effectList;
    this.name       = name? name: "No Name";

  }

}

export default GeneModel