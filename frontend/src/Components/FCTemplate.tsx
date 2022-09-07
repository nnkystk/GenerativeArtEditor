import React, { useEffect, useState } from "react";

/**
 * Summary	: XXXするComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
interface Props {
  sampleProp ?: any;
}

// export const FCTemplate: React.FC<Props> = ({ sampleProp= "sample!!" }) => {
export const FCTemplate: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) }, [ sampleState ] );
  useEffect( () => { return () => { test } }, []);   // コンポーネントがアンマウントされた際に実行されるクリーンアップ処理


  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setSampleState(newValue);
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    /**
    * Summary
    * @param arg 
    * @return 
    */
    console.log('test');
  }
  
  const onClickResetButton = () => {
    const initialVal = 'This is SampleState';
    setSampleState(initialVal);
  }

  return(
    <div>
      <h2>{ FCTemplate.name }</h2>
      <h2>{ props.sampleProp }</h2>
      <button onClick = { test }> Test </button>
      <button onClick = { onClickResetButton }> Reset</button>
      <input
        type      = "text"
        value     = { sampleState }
        onChange  = { handleChange }
      />
    </div>
  );
}

export default FCTemplate