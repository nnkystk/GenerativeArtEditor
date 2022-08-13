import GeneEffect from './GeneEffect'


class GeneModel{

  public id: number;
  public mesh: THREE.Mesh;
  public effectList: Array<GeneEffect>;

  constructor(mesh: THREE.Mesh) {
    this.id = mesh.id;    // MEMO: Three.jsへの依存性が高いため注意
    this.mesh = mesh;
    this.effectList = [ "sample1", "sample2", "sample3" ];
  }

}

export default GeneModel