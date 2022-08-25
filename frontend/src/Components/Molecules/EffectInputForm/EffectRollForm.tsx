import React, { useEffect, useState } from "react";
import GeneEffectInterface from "src/Components/Utilities/GeneEffects/GeneEffectInterface";
import GeneEffectRoll from "src/Components/Utilities/GeneEffects/GeneEffectRoll";

type Vector = {
  x: number, y: number, z: number
}
// Type Declaration of Props
interface Props{
  geneEffect: GeneEffectRoll | GeneEffectInterface
  setParameters(geneEffect: GeneEffectInterface, vector: Vector) : void
}

export const EffectRollForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ parameters, setParameters ] = useState<Vector>(props.geneEffect.parameters);

  // ___ event handler ___ ___ ___ ___ ___
  const handleChangeX = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _parameters = { ...parameters } 
    const newVal      = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _parameters.x     = newVal
    setParameters(_parameters);
  }
  const handleChangeY = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _parameters = { ...parameters } 
    const newVal      = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _parameters.y     = newVal
    setParameters(_parameters);
  }
  const handleChangeZ = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _parameters = { ...parameters } 
    const newVal      = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _parameters.z     = newVal
    setParameters(_parameters);
  }

  const onBlur = () => {
    props.setParameters(props.geneEffect, parameters);
  }


  return(
    <div>

      <input
        type      = "number"
        step      = "0.001"
        value     = { parameters.x }
        onChange  = { handleChangeX }
        onBlur    = { onBlur }
      />
      
      <input
        type      = "number"
        step      = "0.001"
        value     = { parameters.y }
        onChange  = { handleChangeY }
        onBlur    = { onBlur }
      />

      <input
        type      = "number"
        step      = "0.001"
        value     = { parameters.z }
        onChange  = { handleChangeZ }
        onBlur    = { onBlur }
      />

    </div>
  )
}


export default EffectRollForm