import Vector from '../GlobalVarriables/Vector'
import HexadecimalColor from '../GlobalVarriables/HexadecimalColor'
import GeneEffectStorage from '../GeneEffects/GeneEffectStorage'

type Options = {
  name?: string
}
class MeshModel{

  public id   : number;
  public mesh : THREE.Mesh;

  constructor(id:number, mesh: THREE.Mesh, options?: Options) {
    this.id   = id;
    this.mesh = mesh;
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