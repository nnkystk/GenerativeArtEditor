import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { NumberInputForm } from './NumberInputForm'
import Vector from '../../Utilities/GlobalVarriables/Vector'


interface Props{
  scale: Vector;
  updateParentState(...args: any): void;
}


export const ScaleInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ scale, setScale ] = useState<Vector>(props.scale);

  // ___ event handler ___ ___ ___ ___ ___


  return(
    <div>

      <Grid container spacing = { 2 }>
        <Grid item xs = { 12 }>
          <span> scale: </span>
        </Grid>
      </Grid>

      <Grid container alignItems ="center" spacing = { 2 }>

        <Grid item xs = { 12 } md = { 4 }>
          <NumberInputForm
            value = { scale.x }
            label = { 'X' }
            inputProps = {{
              step  : '0.05',
            }}
            updateParentState = { (newVal) => {
              props.scale.x = newVal;
              props.updateParentState();
            } }
          />
        </Grid>
        
        <Grid item xs = { 12 } md = { 4 }>
          <NumberInputForm
            value = { scale.y }
            label = { 'Y' }
            inputProps = {{
              step  : '0.05',
            }}
            updateParentState = { (newVal) => {
              props.scale.y = newVal;
              props.updateParentState();
            } }
          />
        </Grid>

        <Grid item xs = { 12 } md = { 4 }>
          <NumberInputForm
              value = { scale.z }
              label = { 'Z' }
              inputProps = {{
                step  : '0.05',
              }}
              updateParentState = { (newVal) => {
                props.scale.z = newVal;
                props.updateParentState();
              } }
            />
        </Grid>

      </Grid>

    </div>
  )
}

export default ScaleInputForm