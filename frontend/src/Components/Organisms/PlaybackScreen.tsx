import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@material-ui/core";
import { PlayCircleFilledWhiteOutlined } from '@mui/icons-material';
import { PauseCircleOutlineOutlined } from '@mui/icons-material';
import * as THREE from 'three';
import GeneModel from '../../Utilities/GeneModel'
import GeneModelStorage from '../../Utilities/GeneModelStorage' 
import GeneEffectPlayer from '../../Utilities/GeneEffects/GeneEffectPlayer'

interface Props {
  geneModelStorage    : GeneModelStorage;
  isPlayingFlg        : boolean;
  reqInstPlayFlg      : boolean;
  setIsPlayingFlg(bool: boolean)    : void;
  setReqInstPlayFlg(bool: boolean)  :void;
}
interface State{
  screenSize: any;
  threeRenderer: any;
  threeScene: any;
  threeCamera: any;
  recorder  : any;
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

 FOV = 50;

  constructor(props: Props){
    super(props)

    this.state = {
      // optional second annotation for better type inference
      screenSize    : { width: 960, height: 540 },
      threeRenderer : new THREE.WebGLRenderer(),
      threeScene    : new THREE.Scene(),
      threeCamera   : new THREE.PerspectiveCamera(),
      recorder      : undefined,
      reqAnmIdRef   : ""
    };

    this.test = this.test.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)

  }

  render() {

    return (
      <div>

      <Grid container
        className = "PlayBackScreen"
        style = { { backgroundColor : "#e0e0e0" } }
      >

        <Grid container
          alignItems ="center" justifyContent="center"
        >
          <canvas id = 'canvas' onClick = { this.onClickCanvas }/>
        </Grid>

        <Grid container>
          { this.props.isPlayingFlg ?
            <PlayCircleFilledWhiteOutlined sx={{ fontSize: 50 }} onClick = { this.stopThree }/> :
            <PauseCircleOutlineOutlined sx={{ fontSize: 50 }} onClick = { this.playBackThree } /> }
        </Grid>

        <button onClick = {this.start}>start</button>
        <button onClick = {this.stop}>stop</button>
        <a id="downloadlink">download</a>

      </Grid>
      </div>
    );
  }

	// ___ ライフサイクル ___ ___ ___ ___ ___

  // コンポーネントがマウント(配置)された直前に呼び出されるメソッド
  // このメソッド内では描画されたDOMにアクセスすることができます
	componentDidMount(){
    this.initializeThree();
	}

  // コンポーネントが再描画されたタイミングで呼び出されるメソッド
  componentDidUpdate(){
    if (this.props.reqInstPlayFlg) {
      this.updateSceneThree();
      this.state.threeRenderer.render(this.state.threeScene, this.state.threeCamera);
      this.props.setReqInstPlayFlg(false);
    }

  }

  
  // コンポーネントが破棄(アンマウント)される前に実行されるメソッド
  componentWillUnmount(){
    this.stopThree();
    console.log("c")
  }


	// ___ イベントハンドラ ___ ___ ___ ___ ___

  start(){

    {/* @ts-ignore */}
    const canvas: HTMLCanvasElement = document.getElementById('canvas');
    //canvasからストリームを取得
    if(canvas){
      {/* @ts-ignore */}
      const stream = canvas.captureStream();
      //ストリームからMediaRecorderを生成
      const recorder = new MediaRecorder(stream, {mimeType:'video/webm;codecs=vp9'});
      //ダウンロード用のリンクを準備
      var anchor = document.getElementById('downloadlink');

      //録画終了時に動画ファイルのダウンロードリンクを生成する処理
      recorder.ondataavailable = function(e) {
        var videoBlob = new Blob([e.data], { type: e.data.type });
        const blobUrl = window.URL.createObjectURL(videoBlob);
        {/* @ts-ignore */}
        anchor.download = 'GenerativeArt.webm';
        {/* @ts-ignore */}
        anchor.href = blobUrl;
        {/* @ts-ignore */}
        anchor.click()
      }

      recorder.start();
      this.setState({recorder: recorder})
    }
  }

  stop(){
    this.state.recorder.stop();
  }

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
      const camera  = new THREE.PerspectiveCamera(this.FOV, this.state.screenSize.width / this.state.screenSize.height);
      camera.position.set(0, 0, +1000);
      // const light = new THREE.DirectionalLight(0xFFFFFF, 1);
      // scene.add(light);

      // レンダラーをセットアップする
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(this.state.screenSize.width, this.state.screenSize.height);

      // シーンをセットアップする
      this.updateSceneThree();

      this.setState({threeRenderer: renderer});
      this.setState({threeScene: scene})
      this.setState({threeCamera: camera})
     
   };
 
 
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