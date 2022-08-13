import React, { useEffect, useState, useRef } from "react";
import * as THREE from 'three';
import GeneModel from '../Utilities/GeneModel' 

/**
 * Summary	: ジェネラティブアート作品を再生するComponent
 * Logic		: - 作品ファイルの読み込みおよび復号化を行う
 *            - 復号化した情報をレンダリング用データへ加工する
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - XXXする
 */

interface Props {
  sampleProp ?: any
  geneModelList: Array<GeneModel>
}

export const PlaybackScreen: React.FC<Props> = (props: Props) => {

  const FOV: number = 50;

  type ScreenSize = { width: number, height: number }

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState,    setSampleState ]    = useState<string>('This is SampleState');
  const [ screenSize,     setScreenSize ]     = useState<ScreenSize>({ width: 960, height: 540 });
  const [ threeRenderer,  setThreeRenderer]   = useState<THREE.WebGLRenderer>(new THREE.WebGLRenderer());
  const [ threeScene,     setThreeScene ]     = useState<THREE.Scene>(new THREE.Scene());
  const [ threeCamera,    setThreeCamera ]    = useState<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());

  // ___ use ref ___ ___ ___ ___ ___
  const canvasRef:    any | null = useRef(null);
  const reqAnmIdRef:  any | null = useRef(null);    // cancelAnimationFrame実行用にIDを保持する レンダリングを起こさないためにRefを使用

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { initializeThree() }, [ canvasRef ] );    // DOMの描画後（canvas要素の生成後）にThree.jsのレンダリングを行う必要があるためuseEffectにフックする
  useEffect( () => { return () => { stopThree() } }, [ ]);    // 本コンポーネントがアンマウントされた際にアニメーション登録を解除する

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___

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

    setThreeRenderer(renderer);
    setThreeScene(scene);
    setThreeCamera(camera);
    
  };


  // TODO: 多重実行を防止する
  const playBackThree = () => {
    /**
    * ジェネラティブアート作品を再生する
    * @param arg
    * @return 
    */

    props.geneModelList.forEach( (geneModel: any) => {

      threeScene.add(geneModel.mesh);   // 3Dオブジェクトをレンダー対象に設定する

      // アニメーションを登録する
      const tick = () => {
        geneModel.mesh.rotation.y += 0.01;
        threeRenderer.render(threeScene, threeCamera);
        reqAnmIdRef.current = requestAnimationFrame(tick);
      }
      tick();

    })
  }


  const stopThree = () => {
    cancelAnimationFrame(reqAnmIdRef.current);
  }


  return (
    <div>
      <canvas
        id = 'canvas'
        ref = { canvasRef }
      />
      <button onClick={ playBackThree }>PlayBack</button>
      <button onClick={ stopThree }>Stop</button>
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
