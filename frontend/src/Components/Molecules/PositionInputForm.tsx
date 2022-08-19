import React, { useEffect, useState } from "react";
import GeneModel from '../Utilities/GeneModel'


// Type Declaration of Props
type Vector = {
  x: number, y: number, z: number
}

interface Props{
  geneModel   : GeneModel
  setPosition(geneModel: GeneModel, vector: Vector) : void
}


export const PositionInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ position, setPosition ] = useState<Vector>(props.geneModel.position);

  // ___ event handler ___ ___ ___ ___ ___
  const handleChangeX = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _position = { ...position } 
    const newVal    = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _position.x     = newVal
    setPosition(_position);
  }
  const handleChangeY = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _position = { ...position } 
    const newVal    = event.target.valueAsNumber > 0? event.target.valueAsNumber: 0;
    _position.y     = newVal
    setPosition(_position);
  }

  const onBlur = () => {
    props.setPosition(props.geneModel, position);
  }


  return(
    <div>

      <span> POSITION: </span>

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