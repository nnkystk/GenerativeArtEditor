import React, { useEffect, useState, useRef, useMemo } from "react";
import { Grid, Divider } from "@material-ui/core";
import { PlaybackScreen } from '../Organisms/PlaybackScreen';
import { CodingScreen } from '../Organisms/CodingScreen';
import { CodingScreenDev } from '../Organisms/CodingScreenDev';
import GeneModelStorage from "../../Utilities/GeneModelStorage";

type Props = {
  sampleProp         ?: any;
}

export const EditorPage : React.FC<Props> = (props: Props) => {

  const INDEX_SAMPLE1_PANEL  = "SAMPLE1";
  const INDEX_SAMPLE2_PANEL  = "SAMPLE2";

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ]     = useState<string>('This is SampleState');
  const [ geneModelStorarge, setGeneModelStorarge ] = useState<GeneModelStorage>(new GeneModelStorage());
  const [ panelToShowIndex, setPanelToShowIndex ]   = useState<string>(INDEX_SAMPLE1_PANEL);  // 表示する対象パネルを指定するキー
  const [ isPlayingFlg, setIsPlayingFlg ]           = useState<boolean>(false);
  const [ isEditableFlg, setIsEditableFlg ]         = useState<boolean>(true);
  const [ reqInstPlayFlg, setReqInstPlayFlg ]       = useState<boolean>(false);   // 1フレームレンダーが必要であることを示すフラグ（3Dオブジェクトに生じた変更を反映する場合に使用）

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
      reqInstPlayFlg    = { reqInstPlayFlg }
      setIsPlayingFlg   = { setIsPlayingFlg }
      setReqInstPlayFlg = { setReqInstPlayFlg }
    />,
    [geneModelStorarge, isPlayingFlg, reqInstPlayFlg])

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  const initializeThree = () => {
    addGeneModel();
    updateGeneModelStotage();
  }

  const updateGeneModelStotage = () => {
    const _geneModelStorarge = new GeneModelStorage();
    _geneModelStorarge.storage = geneModelStorarge.storage;
    setGeneModelStorarge(_geneModelStorarge);
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
    if(index == INDEX_SAMPLE1_PANEL){
      panelToShow = <h2> SAMPLE1 </h2>
    }else if(index == INDEX_SAMPLE2_PANEL){
      panelToShow = <h2> SAMPLE2 </h2>
    }
    return panelToShow;
  }

  /**
  const provideGuidePanelStyle = (isEditableFlg: boolean) => {
    const style = isEditableFlg?
      { backgroundColor: "white", zIndex: 100 }
      : { backgroundColor: "grey", zIndex: 100 }
    return style
  }
  */

  const onClickSample1Button = () => {
    setPanelToShowIndex(INDEX_SAMPLE1_PANEL);
  }
  const onClickSample2Button = () => {
    setPanelToShowIndex(INDEX_SAMPLE2_PANEL);
  }

  return(
    <Grid container spacing = { 2 }>

      <Grid item xs = { 9 } style = { { zIndex:50 } }>
        { memoPlayBackScreen }
      </Grid>

      <Grid item xs = { 3 } style = {{ backgroundColor: "white", zIndex: 100 }}>
        <div className = "SwitchGuidePanel">
          <button onClick = { onClickSample1Button }> SAMPLE1 </button>
          <button onClick = { onClickSample2Button }> SAMPLE2 </button>
        </div>
        <div className = "GuidePanel">
          { decideGuidePanelToShow(panelToShowIndex) }
        </div>
        
      </Grid>

      <Divider />

      <Grid item xs = {12}>
        <CodingScreenDev
          geneModelStorage        = { geneModelStorarge }
          updateGeneModelStotage  = { updateGeneModelStotage }
          setReqInstPlayFlg       = { setReqInstPlayFlg }
          onClickAddModelButton   = { addGeneModel }
        />
      </Grid>

    </Grid>
  );
};

export default EditorPage

