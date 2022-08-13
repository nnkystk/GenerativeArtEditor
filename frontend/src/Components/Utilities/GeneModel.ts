import GeneEffect from './GeneEffect'


class GeneModel{

  public id         : number;
  public name       : string | undefined;
  public mesh       : THREE.Mesh;
  public effectList : Array<GeneEffect>;

  constructor(id:number, mesh: THREE.Mesh, name?: string) {
    this.id   = id;
    this.mesh = mesh;
    this.name = name;
    this.effectList = [ "sample1", "sample2", "sample3" ];
  }

}

export default GeneModel