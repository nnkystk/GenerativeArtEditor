import * as THREE from 'three';
import TDModelStorage from '../Object/TDModelStorage';
import MeshModel from '../Object/MeshModel';
import EffectRoll from '../Object/Effects/Roll/EffectRoll';
import EffectModelStorage from '../Object/EffectModelStorage';

class PlayerForTHREE{

  private renderer : THREE.WebGLRenderer;
  private scene    : THREE.Scene;
  private camera   : THREE.PerspectiveCamera;

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera){
    this.renderer = renderer;
    this.scene    = scene;
    this.camera   = camera;
  }

  test(){
    this.render();
  }

  render(){
    this.renderer.render(this.scene, this.camera);
  }



  generateSample(){

    const genereteSampleMesh = () => {
      const geometry  = new THREE.BoxGeometry(100, 100, 100);
      const material  = new THREE.MeshMatcapMaterial({ color: 0xffffff });
      const mesh      = new THREE.Mesh(geometry, material);
      return mesh
    }

    const effectModelStorage  = new EffectModelStorage();
    const effectRoll          = new EffectRoll();
    effectModelStorage.storage.push(effectRoll);

    const tdModelStorage = new TDModelStorage();
    const mesh = genereteSampleMesh();
    const tdModel   = new MeshModel(mesh, effectModelStorage);
    tdModelStorage.storage.push(tdModel);

    return tdModelStorage
    
  }

  play(tdModelStorage: TDModelStorage){

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

    const sample = this.generateSample();

    // 各3Dモデルに対してEffectを適用

      // 各Effectを適用した後の3Dモデルのプロパティを算出

          // 通常Effect

          // 特別Effect

      // 3DモデルのプロパティをEffect適用後のものに変更

  }


}

export default PlayerForTHREE