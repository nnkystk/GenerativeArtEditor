import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import GeneEffectParameter from  '../../../Utilities/GeneEffects/GeneEffectParameter'
import NumberInputForm from '../NumberInputForm'
import EffectParameterSource from "src/GAECore/Source/Effects/EffectParameterSource";

interface Props{
  parameter: EffectParameterSource
  updateParentState(...args: any): void;
}

export const EffectRollForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ parameter, setParameter ] = useState<EffectParameterSource>(props.parameter);

  // ___ event handler ___ ___ ___ ___ ___

  return(

    <Grid container alignItems ="center" spacing = { 2 }>

      <Grid item xs = { 12 } md = { 4 }>
        <NumberInputForm
          value = { parameter.rotation.x }
          label = { 'X' }
          inputProps = {{
            step  : '0.001',
          }}
          updateParentState = { (newVal) => {
            props.parameter.rotation.x = newVal;
            props.updateParentState();
          } }
        />
      </Grid>

      <Grid item xs = { 12 } md = { 4 }>
        <NumberInputForm
            value = { parameter.rotation.y }
            label = { 'Y' }
            inputProps = {{
              step  : '0.001',
            }}
            updateParentState = { (newVal) => {
              props.parameter.rotation.y = newVal;
              props.updateParentState();
            } }
          />
      </Grid>

      <Grid item xs = { 12 } md = { 4 }>
      <NumberInputForm
          value = { parameter.rotation.z }
          label = { 'Z' }
          inputProps = {{
            step  : '0.001',
          }}
          updateParentState = { (newVal) => {
            props.parameter.rotation.z = newVal;
            props.updateParentState();
          } }
        />
      </Grid>

    </Grid>

  )
}


export default EffectRollForm