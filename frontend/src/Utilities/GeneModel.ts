import Vector from './Vector'
import HexadecimalColor from './HexadecimalColor'
import GeneEffectInterface from './GeneEffects/GeneEffectInterface'

type Options = {
  name?: string
}
type Coordinate = {
  x: number, y: number, z: number
}
class GeneModel{

  public id         : number;
  public mesh       : THREE.Mesh;
  public effectList : Array<GeneEffectInterface>;
  public name       : string | undefined;
  public position   : Coordinate;
  public color      : HexadecimalColor;

  constructor(id:number, mesh: THREE.Mesh, effectList: Array<GeneEffectInterface>, options?: Options) {
    this.id         = id;
    this.mesh       = mesh;
    this.effectList = effectList;
    this.name       = options? (options.name? options.name: "No Name"): "No Name";  // nameの指定があればそれを無ければ固定値をセット
    this.position   = { x: 0, y: 0, z: 0 };
    this.color      = { r: "ff", g: "ff", b: "ff" };
  }

  setPosition(position: Vector){
    // UI表示用のオブジェクトに反映する
    this.position = position;
    // Meshに反映する
    this.mesh.position.set(position.x, position.y, position.z);
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