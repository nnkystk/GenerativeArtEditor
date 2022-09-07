import React, { useEffect, useState } from "react";
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
    setColor(_color);
  }
  const handleChangeG = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _color = { ...color } 
    const inputVal =  event.target.valueAsNumber? event.target.valueAsNumber: 0;
    const newVal  = inputVal.toString(16);
    _color.g     = newVal
    setColor(_color);
  }
  const handleChangeB = (event : React.ChangeEvent<HTMLInputElement>) => {
    const _color = { ...color } 
    const inputVal =  event.target.valueAsNumber? event.target.valueAsNumber: 0;
    const newVal  = inputVal.toString(16);
    _color.b     = newVal
    setColor(_color);
  }

  const onBlur = () => {
    props.geneModel.setColor(color);
    props.setReqInstPlayFlg(true);    // 変更内容を反映するために1フレーム再生する
  }


  return(
    <div>

      <div> Color: </div>

      {/** UI上では16進数の値を10進数に変換した値を表示する */}
      <input
        type      = "number"
        step      = "1"
        value     = { parseInt(color.r, 16) }
        onChange  = { handleChangeR }
        onBlur    = { onBlur }
      />

      <input
        type      = "number"
        step      = "1"
        value     = { parseInt(color.g, 16)  }
        onChange  = { handleChangeG }
        onBlur    = { onBlur }
      />

      <input
        type      = "number"
        step      = "1"
        value     = { parseInt(color.b, 16)  }
        onChange  = { handleChangeB }
        onBlur    = { onBlur }
      />

    </div>
  )
}


export default ColorInputForm