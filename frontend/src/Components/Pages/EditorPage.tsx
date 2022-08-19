import React, { useEffect, useState, useRef } from "react";
import * as THREE from 'three';
import GeneModel from '../Utilities/GeneModel'
import GeneEffectRoll from '../Utilities/GeneEffects/GeneEffectRoll'
import { PlaybackScreen } from '../Organisms/PlaybackScreen'
import { CodingScreen } from '../Organisms/CodingScreen'
import { CodingScreenDev } from '../Organisms/CodingScreenDev'
import { Grid } from "@material-ui/core";


type Props = {
  sampleProp ?: any;
}
type Vector = {
  x: number, y: number, z: number
}

export const EditorPage : React.FC<Props> = ({ sampleProp }) => {

  const INDEX_SAMPLE_PANEL  = "SAMPLE";
  const INDEX_CODING_PANEL  = "CODING";

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ]     = useState<string>('This is SampleState');
  const [ geneModelList, setGeneModelList ] = useState<Array<GeneModel>>([]);
  const [ panelToShowIndex, setPanelToShowIndex ] = useState<string>(INDEX_CODING_PANEL);  // 表示する対象パネルを指定するキー

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

    const createSampleGeneModel = () => {
      const mesh = generateMesh();
      return generateGeneModel(mesh.id, mesh);
    }

    const geneModel = createSampleGeneModel();
    const _GeneModelList = [ ...geneModelList, geneModel ];   // MEMO: pushによる配列の更新はReactが変更を検知できないため新しいリストを作成すること
    setGeneModelList(_GeneModelList);
  }


  // MEMO: 外部クラスメソッド化する
  const generateMesh = () => {
    const geometry  = new THREE.BoxGeometry(100, 100, 100);
    const material  = new THREE.MeshNormalMaterial();
    const box       = new THREE.Mesh(geometry, material);   // !!! 仮置きでboxメッシュを生成 !!!
    return box
  }


  // MEMO: 外部クラスメソッド化する
  const generateGeneModel = (id: number, mesh: THREE.Mesh) => {
    const name        = "sample"
    const effectList  = [ new GeneEffectRoll({ x: 0, y: 0.01, z: 0 }) ]   // !!! 仮置きでROLLEffectを生成 !!!
    const geneModel   = new GeneModel(id, mesh, effectList, { name: name });
    return geneModel
  }


  // MEMO: 外部クラスメソッド化する
  const setGeneModelPosition = (geneModel: GeneModel, position: Vector) => {
    geneModel.mesh.position.set(position.x, position.y, position.z);  // THREE.jsへ変更を反映
    // geneModel.position = position
    const _geneModelList = [ ...geneModelList ]                 // UIに変更を反映（THREE.jsへの変更反映とUIへの変更反映がそれぞれ必要）
    setGeneModelList(_geneModelList);
  }


  const decideGuidePanelToShow = (index: string) =>{
    let panelToShow;
    if(index == INDEX_SAMPLE_PANEL){
      panelToShow = <h2> SAMPLE </h2>
    }else if(index == INDEX_CODING_PANEL){
      // panelToShow = <CodingScreen geneModelList = { geneModelList } />
      panelToShow = <CodingScreenDev
        geneModelList         = { geneModelList }
        onClickAddModelButton = { addGeneModel }
        setPosition           = { setGeneModelPosition }
      />
    }
    return panelToShow;
  }


  const addGeneModel = () => {
    const mesh      = generateMesh();
    const geneModel = generateGeneModel(mesh.id, mesh);
    const _GeneModelList = [ ...geneModelList, geneModel ];
    setGeneModelList(_GeneModelList);
  }


  const onClickCodingButton = () => {
    setPanelToShowIndex(INDEX_CODING_PANEL);
  }
  const onClickSampleButton = () => {
    setPanelToShowIndex(INDEX_SAMPLE_PANEL);
  }


  return(
    <div>
      <Grid container>
        <Grid item xs = { 10 }>
          <PlaybackScreen geneModelList = { geneModelList } setGeneModelList = { setGeneModelList } />
        </Grid>
        <Grid item xs = { 2 }>
          <div className = "SwitchGuidePanel">
            <button onClick = { onClickCodingButton }> CODE </button>
            <button onClick = { onClickSampleButton }> SAMPLE </button>
          </div>
          <div className = "GuidePanel">
            { decideGuidePanelToShow(panelToShowIndex) }
          </div>
        </Grid>
      </Grid>
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
