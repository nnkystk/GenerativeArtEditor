import React, { useState } from "react";
import GeneEffectInterface from "src/Utilities/GeneEffects/GeneEffectInterface";
import GeneEffectRoll from '../../../Utilities/GeneEffects/GeneEffectRoll';
import GeneEffectParameter from  '../../../Utilities/GeneEffects/GeneEffectParameter'
import geneModelStorage from '../../../Utilities/GeneModelStorage';

interface Props{
  geneEffect: GeneEffectRoll | GeneEffectInterface
  geneModelStorage: geneModelStorage
  geneModelID: number
}

export const EffectRollForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ parameter, setParameter ] = useState<GeneEffectParameter>(props.geneEffect.parameter);

  // ___ event handler ___ ___ ___ ___ ___
  const handleChangeX = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _parameters     = { ...parameter } 
    const newVal          = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _parameters.vector.x  = newVal
    setParameter(_parameters);
  }
  const handleChangeY = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _parameters     = { ...parameter } 
    const newVal          = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _parameters.vector.y  = newVal
    setParameter(_parameters);
  }
  const handleChangeZ = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _parameters     = { ...parameter } 
    const newVal          = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _parameters.vector.z  = newVal
    setParameter(_parameters);
  }

  const onBlur = () => {
    props.geneModelStorage.setEffectParameter(props.geneModelID, props.geneEffect.uid,  parameter);
  }


  return(
    <div>

      <input
        type      = "number"
        step      = "0.001"
        value     = { parameter.vector.x }
        onChange  = { handleChangeX }
        onBlur    = { onBlur }
      />
      
      <input
        type      = "number"
        step      = "0.001"
        value     = { parameter.vector.y }
        onChange  = { handleChangeY }
        onBlur    = { onBlur }
      />

      <input
        type      = "number"
        step      = "0.001"
        value     = { parameter.vector.z }
        onChange  = { handleChangeZ }
        onBlur    = { onBlur }
      />

    </div>
  )
}


export default EffectRollForm