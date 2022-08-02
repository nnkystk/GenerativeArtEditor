import React from 'react';

/**
 * Outline	: XXXするComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */
export function FuncComponentTemplate (props) {

  // ___ props and state ___ ___ ___ ___ ___
  const { elements } = props;
  const [ value, setValue ] = React.useState(0);

	// ___ event handler ___ ___ ___ ___ ___
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  return(
    <div>
      <button onClick = { test }> TEST </button>
    </div>
  );

}
