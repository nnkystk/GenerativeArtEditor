import GeneInteractionInterface from './GeneInteractionInterface'
import { EffectID } from '../GlobalVarriables/EffectCatalog';

class GeneInteractionStorage{

  public storage: Array<GeneInteractionInterface> = [];

  constructor(){
  }

  store(geneEffect: GeneInteractionInterface){
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

export default GeneInteractionStorage