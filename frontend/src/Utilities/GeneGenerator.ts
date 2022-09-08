import * as THREE from 'three';
import GeneModel from './GeneModel/GeneModel'
import GeneEffectInterface from '../Utilities/GeneEffects/GeneEffectInterface'
import GeneEffectRoll from './GeneEffects/GeneEffectRoll'
import GeneEffectParameter from '../Utilities/GeneEffects/GeneEffectParameter'
import EffectID from './GlobalVarriables/EffectID'
import GeneEffectStorage from './GeneEffects/GeneEffectStorage'

export class GeneGenerator{

  // エフェクトとそのIDをまとめたリスト
  static EFFECT_CATALOG = [ { id: 'ROLL', effect: GeneEffectRoll } ];
  
  constructor(){ }

  static generateMesh(){    // TODO: 引数に応じて異なるMeshを生成するよう変更
    const geometry  = new THREE.BoxGeometry(100, 100, 100);
    const material  = new THREE.MeshMatcapMaterial({ color: 0xffffff });
    const mesh       = new THREE.Mesh(geometry, material);   // !!! 仮置きでboxメッシュを生成 !!!
    return mesh
  }

  static generateGeneModel(modelID: number, mesh: THREE.Mesh, effectList: GeneEffectStorage){
    const name        = "sample";
    const geneModel   = new GeneModel(modelID, mesh, effectList, { name: name });
    return geneModel
  }

  static generateGeneEffect(effectID: EffectID){
    const TargetEffect = GeneGenerator.findEffectByID(effectID);
    const uid = 1;    // !!! 仮置き !!!
    const effect = new TargetEffect(uid, new GeneEffectParameter());   // !!! 仮置き !!!
    return effect
  }

  static findEffectByID(effectID: EffectID){
    const targetEffect = GeneGenerator.EFFECT_CATALOG.find( (obj) => obj.id == effectID );
    if(targetEffect){
      return targetEffect.effect;
    }else{
      return GeneEffectRoll;
    }
  }

}

export default GeneGenerator