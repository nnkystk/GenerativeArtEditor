import React, { useEffect, useState, useRef } from "react";
import { Grid, Divider } from "@material-ui/core";
import GeneModel from '../../Utilities/GeneModel';
import GeneEffectInterface from '../../Utilities/GeneEffects/GeneEffectInterface';
import GeneEffectParameter from '../../Utilities/GeneEffects/GeneEffectParameter';
import { GeneGenerator } from '../../Utilities/GeneGenerator';
import { PlaybackScreen } from '../Organisms/PlaybackScreen';
import { CodingScreen } from '../Organisms/CodingScreen';
import { CodingScreenDev } from '../Organisms/CodingScreenDev';



type Props = {
  sampleProp         ?: any;
  temporaryStorage    : any;
  setTemporaryStorage : any;
}
type Vector = {
  x: number, y: number, z: number
}

export const EditorPage : React.FC<Props> = (props: Props) => {

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

    // 一時保存された作品情報がある場合、その情報を読み込む
    // ない場合、新規にサンプルモデルを生成する
    if(props.temporaryStorage){
      setGeneModelList(props.temporaryStorage);
    }else{
      // サンプルモデルを生成
      const mesh      = GeneGenerator.generateMesh();
      const geneModel = GeneGenerator.generateGeneModel(mesh.id, mesh);
      const _GeneModelList = [ ...geneModelList, geneModel ];   // MEMO: pushによる配列の更新はReactが変更を検知できないため新しいリストを作成すること
      setGeneModelList(_GeneModelList);
    }

  }

  const setGeneModelPosition = (geneModel: GeneModel, position: Vector) => {
    geneModel.mesh.position.set(position.x, position.y, position.z);  // THREE.jsへ変更を反映
    const _geneModelList = [ ...geneModelList ];                      // UIに変更を反映（THREE.jsへの変更反映とUIへの変更反映がそれぞれ必要）
    setGeneModelList(_geneModelList);
    props.setTemporaryStorage(_geneModelList);                        // 作品データを一時保存
  }

  const setGeneEffectParameter = (geneEffect: GeneEffectInterface, paramater: GeneEffectParameter) => {
    geneEffect.parameter = paramater;
    const _geneModelList = [ ...geneModelList ];    // UIに変更を反映
    setGeneModelList(_geneModelList);
    props.setTemporaryStorage(_geneModelList);      // 作品データを一時保存
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
        setParameter          = { setGeneEffectParameter }
      />
    }
    return panelToShow;
  }

  const addGeneModel = () => {
    const mesh      = GeneGenerator.generateMesh();
    const geneModel = GeneGenerator.generateGeneModel(mesh.id, mesh);
    const _GeneModelList = [ ...geneModelList, geneModel ];
    setGeneModelList(_GeneModelList);
    props.setTemporaryStorage(_GeneModelList);    // 作品データを一時保存
  }

  const onClickCodingButton = () => {
    setPanelToShowIndex(INDEX_CODING_PANEL);
  }
  const onClickSampleButton = () => {
    setPanelToShowIndex(INDEX_SAMPLE_PANEL);
  }

  return(
    <Grid container spacing = { 2 }>

      <Grid item xs = { 9 } style = { { zIndex:50 } }>
        <PlaybackScreen geneModelList = { geneModelList } setGeneModelList = { setGeneModelList } />
      </Grid>

      <Grid item xs = { 3 } style = { { backgroundColor: "white", zIndex: 100 } }>
        <div className = "SwitchGuidePanel">
          <button onClick = { onClickCodingButton }> CODE </button>
          <button onClick = { onClickSampleButton }> SAMPLE </button>
        </div>
        <div className = "GuidePanel">
          { decideGuidePanelToShow(panelToShowIndex) }
        </div>
      </Grid>
    </Grid>
  );
};

export default EditorPage

