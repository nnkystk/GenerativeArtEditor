import * as THREE from 'three';
import MeshModel from '../Object/MeshModel'
import TDModelStorage from "../Object/TDModelStorage";
import TDModelSourceStorage from "../Source/TDModelSourceStorage";
import { EFFECT_ID } from '../GlobalVar/EffectCatalog';
import EffectRoll from '../Object/Effects/Roll/EffectRoll';
import EffectParameterSource from '../Source/Effects/EffectParameterSource';
import EffectParameter from '../Object/Effects/EffectParameter';


const EFFECT_CATALOG = [
  { id: 'ROLL', effect: EffectRoll },
  { id: 'MOVE', effect: EffectRoll }
];


class ConverterForTHREE{

  static convert(source: TDModelSourceStorage): TDModelStorage{

    /** MEMO: TDModelStorageの構造
     * - TDModelStorage
     *  - *TDModel
     *    - EffectModelStorage
     *      - *EffectModel
     *        - Property
     */

    const tdModelStorage = new TDModelStorage();

    // TDModel（MeshModel）を生成
    source.storage.map( (tdModelSource) => {
      const tdModel = new MeshModel(1, ConverterForTHREE.genereteSampleMesh());

      // EffectModelを生成
      tdModelSource.effectModelSourceStorage.storage.map( (effectModelSource) => {
        const effectModel = ObjectGenerator.generateEffectModel(effectModelSource.id, effectModelSource.parameter);
        tdModel.effectStorage.store(effectModel);
      });

      tdModelStorage.store(tdModel);
    })

    return tdModelStorage
  }

  static genereteSampleMesh(){
    const geometry  = new THREE.BoxGeometry(100, 100, 100);
    const material  = new THREE.MeshMatcapMaterial({ color: 0xffffff });
    const mesh      = new THREE.Mesh(geometry, material);
    return mesh
  }

}


class ObjectGenerator{
  
  static generateEffectModel(effectID: EFFECT_ID, paramSource: EffectParameterSource){
    const TargetEffectModel = ObjectGenerator.findEffectModelByID(effectID);
    const effectParam       = new EffectParameter(paramSource.vector, paramSource.rotation, paramSource.position, paramSource.color)
    const effectModel       = new TargetEffectModel(effectParam);
    return effectModel
  }

  static findEffectModelByID(effectID: EFFECT_ID){
    const targetEffect = EFFECT_CATALOG.find( (obj) => obj.id == effectID );
    if(targetEffect){
      return targetEffect.effect;
    }else{
      return EffectRoll;    // !!! 仮 マッチしなかった場合のエラーハンドリングを実装すること !!!
    }
  }

}

export default ConverterForTHREE