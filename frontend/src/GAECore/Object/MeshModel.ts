import * as THREE from 'three';
import TDModel from './TDModel'
import EffectModelStorage from './EffectModelStorage';
import TDModelProperty from './TDModelProperty';

class MeshModel implements TDModel{

  tdObj         : THREE.Mesh;
  effectStorage : EffectModelStorage = new EffectModelStorage();
  property      : TDModelProperty = new TDModelProperty();

  constructor(tdObj: THREE.Mesh, effectStorage: EffectModelStorage){
    this.tdObj = tdObj;
    this.effectStorage = effectStorage;
  }

}

export default MeshModel