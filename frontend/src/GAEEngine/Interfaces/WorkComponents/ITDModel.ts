import IEffect from "./IEffect";

export interface ITDModel{
  
  uid       : any;
  type      : TDModelType;
  property  : TDModelProperty;
  tdObj     : ITDModel;
  effects   : Array<IEffect>;
  
}

// !!! 仮 !!!
class TDModelType{}
class TDModelProperty{}

export default ITDModel