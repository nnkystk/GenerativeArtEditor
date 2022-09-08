import Vector from './GlobalVarriables/Vector'
import HexadecimalColor from './GlobalVarriables/HexadecimalColor'
import GeneEffectInterface from './GeneEffects/GeneEffectInterface'
import GeneEffectStorage from './GeneEffectStorage'

type Options = {
  name?: string
}
type Coordinate = {
  x: number, y: number, z: number
}
class GeneModel{

  public id         : number;
  public mesh       : THREE.Mesh;
  public effectList : GeneEffectStorage;
  public name       : string | undefined;
  public position   : Coordinate;
  public scale      : Coordinate;
  public color      : HexadecimalColor;

  constructor(id:number, mesh: THREE.Mesh, effectList: GeneEffectStorage, options?: Options) {
    this.id         = id;
    this.mesh       = mesh;
    this.effectList = effectList;
    this.name       = options? (options.name? options.name: "No Name"): "No Name";  // nameの指定があればそれを無ければ固定値をセット
    this.position   = { x: 0, y: 0, z: 0 };
    this.scale      = { x: 1, y: 1, z: 1 };
    this.color      = { r: "ff", g: "ff", b: "ff" };
  }

  setPosition(position: Vector){
    // UI表示用のオブジェクトに反映する
    this.position = position;
    // Meshに反映する
    this.mesh.position.set(position.x, position.y, position.z);
  }

  setScale(scale: Vector){
    // UI表示用のオブジェクトに反映する
    this.scale = scale;
    // Meshに反映する
    this.mesh.scale.set(scale.x, scale.y, scale.z);
  }

  setColor(color: HexadecimalColor){
    // UI表示用のオブジェクトに反映する
    this.color = color;
    // Meshに反映する
    {/* @ts-ignore */} // meshにセットされるmaterialインスタンスがcolorプロパティを持たない可能性がありts検査エラーが発生する。
    this.mesh.material.color.setHex("0x" + color.r + color.g + color.b);
  }

}

export default GeneModel