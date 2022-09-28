import GeneEffectInterface from './GeneEffectInterface'
import GeneEffectParameter from './GeneEffectParameter';
import ReflectAtBoundary from './Special/ReflectAtBoundary';
import AtBoundaryInterface from './Special/AtBoundaryInterface';
import { EffectID } from '../GlobalVarriables/EffectCatalog';

class GeneEffectStorage{

  public storage: Array<GeneEffectInterface> = [];
  public effectAtBoundary: AtBoundaryInterface;   // 3Dオブジェクトの表示位置が境界を超えた際に実行するアニメーション

  constructor(){
    /// !!! 仮置き !!!
    this.effectAtBoundary = new ReflectAtBoundary(new GeneEffectParameter(), { x: 500, y: 500, z: 500 });
  }

  store(geneEffect: GeneEffectInterface){
    // 重複している場合は追加を許可しない
    const isDuplicated = this.checkDuplication(geneEffect.id)
    if(isDuplicated){
      console.log('The effect is already exit.')
    }else{
      this.storage.push(geneEffect);
    }
  }

  checkDuplication(id: EffectID){
    // Summary: 既にStorage内に渡されたIDのEffectが存在するか判定する
    const result = this.storage.find( (effect) => effect.id == id );
    const isExist = result? true : false
    return isExist    
  }

}

export default GeneEffectStorage