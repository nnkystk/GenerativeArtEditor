import React, { useEffect, useState, useRef } from "react";
import { PlaybackScreen } from '../Organisms/PlaybackScreen'


type Props = {
  sampleProp ?: any;
}

export const EditorPage : React.FC<Props> = ({ sampleProp }) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) }, [ sampleState ] );
  
  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  return(
    <div>
      <SwitchPanel />
      <PlaybackScreen />
    </div>
  );
};


export default EditorPage



const SwitchPanel = () => {
  
  return(
    <div>
      <button>Works</button>
      <button>Edit</button>
      <button>Preview</button>
    </div>
  )

}




// 表示エリアのサイズを取得する処理のサンプル
const Sample = () => {

  const ref: any | null = useRef(null);

  useEffect(() => {
    console.log(ref.current);
    console.log(
      JSON.stringify(ref.current.getBoundingClientRect())
    );
  }, []);

  return (
    <div ref={ref}>
      <h2> Sample </h2>
    </div>
  );
};
