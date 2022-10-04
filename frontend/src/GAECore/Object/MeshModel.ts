import * as THREE from 'three';
import TDModel from './TDModel'
import EffectModelStorage from './EffectModelStorage';

class MeshModel implements TDModel{

  tdObj         : THREE.Mesh;
  effectStorage : EffectModelStorage = new EffectModelStorage();

  constructor(tdObj: THREE.Mesh, effectStorage: EffectModelStorage){
    this.tdObj = tdObj;
    this.effectStorage = effectStorage;
  }

}

export default MeshModel