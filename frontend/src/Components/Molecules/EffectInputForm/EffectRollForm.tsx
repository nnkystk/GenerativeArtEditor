import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import GeneEffectInterface from "src/Utilities/GeneEffects/GeneEffectInterface";
import GeneEffectRoll from '../../../Utilities/GeneEffects/GeneEffectRoll';
import GeneEffectParameter from  '../../../Utilities/GeneEffects/GeneEffectParameter'

interface Props{
  geneEffect: GeneEffectRoll | GeneEffectInterface
}

export const EffectRollForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ parameter, setParameter ] = useState<GeneEffectParameter>(props.geneEffect.parameter);

  // ___ event handler ___ ___ ___ ___ ___
  const handleChangeX = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _parameters     = { ...parameter } 
    const newVal          = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _parameters.rotation.x  = newVal
    setParameter(_parameters);
  }
  const handleChangeY = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _parameters     = { ...parameter } 
    const newVal          = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _parameters.rotation.y  = newVal
    setParameter(_parameters);
  }
  const handleChangeZ = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _parameters     = { ...parameter } 
    const newVal          = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _parameters.rotation.z  = newVal
    setParameter(_parameters);
    props.geneEffect.parameter = _parameters;
  }


  return(

    <Grid container alignItems ="center" spacing = { 2 }>

      <Grid item xs = { 12 } md = { 4 }>
        <TextField
          variant   = "outlined"
          type      = "number"
          label     = "X"
          value     = { parameter.rotation.x  }
          onChange  = { handleChangeX }
          size      = "small"
          inputProps = {{
            step  : "0.001",
          }}
          InputLabelProps = {{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs = { 12 } md = { 4 }>
        <TextField
          variant   = "outlined"
          type      = "number"
          label     = "Y"
          value     = { parameter.rotation.y  }
          onChange  = { handleChangeY }
          size      = "small"
          inputProps = {{
            step  : "0.001",
          }}
          InputLabelProps = {{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs = { 12 } md = { 4 }>
        <TextField
          variant   = "outlined"
          type      = "number"
          label     = "Z"
          value     = { parameter.rotation.z  }
          onChange  = { handleChangeZ }
          size      = "small"
          inputProps = {{
            step  : "0.001",
          }}
          InputLabelProps = {{
            shrink: true,
          }}
        />
      </Grid>

    </Grid>

  )
}


export default EffectRollForm