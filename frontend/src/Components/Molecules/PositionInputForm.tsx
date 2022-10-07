import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import Vector from '../../Utilities/GlobalVarriables/Vector'
import TDModelSourceProperty from "src/GAECore/Source/TDModelSourceProperty";

interface Props{
  property: TDModelSourceProperty;
  updateTDModelSourceStorage(): void;
  setReqInstPlayFlg(bool: boolean): void;
}
export const PositionInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ position, setPosition ] = useState<Vector>(props.property.position);

  // ___ event handler ___ ___ ___ ___ ___
  const handleChangeX = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _position = { ...position } 
    const newVal    = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _position.x     = newVal;
    // 変更を反映
    updateUI(_position);
  }
  const handleChangeY = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _position = { ...position } 
    const newVal    = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _position.y     = newVal;
    // 変更を反映
    updateUI(_position);
  }
  const handleChangeZ = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _position = { ...position } 
    const newVal    = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _position.z     = newVal;
    // 変更を反映
    updateUI(_position);
  }
  const updateUI = (position: Vector) => {
    // オブジェクトに反映
    setPosition(position);
    // UIに反映
    props.updateTDModelSourceStorage();
    // 3Dレンダー画面に反映
    props.setReqInstPlayFlg(true);    // 変更内容を反映するために1フレーム再生する
  }

  return(
    <div>

      <Grid container spacing = { 2 }>
        <Grid item xs = { 12 }>
          <span> Position: </span>
        </Grid>
      </Grid>

      <Grid container alignItems ="center" spacing = { 2 }>

        <Grid item xs = { 12 } md = { 4 }>
          <TextField
            variant   = "outlined"
            type      = "number"
            label     = "X"
            value     = { position.x }
            onChange  = { handleChangeX }
            size      = "small"
            inputProps = {{
              step: "10"
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
            value     = { position.y }
            onChange  = { handleChangeY }
            size      = "small"
            inputProps = {{
              step: "10"
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
            value     = { position.z }
            onChange  = { handleChangeZ }
            size      = "small"
            inputProps = {{
              step: "10"
            }}
            InputLabelProps = {{
              shrink: true,
            }}
          />
        </Grid>

      </Grid>

    </div>
  )
}

export default PositionInputForm