import GeneEffectInterface from './GeneEffectInterface'


type Options = {
  name?: string
}
type Vector = {
  x: number, y: number, z: number
}


class GeneModel{

  public id         : number;
  public mesh       : THREE.Mesh;
  public effectList : Array<GeneEffectInterface>;
  public name       : string | undefined;
  public position   : Vector;

  constructor(id:number, mesh: THREE.Mesh, effectList: Array<GeneEffectInterface>, options?: Options) {
    this.id         = id;
    this.mesh       = mesh;
    this.effectList = effectList;
    this.name       = options? (options.name? options.name: "No Name"): "No Name";
    this.position   = { x: 0, y: 0, z: 0 };
  }

}

export default GeneModel