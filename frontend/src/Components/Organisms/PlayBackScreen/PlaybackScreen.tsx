import React, { useEffect, useState, useRef } from "react";
import { Grid, Tooltip, Paper } from "@material-ui/core";
import { PlayCircleFilledWhiteOutlined } from '@mui/icons-material';
import { PauseCircleOutlineOutlined } from '@mui/icons-material';
import Recorder from '../Recorder'
import CanvasSize from '../../../Utilities/GlobalVarriables/CanvasSize'
import PlayerForTHREE from '../../../GAECore/Player/PlayerForTHREE'
import TDModelStorage from "src/GAECore/Object/TDModelStorage";


interface Props {
  tdModelStorage      : TDModelStorage;
  canvasSize          : CanvasSize;
  isPlayingFlg        : boolean;
  setIsPlayingFlg(bool: boolean)    : void;
}
interface State{
  playerForTHREE?: PlayerForTHREE;
  reqAnmIdRef: any;
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
      playerForTHREE: undefined,
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
    this.state.playerForTHREE?.updateCanvasSize(this.props.canvasSize);
    this.state.playerForTHREE?.updateScene(this.props.tdModelStorage);
    this.state.playerForTHREE?.render();
  }
  
  // コンポーネントが破棄(アンマウント)される前に実行されるメソッド
  componentWillUnmount(){
    this.stopThree();
  }


	// ___ イベントハンドラ ___ ___ ___ ___ ___

  test(){
    console.log(this.state.playerForTHREE)
  }

  // ___ メソッド ___ ___ ___ ___ ___
  initializeThree = () => {

    // Playerを生成および初期化する
    const canvas: HTMLCanvasElement = document.querySelector("#canvas") as HTMLCanvasElement;
    const playerForTHREE = new PlayerForTHREE(canvas);
    
    // シーンをセットアップする
    playerForTHREE.updateScene(this.props.tdModelStorage);

    this.setState({ playerForTHREE: playerForTHREE });
   };
 
  playBackThree = () => {
     /**
     * ジェネラティブアート作品を再生する
     * @param arg
     * @return 
     */
       if(this.props.isPlayingFlg == false){
 
        this.state.playerForTHREE?.play(this.props.tdModelStorage);
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
      this.state.playerForTHREE?.updateScene(this.props.tdModelStorage);
      this.playBackThree();
     }
   }
}

export default PlaybackScreen