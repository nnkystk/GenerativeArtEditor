import * as THREE from 'three';
import TDModelStorage from '../Object/TDModelStorage';
import MeshModel from '../Object/MeshModel';
import EffectRoll from '../Object/Effects/Roll/EffectRoll';
import EffectModelStorage from '../Object/EffectModelStorage';
import TDModelProperty from '../Object/TDModelProperty';
import CanvasSize from 'src/Utilities/GlobalVarriables/CanvasSize';
import { Vector2 } from "three";

class PlayerForTHREE{

  FOV: number = 50;
  canvasSize: CanvasSize = { width: 500, height:500 };

  private renderer : THREE.WebGLRenderer;
  private scene    : THREE.Scene;
  private camera   : THREE.PerspectiveCamera;
  private reqAnmId : any;

  constructor(canvas: HTMLCanvasElement){

    /**
     * Threeオブジェクト（レンダラー・カメラ・シーン）を初期化する
     */
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    const scene   = new THREE.Scene();
    const camera  = new THREE.PerspectiveCamera(this.FOV, this.canvasSize.width / this.canvasSize.height);
    camera.position.set(0, 0, +1000);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.canvasSize.width, this.canvasSize.height);

    this.renderer = renderer;
    this.scene    = scene;
    this.camera   = camera;
  }

  test(){
    this.render();
  }

  play(tdModelStorage: TDModelStorage){

    const tick = () => {
      this.activateEffect(tdModelStorage);
      const reqAnmId = requestAnimationFrame(tick);   // 本処理をフレーム更新時に実行するよう登録
      this.reqAnmId = reqAnmId;                       // 本処理の実行IDをプロパティに格納 このIDは再生停止時等に使用する
    }
    tick();

  }

  stop(){
    cancelAnimationFrame(this.reqAnmId);
  }

  render(){
    this.renderer.render(this.scene, this.camera);
  }

  updateScene(tdModelStorage: TDModelStorage){
    const scene = new THREE.Scene();
    tdModelStorage.storage.forEach( (meshModel) => {
      const mesh = meshModel.tdObj;
      scene.add(mesh);
    });
    this.scene = scene;
  }

  /**
   * 現在描画されているCanvas要素のサイズを変更するメソッド
   * 併せて、アスペクト比の調整なども実行する
   * なおサイズ変更の必要性を本処理内で判断している
   * @param requestedCanvasSize 
   */
  updateCanvasSize(requestedCanvasSize: CanvasSize){

    const canvasSize = this.renderer.getSize(new Vector2());

    // 設定されているキャンバスサイズが、現在レンダー中のキャンバスサイズと異なる場合、リサイズを行う
    if(canvasSize.x != requestedCanvasSize.width || canvasSize.y != requestedCanvasSize.height){

      // カメラを更新
      this.camera.aspect = requestedCanvasSize.width / requestedCanvasSize.height
      this.camera.updateProjectionMatrix();
      // レンダラーを更新
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(requestedCanvasSize.width, requestedCanvasSize.height);

      this.render();
    }
  }

  activateEffect(tdModelStorage: TDModelStorage){

    /**
     *  Summary: 
     *    GeneModelに登録されたEffectを発火させる。
     *    その後、UIにレンダリングする。
     *  Implementation:
     *    - 3Dオブジェクトのプロパティをもとに、Effectを適用した場合のプロパティを算出する
     *      - 特別Effectとは、実行優先順位が高い特殊なEffect
     *    - 全Effect適用後のプロパティをもとに、表示中の3Dオブジェクト（Mesh）に変更を加える
     * @param   { TDModelStorage } tdModelStorage: 
     * @return  void
     */


    // 各3Dモデルに対してEffectを適用
    tdModelStorage.storage.forEach( (meshModel) => {

      /** 各Effectを適用した後の3Dモデルのプロパティを算出 */
      let property: TDModelProperty = { ...meshModel.property };

      // 通常Effect
      meshModel.effectStorage.storage.forEach( (effectModel) => {
        property = effectModel.calculate(property);
      })
      // TODO: 特別Effect

      /** Meshに全Effect適用後のプロパティを反映  */
      const mesh = meshModel.tdObj;

      // TODO: 色

      // TODO: スケール

      // 移動後の位置
      mesh.position.x += property.vector.x;
      mesh.position.y += property.vector.y;
      mesh.position.z += property.vector.z;

      // 回転
      mesh.rotation.x += property.rotation.x;
      mesh.rotation.y += property.rotation.y;
      mesh.rotation.z += property.rotation.z;

      meshModel.property = property;
      this.render();
    })

  }



}

export default PlayerForTHREE