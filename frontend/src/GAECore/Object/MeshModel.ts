import * as THREE from 'three';
import TDModel from './TDModel'
import EffectModelStorage from './EffectModelStorage';
import TDModelProperty from './TDModelProperty';
import TDModelID from '../GlobalVar/TDModelID';

class MeshModel implements TDModel{
  id            : TDModelID;   
  tdObj         : THREE.Mesh;
  effectStorage : EffectModelStorage = new EffectModelStorage();
  property      : TDModelProperty = new TDModelProperty();

  constructor(id: TDModelID, tdObj: THREE.Mesh, effectStorage: EffectModelStorage){
    this.id    = id;
    this.tdObj = tdObj;
    this.effectStorage = effectStorage;
  }

}

export default MeshModel