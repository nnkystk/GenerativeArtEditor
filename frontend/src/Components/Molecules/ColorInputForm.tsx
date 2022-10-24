import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { TextInputForm } from './TextInputForm'
import HexadecimalColor from '../../Utilities/GlobalVarriables/HexadecimalColor'

interface Props{
  color: HexadecimalColor;
  updateParentState(...args: any): void;
}

export const ColorInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ color, setcolor ] = useState<HexadecimalColor>(props.color);

  // ___ event handler ___ ___ ___ ___ ___


  return(
    <div>

      <Grid container spacing = { 2 }>
        <Grid item xs = { 12 }>
          <span> color: </span>
        </Grid>
      </Grid>

      <Grid container alignItems ="center" spacing = { 2 }>

        <Grid item xs = { 12 } md = { 4 }>
          <TextInputForm
            value = { color.r }
            label = { 'R' }
            inputProps = {{
              step  : "5",
              min   : "0",
              max   : "255"
            }}
            updateParentState = { (newVal) => {
              props.color.r = Number(newVal).toString(16);    // ToDo: 要見直し
              props.updateParentState();
            } }
          />
        </Grid>
        
        <Grid item xs = { 12 } md = { 4 }>
          <TextInputForm
            value = { color.g }
            label = { 'G' }
            inputProps = {{
              step  : "5",
              min   : "0",
              max   : "255"
            }}
            updateParentState = { (newVal) => {
              props.color.g = Number(newVal).toString(16);
              props.updateParentState();
            } }
          />
        </Grid>

        <Grid item xs = { 12 } md = { 4 }>
          <TextInputForm
              value = { color.b }
              label = { 'B' }
              inputProps = {{
                step  : "5",
                min   : "0",
                max   : "255"
              }}
              updateParentState = { (newVal) => {
                props.color.b = Number(newVal).toString(16);
                props.updateParentState();
              } }
            />
        </Grid>

      </Grid>

    </div>
  )
}

export default ColorInputForm