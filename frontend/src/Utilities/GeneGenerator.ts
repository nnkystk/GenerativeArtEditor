import * as THREE from 'three';
import GeneModel from './GeneModel'
import GeneEffectRoll from './GeneEffects/GeneEffectRoll'
import GeneEffectParameter from '../Utilities/GeneEffects/GeneEffectParameter'

export class GeneGenerator{

  constructor(){

  }

  static generateMesh (){
    const geometry  = new THREE.BoxGeometry(100, 100, 100);
    const material  = new THREE.MeshMatcapMaterial();
    const box       = new THREE.Mesh(geometry, material);   // !!! 仮置きでboxメッシュを生成 !!!
    return box
  }

  static generateGeneEffect(){
    const effectParams = new GeneEffectParameter();
    effectParams.vector = { x: 0.01, y: 0.01, z: 0 };
    const effect = new GeneEffectRoll(1, effectParams);   // !!! 仮置きでROLLEffectを生成 !!!
    return effect
  }

  static generateGeneModel(id: number, mesh: THREE.Mesh){
    const name        = "sample";
    const effectList  = [ this.generateGeneEffect() ];
    const geneModel   = new GeneModel(id, mesh, effectList, { name: name });
    return geneModel
  }

}

export default GeneGenerator