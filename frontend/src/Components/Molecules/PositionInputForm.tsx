import React, { useEffect, useState } from "react";
import GeneModelStorage from "src/Utilities/GeneModelStorage";
import GeneModel from '../../Utilities/GeneModel'

// Type Declaration of Props
type Vector = {
  x: number, y: number, z: number
}

interface Props{
  geneModelStorage: GeneModelStorage
  geneModel       : GeneModel
}


export const PositionInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ position, setPosition ] = useState<Vector>(props.geneModel.position);

  // ___ event handler ___ ___ ___ ___ ___
  const handleChangeX = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _position = { ...position } 
    const newVal    = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _position.x     = newVal
    // handleChange内ではprops.setPosition（つまり親のstateに変更が伴う処理）を行わないこと
    // 高頻度でcanvasの再レンダーが起きるとTHREEがクラッシュする可能性があるため
    setPosition(_position);
  }
  const handleChangeY = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _position = { ...position } 
    const newVal    = event.target.valueAsNumber > 0? event.target.valueAsNumber: 0;
    _position.y     = newVal
    setPosition(_position);
  }

  const onBlur = () => {
    props.geneModelStorage.setPosition(props.geneModel.id, position);
  }


  return(
    <div>

      <div> POSITION: </div>

      <input
        type      = "number"
        step      = "10"
        value     = { position.x }
        onChange  = { handleChangeX }
        onBlur    = { onBlur }
      />
      
      <input
        type      = "number"
        step      = "10"
        value     = { position.y }
        onChange  = { handleChangeY }
        onBlur    = { onBlur }
      />

    </div>
  )
}


export default PositionInputForm