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


export const ScaleInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ scale, setScale ] = useState<Vector>(props.geneModel.scale);

  // ___ event handler ___ ___ ___ ___ ___
  // handleChange内ではprops.setPosition（つまり親のstateに変更が伴う処理）を行わないこと
  // 高頻度でcanvasを再レンダーするとTHREEがクラッシュを起こす可能性があるため
  const handleChangeX = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _scale = { ...scale } 
    const newVal = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _scale.x     = newVal
    // UIに変更を反映
    updateUI(_scale);
  }
  const handleChangeY = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _scale = { ...scale } 
    const newVal = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _scale.y     = newVal
    // UIに変更を反映
    updateUI(_scale);
  }
  const handleChangeZ = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _scale = { ...scale } 
    const newVal = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _scale.z     = newVal
    // UIに変更を反映
    updateUI(_scale);
  }

  const updateUI = (scale: Vector) => {
    // UIに反映
    setScale(scale);
    // 3Dレンダー画面に反映
    props.geneModel.setScale(scale);
    props.setReqInstPlayFlg(true);    // 変更内容を反映するために1フレーム再生する
  }

  return(
    <div>

      <div> SIZE: </div>

      <input
        type      = "number"
        step      = "0.05"
        value     = { scale.x }
        onChange  = { handleChangeX }
      />
      <input
        type      = "number"
        step      = "0.05"
        value     = { scale.y }
        onChange  = { handleChangeY }
      />
      <input
        type      = "number"
        step      = "0.05"
        value     = { scale.z }
        onChange  = { handleChangeZ }
      />

    </div>
  )
}

export default ScaleInputForm