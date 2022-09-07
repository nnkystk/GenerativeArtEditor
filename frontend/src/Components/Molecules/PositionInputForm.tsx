import React, { useEffect, useState } from "react";
import GeneModelStorage from "src/Utilities/GeneModelStorage";
import GeneModel from '../../Utilities/GeneModel'

// Type Declaration of Props
type Vector = {
  x: number, y: number, z: number
}

interface Props{
  geneModel: GeneModel
  setReqInstPlayFlg(bool: boolean): void;
}


export const PositionInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ position, setPosition ] = useState<Vector>(props.geneModel.position);

  // ___ event handler ___ ___ ___ ___ ___
  const handleChangeX = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _position = { ...position } 
    const newVal    = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _position.x     = newVal
    // 変更をUIに反映
    updateUI(_position);
  }
  const handleChangeY = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _position = { ...position } 
    const newVal    = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _position.y     = newVal
    // 変更をUIに反映
    updateUI(_position);
  }
  const updateUI = (position: Vector) => {
    // UIに反映
    setPosition(position);
    // 3Dレンダー画面に反映
    props.geneModel.setPosition(position);
    props.setReqInstPlayFlg(true);    // 変更内容を反映するために1フレーム再生する
  }

  return(
    <div>

      <div> POSITION: </div>

      <input
        type      = "number"
        step      = "10"
        value     = { position.x }
        onChange  = { handleChangeX }
      />
      
      <input
        type      = "number"
        step      = "10"
        value     = { position.y }
        onChange  = { handleChangeY }
      />

    </div>
  )
}


export default PositionInputForm