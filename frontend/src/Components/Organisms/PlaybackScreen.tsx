import React, { useEffect, useState, useRef } from "react";
import * as THREE from 'three';
import GeneModel from '../Utilities/GeneModel' 
import GeneEffectPlayer from '../Utilities/GeneEffectPlayer'

/**
 * Summary	: ジェネラティブアート作品を再生するComponent
 * Logic		: - 作品ファイルの読み込みおよび復号化を行う
 *            - 復号化した情報をレンダリング用データへ加工する
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - XXXする
 */

interface Props {
  sampleProp         ?: any
  geneModelList       : Array<GeneModel>
  setGeneModelList    : any
}

export const PlaybackScreen: React.FC<Props> = (props: Props) => {

  const FOV: number = 50;

  type ScreenSize = { width: number, height: number }

  // ___ state ___ ___ ___ ___ ___
  const [ screenSize,     setScreenSize ]     = useState<ScreenSize>({ width: 960, height: 540 });
  const [ isPlayingFlg,   setIsPlayingFlg ]   = useState<Boolean>(false);
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
      if(isPlayingFlg == false){

        const tick = () => {
          
          // Effectを発火
          props.geneModelList.forEach( (geneModel: GeneModel) => {
              GeneEffectPlayer.play(geneModel);
          })

          threeRenderer.render(threeScene, threeCamera);
          reqAnmIdRef.current = requestAnimationFrame(tick);
        }

        tick();
        setIsPlayingFlg(true);
      }
    }


  const stopThree = () => {
    cancelAnimationFrame(reqAnmIdRef.current);
    setIsPlayingFlg(false);
  }


  return (
    <div className="PlayBackScreen" style = { { backgroundColor : "silver" } }>
      <canvas
        id = 'canvas'
        ref = { canvasRef }
      />
      <div>
        <button onClick={ () => { updateSceneThree(); playBackThree(); } }>PlayBack</button> { }
        <button onClick={ stopThree }>Stop</button>
      </div>
    </div>
  );

};


export default PlaybackScreen




// 表示エリアのサイズを取得する処理のサンプル
const Sample = () => {

  const ref: any | null = useRef(null);

  useEffect(() => {
    console.log(ref.current);
    console.log(
      JSON.stringify(ref.current.getBoundingClientRect())
    );
  }, []);

  return (
    <div ref={ref}>
      <h2> Sample </h2>
    </div>
  );
};
