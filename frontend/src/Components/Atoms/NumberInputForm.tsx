import React, { useState } from "react";

interface Props{
  val     : any;
  step   ?: string;
  setVal(val: any) : any;
}

export const NumberInputForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ valUI, setValUI ] = useState<any>(props.val);

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newValUI = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    setValUI(newValUI);
  }

  const onBlur = () => {
    props.setVal(valUI);
  }

  return(
      <input
        type      = "number"
        step      = { props.step? props.step: "10" }
        value     = { valUI }
        onChange  = { handleChange }
        onBlur    = { onBlur }
      />
  )

}

export default NumberInputForm