import React, { useEffect, useState, useRef, useMemo } from "react";
import { Grid, Divider } from "@material-ui/core";
import { cloneDeep } from 'lodash'
import { PlaybackScreen } from '../Organisms/PlaybackScreen/PlaybackScreen';
import { CodingScreenMaterial } from '../Organisms/CodingScreen/CodingScreenMaterial';
import { ProjectSettingScreen } from '../Organisms/ProjectSettingScreen'
import MeshStorage from '../../Utilities/Mesh/MeshStorage';
import ProjectInfo from '../../Utilities/ProjectInfo'
import TDModelSourceStorage from '../../GAECore/Source/TDModelSourceStorage'
import TDModelSource from '../../GAECore/Source/TDModelSource'
import EffectRollSource from "../../GAECore/Source/Effects/Roll/EffectRollSource";
import ConverterForTHREE from '../../GAECore/Converter/ConverterForTHREE'
import TDModelStorage from '../../GAECore/Object/TDModelStorage'

type Props = {
  sampleProp ?: any;
}

export const EditorPage : React.FC<Props> = (props: Props) => {

  const INDEX_SAMPLE1_PANEL  = "SAMPLE1";
  const INDEX_SAMPLE2_PANEL  = "SAMPLE2";

  // ___ state ___ ___ ___ ___ ___
  const [ projectInfo,      setProjectInfo ]        = useState<ProjectInfo>(new ProjectInfo());
  const [ panelToShowIndex, setPanelToShowIndex ]   = useState<string>(INDEX_SAMPLE1_PANEL);  // 表示する対象パネルを指定するキー
  const [ isPlayingFlg,     setIsPlayingFlg ]       = useState<boolean>(false);
  const [ reqInstPlayFlg,   setReqInstPlayFlg ]     = useState<boolean>(false);   // 1フレームレンダーが必要であることを示すフラグ（3Dオブジェクトに生じた変更を反映する場合に使用）
  const [ tdModelSourceStorage, setTDModelSourceStorage ] = useState<TDModelSourceStorage>(new TDModelSourceStorage());   // 描画する3Dモデルの定義情報（再生開始時の状態）をまとめたオブジェクト
  const [ tdModelStorage,       setTDModelStorage]        = useState<TDModelStorage>(new TDModelStorage());

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { initialize() },         []);

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  const initialize = () => {
  }

  const updateTDModelSourceStorage = () => {
    /**
     * ReactにStateの更新を検知させる処理
     * 本来、本ComponentのStateを更新する関数を子Componentに移譲して実行させるべきであるが、複雑化を防ぐために本実装とした。
     * 子コンポーネントはTDModelSourceStorageの各プロパティを直接変更した上で、本処理を実行すること。
     * !!! ToDo: 先述の仕様をコーディング規則に落とし込むこと !!!
     */
    const _tdModelSourceStorage: TDModelSourceStorage = cloneDeep(tdModelSourceStorage);
    setTDModelSourceStorage(_tdModelSourceStorage);
  }

  const decideGuidePanelToShow = (index: string) =>{
    let panelToShow;
    if(index == INDEX_SAMPLE1_PANEL){
      panelToShow = <h2> S1 </h2>
    }else if(index == INDEX_SAMPLE2_PANEL){
      panelToShow = <h2> S2 </h2>
    }
    return panelToShow;
  }

  const onClickSample1Button = () => {
    setPanelToShowIndex(INDEX_SAMPLE1_PANEL);
  }
  const onClickSample2Button = () => {
    setPanelToShowIndex(INDEX_SAMPLE2_PANEL);
  }
  const onClickConvertButton = () => {
    const tdModelStorage = ConverterForTHREE.convert(tdModelSourceStorage);
    setTDModelStorage(tdModelStorage);
  }

  return(
    <Grid container spacing = { 2 }>

      <Grid item xs = { 12 }>
        <ProjectSettingScreen
          projectInfo     = { projectInfo }
          setProjectInfo  = { setProjectInfo }
        />
      </Grid>

      <Grid item xs = { 11 } style = { { zIndex :50 } }>
        <PlaybackScreen
          tdModelStorage    = { tdModelStorage }
          canvasSize        = { projectInfo.canvasSize }
          isPlayingFlg      = { isPlayingFlg }
          setIsPlayingFlg   = { setIsPlayingFlg }
        />
      </Grid>

      <Grid item xs = { 1 } style = {{ backgroundColor: "white", zIndex: 100 }}>
        <div className = "SwitchGuidePanel">
          <button onClick = { onClickSample1Button }> S1 </button>
          <button onClick = { onClickSample2Button }> S2 </button>
        </div>
        <div className = "GuidePanel">
          { decideGuidePanelToShow(panelToShowIndex) }
        </div>
      </Grid>

      <Grid item xs = { 12 }>
        <Divider style = { { width: '100%' } } />
        <CodingScreenMaterial
          tdModelSourceStorage        = { tdModelSourceStorage }
          updateTDModelSourceStorage  = { updateTDModelSourceStorage }
        />
        <button onClick={ onClickConvertButton }> Convert </button>
      </Grid>

      <Grid item xs = { 12 }>
        <h2>FOOTER</h2>
      </Grid>

    </Grid>
  );
};

export default EditorPage

