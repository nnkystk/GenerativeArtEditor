import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@material-ui/core";
import * as THREE from 'three';
import GeneModel from '../../Utilities/GeneModel' 
import GeneEffectPlayer from '../../Utilities/GeneEffects/GeneEffectPlayer'
import { width } from "@mui/system";

/**
 * Summary	: ジェネラティブアート作品を再生するComponent
 * Logic		: - 作品ファイルの読み込みおよび復号化を行う
 *            - 復号化した情報をレンダリング用データへ加工する
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - XXXする
 */

interface Props {
  sampleProp         ?: any;
  geneModelList       : Array<GeneModel>;
  setGeneModelList    : any;
  isPlayingFlg        : boolean;
  setIsPlayingFlg(bool: boolean): void 
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
  useEffect( () => { updateSceneThree()  }, [ props.geneModelList ]);    // 本コンポーネントがアンマウントされた際にアニメーション登録を解除する
  useEffect( () => { return () => { stopThree() } }, [ ]);    // 本コンポーネントがアンマウントされた際にアニメーション登録を解除する

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___

  const test = () => {
    props.geneModelList.forEach( (geneModel: any) => {
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
    props.geneModelList.forEach( (geneModel: any) => {
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
          props.geneModelList.forEach( (geneModel: GeneModel) => {
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
    <Grid container
      className = "PlayBackScreen"
      alignItems ="center" justifyContent="center" 
      style = { { backgroundColor : "#e0e0e0" } }
    >
      <canvas
        id = 'canvas'
        ref = { canvasRef }
        onClick = { onClickCanvas }
      />

    </Grid>
  );

};


export default PlaybackScreen



interface SamplaProps {
  setScreenSize    : any
}
