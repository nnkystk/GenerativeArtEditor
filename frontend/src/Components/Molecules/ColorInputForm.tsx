import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import GeneModel from '../../Utilities/GeneModel'
import HexadecimalColor from '../../Utilities/HexadecimalColor'

// Type Declaration of Props
interface Props{
  geneModel: GeneModel
  setReqInstPlayFlg(bool: boolean): void;
}

export const ColorInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ color, setColor ] = useState<HexadecimalColor>(props.geneModel.color);

  // ___ event handler ___ ___ ___ ___ ___
  // handleChange内ではprops.setPosition（つまり親のstateに変更が伴う処理）を行わないこと
  // 高頻度でcanvasを再レンダーするとTHREEがクラッシュを起こす可能性があるため
  const handleChangeR = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _color = { ...color } 
    const inputVal =  event.target.valueAsNumber? event.target.valueAsNumber: 0;
    const newVal  = inputVal.toString(16);
    _color.r     = newVal
    // UIに変更を反映
    updateUI(_color);
  }
  const handleChangeG = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _color = { ...color } 
    const inputVal =  event.target.valueAsNumber? event.target.valueAsNumber: 0;
    const newVal  = inputVal.toString(16);
    _color.g     = newVal
    // UIに変更を反映
    updateUI(_color);
  }
  const handleChangeB = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _color = { ...color } 
    const inputVal =  event.target.valueAsNumber? event.target.valueAsNumber: 0;
    const newVal  = inputVal.toString(16);
    _color.b     = newVal
    // UIに変更を反映
    updateUI(_color);
  }
  const updateUI = (color: HexadecimalColor) => {
    // UIに反映
    setColor(color);
    // 3Dレンダー画面に反映
    props.geneModel.setColor(color);
    props.setReqInstPlayFlg(true);    // 変更内容を反映するために1フレーム再生する
  }

  return(
    <div>

      <Grid container spacing = { 2 }>
        <Grid item xs = { 12 }>
          <span> Color: </span>
        </Grid>
      </Grid>

      <Grid container alignItems ="center" spacing = { 2 }>

        <Grid item xs = { 12 } md = { 4 }>
          {/** UI上では16進数の値を10進数に変換した値を表示する */}
          <TextField
            variant   = "outlined"
            type      = "number"
            label     = "R"
            value     = { parseInt(color.r, 16) }
            onChange  = { handleChangeR }
            size      = "small"
            inputProps = {{
              step  : "5",
              min   : "0",
              max   : "255"
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
            label     = "G"
            value     = { parseInt(color.g, 16) }
            onChange  = { handleChangeG }
            size      = "small"
            inputProps = {{
              step  : "5",
              min   : "0",
              max   : "255"
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
            label     = "B"
            value     = { parseInt(color.b, 16) }
            onChange  = { handleChangeB }
            size      = "small"
            inputProps = {{
              step  : "5",
              min   : "0",
              max   : "255"
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


export default ColorInputForm