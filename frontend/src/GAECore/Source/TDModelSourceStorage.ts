import TDModelSource from './TDModelSource';

class TDModelSourceStorage{

  public storage: Array<TDModelSource> = [];

  constructor(){
  }

  store(tdModelSource: TDModelSource){
    this.storage.push(tdModelSource);
  }
  
}

export default TDModelSourceStorage