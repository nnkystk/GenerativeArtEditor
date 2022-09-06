import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@material-ui/core";
import { PlayCircleFilledWhiteOutlined } from '@mui/icons-material';
import { PauseCircleOutlineOutlined } from '@mui/icons-material';
import * as THREE from 'three';
import GeneModel from '../../Utilities/GeneModel'
import GeneModelStorage from '../../Utilities/GeneModelStorage' 
import GeneEffectPlayer from '../../Utilities/GeneEffects/GeneEffectPlayer'

/**
 * Summary	: ジェネラティブアート作品を再生するComponent
 * Logic		: - 作品ファイルの読み込みおよび復号化を行う
 *            - 復号化した情報をレンダリング用データへ加工する
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - XXXする
 */

interface Props {
  sampleProp         ?: any;
  geneModelStorage    : GeneModelStorage;
  isPlayingFlg        : boolean;
  reqInstPlayFlg      : boolean;
  setIsPlayingFlg(bool: boolean)    : void;
  setReqInstPlayFlg(bool: boolean)  :void;
}


export const PlaybackScreen: React.FC<Props> = (props: Props) => {

  const FOV: number = 50;

  type ScreenSize = { width: number, height: number }

  // ___ state ___ ___ ___ ___ ___
  const [ screenSize,     setScreenSize ]     = useState<ScreenSize>({ width: 960, height: 540 });
  const [ threeRenderer,  setThreeRenderer]   = useState<THREE.WebGLRenderer>(new THREE.WebGLRenderer());
  const [ threeScene,     setThreeScene ]     = useState<THREE.Scene>(new THREE.Scene());
  const [ threeCamera,    setThreeCamera ]    = useState<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());

  // ___ use ref ___ ___ ___ ___ ___
  const canvasRef:    any | null = useRef(null);
  const reqAnmIdRef:  any | null = useRef(null);    // cancelAnimationFrame実行用にIDを保持する レンダリングを起こさないためにRefを使用

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { initializeThree() }, [ canvasRef ] );    // DOMの描画後（canvas要素の生成後）にThree.jsのレンダリングを行う必要があるためuseEffectにフックする
  useEffect( () => { updateSceneThree()  }, [ props.geneModelStorage.storage ]);    // 本コンポーネントがアンマウントされた際にアニメーション登録を解除する
  useEffect( () => { props.setReqInstPlayFlg(false) }, [ props.reqInstPlayFlg ] );  // レンダーリクエストがあった場合、レンダー実行後にリクエストを解除する
  useEffect( () => { return () => { stopThree() } }, [ ]);    // 本コンポーネントがアンマウントされた際にアニメーション登録を解除する

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___

  const test = () => {
    props.geneModelStorage.storage.forEach( (geneModel: any) => {
    })
  }


  const initializeThree = () => {
   /**
    * Threeオブジェクト（レンダラー・カメラ・シーン）を初期化する
    */

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#canvas") as HTMLCanvasElement
    });
    const scene   = new THREE.Scene();
    const camera  = new THREE.PerspectiveCamera(FOV, screenSize.width / screenSize.height);
    camera.position.set(0, 0, +1000);

    // レンダラーをセットアップする
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(screenSize.width, screenSize.height);

    // シーンをセットアップする
    updateSceneThree();

    setThreeRenderer(renderer);
    setThreeScene(scene);
    setThreeCamera(camera);
    
  };


  const updateSceneThree = () => {
    /**
     * Summary: シーンを更新する
     * Imp: すべてのMeshをシーンに追加する
     */
    props.geneModelStorage.storage.forEach( (geneModel: any) => {
      threeScene.add(geneModel.mesh);
    })
  }


  const playBackThree = () => {
    /**
    * ジェネラティブアート作品を再生する
    * @param arg
    * @return 
    */
      if(props.isPlayingFlg == false){

        const tick = () => {
          
          // Effectを発火
          props.geneModelStorage.storage.forEach( (geneModel: GeneModel) => {
              GeneEffectPlayer.play(geneModel);
          })

          threeRenderer.render(threeScene, threeCamera);
          reqAnmIdRef.current = requestAnimationFrame(tick);
        }

        tick();
        props.setIsPlayingFlg(true);
      }
    }


  const stopThree = () => {
    cancelAnimationFrame(reqAnmIdRef.current);
    props.setIsPlayingFlg(false);
  }

  
  const onClickCanvas = () => {
    if(props.isPlayingFlg == true){
      stopThree();
    }else{
      updateSceneThree();   // シーンにメッシュが追加されていることを保証
      playBackThree();
    }
  }


  return (
    <div>

      {/** リクエストがあった場合、レンダーを単発実行する */}
      {(() => {
        if (props.reqInstPlayFlg) {
          updateSceneThree();
          threeRenderer.render(threeScene, threeCamera);
        }
      })()}

      <Grid container
        className = "PlayBackScreen"
        style = { { backgroundColor : "#e0e0e0" } }
      >

        <Grid container
          alignItems ="center" justifyContent="center"
        >
          <canvas id = 'canvas' ref = { canvasRef } onClick = { onClickCanvas }/>
        </Grid>

        <Grid container>
          { props.isPlayingFlg ?
            <PlayCircleFilledWhiteOutlined sx={{ fontSize: 50 }} onClick = { stopThree }/> :
            <PauseCircleOutlineOutlined sx={{ fontSize: 50 }} onClick = { playBackThree } /> }
        </Grid>

      </Grid>
    </div>
  );

};


export default PlaybackScreen



interface SamplaProps {
  setScreenSize    : any
}
