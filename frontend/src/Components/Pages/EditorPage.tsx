import React, { useEffect, useState, useRef, useMemo } from "react";
import { Grid } from "@material-ui/core";
import { PlaybackScreen } from '../Organisms/PlaybackScreen';
import { CodingScreen } from '../Organisms/CodingScreen';
import { CodingScreenDev } from '../Organisms/CodingScreenDev';
import GeneModelStorage from "../../Utilities/GeneModelStorage";

type Props = {
  sampleProp         ?: any;
  temporaryStorage    : any;
  setTemporaryStorage : any;
}

export const EditorPage : React.FC<Props> = (props: Props) => {

  const INDEX_SAMPLE_PANEL  = "SAMPLE";
  const INDEX_CODING_PANEL  = "CODING";

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ]     = useState<string>('This is SampleState');
  const [ geneModelStorarge, setGeneModelStorarge ] = useState<GeneModelStorage>(new GeneModelStorage());
  const [ panelToShowIndex, setPanelToShowIndex ] = useState<string>(INDEX_CODING_PANEL);  // 表示する対象パネルを指定するキー
  const [ isPlayingFlg, setIsPlayingFlg ]   = useState<boolean>(false);
  const [ isEditableFlg, setIsEditableFlg ] = useState<boolean>(true);

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) },  [ sampleState ] );
  useEffect( () => { initializeThree() },         []);
  useEffect( () => { switchIsEditableFlg() },     [ isPlayingFlg ] );
  
  // ___ use memo ___ ___ ___ ___ ___
  /** MEMO: なぜuseMemoを使用しているのか？
   *    Ans. canvas要素のcontextが多重に存在することで発生するエラーを避けるため
   *    - canvas要素を含むコンポーネントがレンダーされるたび、contextが内部的に生成される
   *    - contextの存在個数が上限を突破するとブラウザが間引きを行う。THREEがコンテキストを見失うことでエラーが発生する
   *    - 対策として、useMemoを用いて再レンダーの条件を通常のコンポーネントよりも絞る
   */
  const memoPlayBackScreen = useMemo( () => 
    <PlaybackScreen
      geneModelStorage  = { geneModelStorarge }
      isPlayingFlg      = { isPlayingFlg }
      setIsPlayingFlg   = { setIsPlayingFlg } 
    />,
    [geneModelStorarge, isPlayingFlg])

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
      setGeneModelStorarge(props.temporaryStorage);
    }else{
      // サンプルモデルを生成
      addGeneModel();
    }
    
    updateGeneModelStotage();
  }

  const updateGeneModelStotage = () => {
    const _geneModelStorarge = new GeneModelStorage();
    _geneModelStorarge.storage = geneModelStorarge.storage;
    setGeneModelStorarge(_geneModelStorarge);
    props.setTemporaryStorage(_geneModelStorarge);
  }


  const addGeneModel = () => {
    geneModelStorarge.addGeneModel();
    updateGeneModelStotage();
  }

  const switchIsEditableFlg = () => {
    /** 再生中はコーディングを禁止する */
    if(isPlayingFlg == true){
      setIsEditableFlg(false);
    }else{
      setIsEditableFlg(true);
    }
  }

  const decideGuidePanelToShow = (index: string) =>{
    let panelToShow;
    if(index == INDEX_SAMPLE_PANEL){
      panelToShow = <h2> SAMPLE </h2>
    }else if(index == INDEX_CODING_PANEL){
      // panelToShow = <CodingScreen geneModelList = { geneModelList } />
      panelToShow = <CodingScreenDev
        geneModelStorage        = { geneModelStorarge }
        updateGeneModelStotage  = { updateGeneModelStotage }
        onClickAddModelButton   = { addGeneModel }
      />
    }
    return panelToShow;
  }

  const provideGuidePanelStyle = (isEditableFlg: boolean) => {
    const style = isEditableFlg?
      { backgroundColor: "white", zIndex: 100 }
      : { backgroundColor: "grey", zIndex: 100 }
    return style
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
        { memoPlayBackScreen }
      </Grid>

      <Grid item xs = { 3 } style = { provideGuidePanelStyle(isEditableFlg) }>
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

