import React, { useEffect, useState, useRef } from "react";
import * as THREE from 'three';
import GeneModel from '../Utilities/GeneModel'
import { PlaybackScreen } from '../Organisms/PlaybackScreen'
import { CodingScreen } from '../Organisms/CodingScreen'
import { CodingScreenDev } from '../Organisms/CodingScreenDev'


type Props = {
  sampleProp ?: any;
}

export const EditorPage : React.FC<Props> = ({ sampleProp }) => {

  const INDEX_EDIT_PANEL    = "EDIT";
  const INDEX_WORKS_PANEL   = "WORK";
  const INDEX_PREVIEW_PANEL = "PREVIRW";

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ]     = useState<string>('This is SampleState');
  const [ geneModelList, setGeneModelList ] = useState<Array<GeneModel>>([]);
  const [ panelToShowIndex, setPanelToShowIndex ] = useState<string>(INDEX_PREVIEW_PANEL);  // 表示する対象パネルのキー

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
    const geometry  = new THREE.BoxGeometry(400, 400, 400);
    const material  = new THREE.MeshNormalMaterial();
    const box       = new THREE.Mesh(geometry, material);

    const geneModel = new GeneModel(box);
    const _GeneModelList = [ ...geneModelList, geneModel ];   // MEMO: pushによる配列の更新はReactが変更を検知できないため新しいリストを作成すること
    setGeneModelList(_GeneModelList);

  }


  const decidePanelToShow = (index: string) =>{
    let panelToShow;
    if(index == INDEX_WORKS_PANEL){
      panelToShow = <h2> WIP </h2>
    }else if(index == INDEX_EDIT_PANEL){
      panelToShow = <CodingScreenDev geneModelList = { geneModelList } />
      // panelToShow = <CodingScreen geneModelList = { geneModelList } />
    }else if(index == INDEX_PREVIEW_PANEL){
      panelToShow = <PlaybackScreen geneModelList = { geneModelList } />
    }
    return panelToShow;
  }


  const onClickEditButton = () => {
    setPanelToShowIndex(INDEX_EDIT_PANEL);
  }
  const onClickWorksButton = () => {
    setPanelToShowIndex(INDEX_WORKS_PANEL);
  }
  const onClickPreviewButton = () => {
    setPanelToShowIndex(INDEX_PREVIEW_PANEL);
  }


  return(
    <div>
      <div className="SwitchPanel">
      <button onClick = { onClickWorksButton }> WORKS </button>
        <button onClick = { onClickEditButton }> EDIT </button>
        <button onClick = { onClickPreviewButton }> PREVIEW </button>
      </div>

      { decidePanelToShow(panelToShowIndex) }

    </div>
  );
};


export default EditorPage



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
