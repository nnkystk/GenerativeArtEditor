import React, { useEffect, useState, useRef } from "react";
import * as THREE from 'three';
import { PlaybackScreen } from '../Organisms/PlaybackScreen'
import { CodingScreen } from '../Organisms/CodingScreen'
import { CodingScreenDev } from '../Organisms/CodingScreenDev'


type Props = {
  sampleProp ?: any;
}

export const EditorPage : React.FC<Props> = ({ sampleProp }) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ]     = useState<string>('This is SampleState');
  const [ threeMeshList, setThreeMeshList ] = useState<Array<THREE.Mesh>>([]);

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) },  [ sampleState ] );
  useEffect( () => { initializeThree() },         []);
  
  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  const initializeThree = () => {
    
    // 3Dオブジェクトのサンプルを生成
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);

    const _threeMeshList = [ ...threeMeshList, box ];   // MEMO: pushによる配列の更新はReactが変更を検知できないため新しいリストを作成すること
    setThreeMeshList(_threeMeshList);

  }

  return(
    <div>
      <SwitchPanel />

      <PlaybackScreen threeMeshList = { threeMeshList } />

      <CodingScreen />
      <CodingScreenDev threeMeshList = { threeMeshList } />
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
