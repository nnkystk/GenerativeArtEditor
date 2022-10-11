import TDModel from './TDModel';

class TDModelStorage{

  public storage: Array<TDModel> = [];

  store(tdModel: TDModel){
    this.storage.push(tdModel);
  }


}

export default TDModelStorage