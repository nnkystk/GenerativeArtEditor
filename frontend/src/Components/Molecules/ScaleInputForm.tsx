import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import GeneModel from '../../Utilities/GeneModel'

// Type Declaration of Props
type Vector = {
  x: number, y: number, z: number
}

interface Props{
  geneModel: GeneModel
  setReqInstPlayFlg(bool: boolean): void;
}


export const ScaleInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ scale, setScale ] = useState<Vector>(props.geneModel.scale);

  // ___ event handler ___ ___ ___ ___ ___
  // handleChange内ではprops.setPosition（つまり親のstateに変更が伴う処理）を行わないこと
  // 高頻度でcanvasを再レンダーするとTHREEがクラッシュを起こす可能性があるため
  const handleChangeX = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _scale = { ...scale } 
    const newVal = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _scale.x     = newVal
    // UIに変更を反映
    updateUI(_scale);
  }
  const handleChangeY = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _scale = { ...scale } 
    const newVal = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _scale.y     = newVal
    // UIに変更を反映
    updateUI(_scale);
  }
  const handleChangeZ = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _scale = { ...scale } 
    const newVal = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    _scale.z     = newVal
    // UIに変更を反映
    updateUI(_scale);
  }

  const updateUI = (scale: Vector) => {
    // UIに反映
    setScale(scale);
    // 3Dレンダー画面に反映
    props.geneModel.setScale(scale);
    props.setReqInstPlayFlg(true);    // 変更内容を反映するために1フレーム再生する
  }

  return(
    <div>

      <Grid container spacing = { 2 }>
        <Grid item xs = { 12 }>
          <span> Scale: </span>
        </Grid>
      </Grid>

      <Grid container alignItems ="center" spacing = { 2 }>
        <Grid item xs = { 12 } md = { 4 }>
          <TextField
            variant   = "outlined"
            type      = "number"
            label     = "X"
            value     = { scale.x }
            onChange  = { handleChangeX }
            size      = "small"
            inputProps = {{
              step: "0.05"
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
            value     = { scale.y }
            onChange  = { handleChangeY }
            size      = "small"
            inputProps = {{
              step: "0.05"
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
            value     = { scale.z }
            onChange  = { handleChangeZ }
            size      = "small"
            inputProps = {{
              step: "0.05"
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

export default ScaleInputForm