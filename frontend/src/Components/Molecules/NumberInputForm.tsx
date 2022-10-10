import React, { useState } from "react";
import { TextField } from "@material-ui/core";

interface Props{
  value : number;
  step  : number;
  type  : string;
  label : string;
  updateParentState(newVal: number): void;
}

export const NumberInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ value, setValue ] = useState<string | number>(props.value);

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newVal    = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    // UIに変更を反映
    setValue(newVal);
    // 親ComponentのStateに変更を反映
    props.updateParentState(newVal);
  }

  return(

    <TextField
      value     = { value }
      onChange  = { handleChange }
      label     = { props.label }
      inputProps = {{
        step: props.step
      }}
      type      = { 'number' }
      variant   = "outlined"
      size      = "small"
      InputLabelProps = {{
        shrink: true,
      }}
    />
        

  )
}

export default NumberInputForm