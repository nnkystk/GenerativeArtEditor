import React, { useEffect, useState, useRef } from "react";
import { Grid, Tooltip, Paper } from "@material-ui/core";
import { PlayCircleFilledWhiteOutlined } from '@mui/icons-material';
import { PauseCircleOutlineOutlined } from '@mui/icons-material';
import * as THREE from 'three';
import GeneModel from '../../Utilities/GeneModel/GeneModel'
import GeneModelStorage from '../../Utilities/GeneModel/GeneModelStorage' 
import GeneEffectPlayer from '../../Utilities/GeneEffects/GeneEffectPlayer'
import Recorder from './Recorder'
import CanvasSize from '../../Utilities/GlobalVarriables/CanvasSize'

interface Props {
  geneModelStorage    : GeneModelStorage;
  canvasSize          : CanvasSize;
  isPlayingFlg        : boolean;
  reqInstPlayFlg      : boolean;
  setIsPlayingFlg(bool: boolean)    : void;
  setReqInstPlayFlg(bool: boolean)  :void;
}
interface State{
  threeRenderer: any;
  threeScene: any;
  threeCamera: any;
  reqAnmIdRef: any
};
export class PlaybackScreen extends React.Component<Props, State>{
/**
 * Summary	: ジェネラティブアート作品を再生するComponent
 * Logic		: - 作品ファイルの読み込みおよび復号化を行う
 *            - 復号化した情報をレンダリング用データへ加工する
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - XXXする
 * Memo     : ClassComponentを意図的に利用している。
 *            FuncComponentの場合、レンダーのたびにCanvasコンテキストが生成され、重複によるクラッシュを起こしてしまう。
 */

  FOV: number = 50;
  canvasRef: any;

  constructor(props: Props){

    super(props)
    this.state = {
      // optional second annotation for better type inference
      threeRenderer : new THREE.WebGLRenderer(),
      threeScene    : new THREE.Scene(),
      threeCamera   : new THREE.PerspectiveCamera(),
      reqAnmIdRef   : ""
    };

    this.test = this.test.bind(this)
    this.canvasRef = React.createRef();

  }

  render() {

    return (
      <div className = "PlayBackScreen" style = { { backgroundColor : "#e0e0e0" } }>

        <Grid container alignItems ="center" justifyContent="center" onClick = { this.onClickCanvas }>
          <canvas id = 'canvas' ref = { this.canvasRef } />
        </Grid>

        <Grid container style = {{ paddingLeft: 10, paddingRight: 10 }}>

          <Grid item xs = { 6 }>
            <Grid container>
              { this.props.isPlayingFlg ?
                <Tooltip title="Pause">
                  <PauseCircleOutlineOutlined
                    fontSize  = "large"
                    style     = {{ cursor:'pointer' }}
                    onClick   = { this.onClickCanvas }
                  />
                </Tooltip>:
                <Tooltip title="Play">
                  <PlayCircleFilledWhiteOutlined
                    fontSize  = "large"
                    style     = {{ cursor:'pointer' }}
                    onClick   = { this.onClickCanvas }
                  />
                </Tooltip>
              }
            </Grid>
          </Grid>

          <Grid item xs = { 6 }>
            <Grid container direction="row-reverse" justifyContent="flex-start" alignItems="center" >
              <Recorder canvas = { this.canvasRef.current }/>
            </Grid>
          </Grid>

        </Grid>

      </div>
    );
  }

	// ___ ライフサイクル ___ ___ ___ ___ ___

  // コンポーネントがマウント(配置)された直前に呼び出されるメソッド
	componentDidMount(){
    this.initializeThree();
	}

  // コンポーネントが再描画されたタイミングで呼び出されるメソッド
  componentDidUpdate(){
    this.updateCanvasSize();  // TODO: 都度の実行は不要。変更時のみ実行するようにできないか
    this.updateSceneThree();
    this.state.threeRenderer.render(this.state.threeScene, this.state.threeCamera);
    this.props.setReqInstPlayFlg(false);    // 明示的に他コンポーネントからレンダーを起こしたい場合にtrueにする
  }
  
  // コンポーネントが破棄(アンマウント)される前に実行されるメソッド
  componentWillUnmount(){
    this.stopThree();
  }


	// ___ イベントハンドラ ___ ___ ___ ___ ___

  test(){
  }

  // ___ メソッド ___ ___ ___ ___ ___
  initializeThree = () => {
    /**
     * Threeオブジェクト（レンダラー・カメラ・シーン）を初期化する
     */
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#canvas") as HTMLCanvasElement
      });
      const scene   = new THREE.Scene();
      const camera  = new THREE.PerspectiveCamera(this.FOV, this.props.canvasSize.width / this.props.canvasSize.height);
      camera.position.set(0, 0, +1000);
      // const light = new THREE.DirectionalLight(0xFFFFFF, 1);
      // scene.add(light);

      // レンダラーをセットアップする
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(this.props.canvasSize.width, this.props.canvasSize.height);

      // シーンをセットアップする
      this.updateSceneThree();

      this.setState({ threeRenderer: renderer });
      this.setState({ threeScene: scene })
      this.setState({ threeCamera: camera })
   };

   updateCanvasSize = () => {
    // カメラを更新
    this.state.threeCamera.aspect = this.props.canvasSize.width / this.props.canvasSize.height
    this.state.threeCamera.updateProjectionMatrix();
    // レンダラーを更新
    this.state.threeRenderer.setPixelRatio(window.devicePixelRatio);
    this.state.threeRenderer.setSize(this.props.canvasSize.width, this.props.canvasSize.height);
   }
 
   updateSceneThree = () => {
      /**
      * Summary: シーンを更新する
      * Imp: すべてのMeshをシーンに追加する
      */
      this.props.geneModelStorage.storage.forEach( (geneModel: any) => {
        this.state.threeScene.add(geneModel.mesh);
      })
    }

 
  playBackThree = () => {
     /**
     * ジェネラティブアート作品を再生する
     * @param arg
     * @return 
     */
       if(this.props.isPlayingFlg == false){
 
         const tick = () => {
           
           // Effectを発火
           this.props.geneModelStorage.storage.forEach( (geneModel: GeneModel) => {
               GeneEffectPlayer.play(geneModel);
           })
 
           this.state.threeRenderer.render(this.state.threeScene, this.state.threeCamera);
           this.setState({reqAnmIdRef: requestAnimationFrame(tick)});
         }
 
         tick();
         this.props.setIsPlayingFlg(true);
       }
     }
 
 
  stopThree = () => {
     cancelAnimationFrame(this.state.reqAnmIdRef);
     this.props.setIsPlayingFlg(false);
   }
 
   
  onClickCanvas = () => {
     if(this.props.isPlayingFlg == true){
       this.stopThree();
     }else{
       this.updateSceneThree();   // シーンにメッシュが追加されていることを保証
       this.playBackThree();
     }
   }
}

export default PlaybackScreen