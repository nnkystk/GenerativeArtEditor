import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { NumberInputForm } from './NumberInputForm'
import Vector from '../../Utilities/GlobalVarriables/Vector'


interface Props{
  position: Vector;
  updateParentState(...args: any): void;
}


export const PositionInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ position, setPosition ] = useState<Vector>(props.position);

  // ___ event handler ___ ___ ___ ___ ___


  return(
    <div>

      <Grid container spacing = { 2 }>
        <Grid item xs = { 12 }>
          <span> Position: </span>
        </Grid>
      </Grid>

      <Grid container alignItems ="center" spacing = { 2 }>

        <Grid item xs = { 12 } md = { 4 }>
          <NumberInputForm
            value = { position.x }
            step  = { 10 }
            type  = { 'number' }
            label = { 'X' }
            updateParentState = { (newVal) => {
              props.position.x = newVal;
              props.updateParentState();
            } }
          />
        </Grid>
        
        <Grid item xs = { 12 } md = { 4 }>
          <NumberInputForm
            value = { position.y }
            step  = { 10 }
            type  = { 'number' }
            label = { 'Y' }
            updateParentState = { (newVal) => {
              props.position.y = newVal;
              props.updateParentState();
            } }
          />
        </Grid>

        <Grid item xs = { 12 } md = { 4 }>
          <NumberInputForm
              value = { position.z }
              step  = { 10 }
              type  = { 'number' }
              label = { 'Z' }
              updateParentState = { (newVal) => {
                props.position.z = newVal;
                props.updateParentState();
              } }
            />
        </Grid>

      </Grid>

    </div>
  )
}

export default PositionInputForm