import React, { useEffect, useState, useRef, useMemo } from "react";
import { Grid, Divider } from "@material-ui/core";
import { PlaybackScreen } from '../Organisms/PlaybackScreen/PlaybackScreen';
import { CodingScreenMaterial } from '../Organisms/CodingScreen/CodingScreenMaterial';
import { ProjectSettingScreen } from '../Organisms/ProjectSettingScreen'
import GeneGenerator from '../../Utilities/GeneGenerator';
import GeneModelStorage from '../../Utilities/GeneModel/GeneModelStorage';
import MeshStorage from '../../Utilities/Mesh/MeshStorage';
import MeshModel from "../../Utilities/Mesh/MeshModel";
import GeneEffectStorage from '../../Utilities/GeneEffects/GeneEffectStorage';
import ProjectInfo from '../../Utilities/ProjectInfo'

type Props = {
  sampleProp ?: any;
}

export const EditorPage : React.FC<Props> = (props: Props) => {

  const INDEX_SAMPLE1_PANEL  = "SAMPLE1";
  const INDEX_SAMPLE2_PANEL  = "SAMPLE2";

  // ___ state ___ ___ ___ ___ ___
  const [ projectInfo,      setProjectInfo ]        = useState<ProjectInfo>(new ProjectInfo());
  const [ geneModelStorage, setGeneModelStorage ]   = useState<GeneModelStorage>(new GeneModelStorage());   // 描画する3Dモデルの定義情報（再生開始時の状態）をまとめたオブジェクト
  const [ meshStorage,      setMeshStorage ]        = useState<MeshStorage>(new MeshStorage());             // 描画中の3Dモデル（Mesh）をまとめたオブジェクト
  const [ panelToShowIndex, setPanelToShowIndex ]   = useState<string>(INDEX_SAMPLE1_PANEL);  // 表示する対象パネルを指定するキー
  const [ isPlayingFlg,     setIsPlayingFlg ]       = useState<boolean>(false);
  const [ reqInstPlayFlg,   setReqInstPlayFlg ]     = useState<boolean>(false);   // 1フレームレンダーが必要であることを示すフラグ（3Dオブジェクトに生じた変更を反映する場合に使用）

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { initializeThree() },         []);

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  const initializeThree = () => {
    // サンプル表示用の3Dモデルを生成
    // !!! 暫定の実装。JSONによる外部からの作品情報入力が可能になったら本サンプル表示処理は不要 !!!
    const sampleEffect   = GeneGenerator.generateGeneEffect('ROLL');
    sampleEffect.parameter.rotation = { x: 0.01, y: 0.01, z:0 };
    const geneEffectStorage = new GeneEffectStorage();
    geneEffectStorage.store(sampleEffect);
    const mesh            = GeneGenerator.generateMesh();
    const geneModel       = GeneGenerator.generateGeneModel(mesh.id, geneEffectStorage);
    geneModelStorage.store(geneModel);
    const meshModel = new MeshModel(mesh.id, mesh);
    meshStorage.store(meshModel);
    updateGeneModelStorage();
  }

  const updateGeneModelStorage = () => {
    /**
     * ReactにStateの更新を検知させる処理
     */
    const _geneModelStorage = new GeneModelStorage();
    _geneModelStorage.storage = geneModelStorage.storage;
    setGeneModelStorage(_geneModelStorage);
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
          geneModelStorage  = { geneModelStorage }
          meshStorage       = { meshStorage }
          canvasSize        = { projectInfo.canvasSize }
          isPlayingFlg      = { isPlayingFlg }
          reqInstPlayFlg    = { reqInstPlayFlg }
          setIsPlayingFlg   = { setIsPlayingFlg }
          setReqInstPlayFlg = { setReqInstPlayFlg }
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
          geneModelStorage        = { geneModelStorage }
          meshStorage             = { meshStorage }
          updateGeneModelStorage  = { updateGeneModelStorage }
          setReqInstPlayFlg       = { setReqInstPlayFlg }
        />
      </Grid>

      <Grid item xs = { 12 }>
        <h2>FOOTER</h2>
      </Grid>

    </Grid>
  );
};

export default EditorPage

