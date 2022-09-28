import Vector from '../GlobalVarriables/Vector'
import HexadecimalColor from '../GlobalVarriables/HexadecimalColor'
import GeneEffectParameter from '../GeneEffects/GeneEffectParameter';

type Options = {
  name?: string
}
class MeshModel{
  /** Summary:
   *    - レンダリングする3Dオブジェクトを格納するクラス
   *    - 3Dオブジェクトの仕様に変更があった場合に、利用プログラムの修正が不要となるように本クラスでラップする
   *    - デザインパターン Adoptor と同様の考え方
   *  implementation:
   *    - 3DオブジェクトとしてTHREEのMeshを使用する
   * */

  public id   : number;
  public mesh : THREE.Mesh;
  public parameter: GeneEffectParameter;    // TODO: 専用クラス化し利用目的を明確化する

  constructor(id:number, mesh: THREE.Mesh, options?: Options) {
    this.id   = id;
    this.mesh = mesh;
    this.parameter = new GeneEffectParameter();
  }

  setPosition(position: Vector){
      this.mesh.position.set(position.x, position.y, position.z);
  }

  setScale(scale: Vector){
    this.mesh.scale.set(scale.x, scale.y, scale.z);
  }

  setColor(color: HexadecimalColor){
      {/* @ts-ignore */} // meshにセットされるmaterialインスタンスがcolorプロパティを持たない可能性がありts検査エラーが発生する。
      this.mesh.material.color.setHex("0x" + color.r + color.g + color.b);
  }
}

export default MeshModel