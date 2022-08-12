import React, { useEffect, useState, useRef } from "react";
import * as THREE from 'three';

/**
 * Summary	: ジェネラティブアート作品を再生するComponent
 * Logic		: - 作品ファイルの読み込みおよび復号化を行う
 *            - 復号化した情報をレンダリング用データへ加工する
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - XXXする
 */

interface Props {
  sampleProp ?: any;
}

export const PlaybackScreen: React.FC<Props> = ({ sampleProp }) => {

  type ScreenSize = { width: number, height: number }

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState,  setSampleState ]  = useState<string>('This is SampleState');
  const [ screenSize,   setScreenSize ]   = useState<ScreenSize>({ width: 960, height: 540});

  // ___ use ref ___ ___ ___ ___ ___
  const canvasRef: any | null = useRef(null);

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) }, [ sampleState ] );
  useEffect( () => { render() }, [ canvasRef ] );    // DOMの描画後（canvas要素の生成後）にThree.jsのレンダリングを行う必要があるため、useEffectにフックする
  
  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }


  const render = () => {

    const renderer: any = new THREE.WebGLRenderer({
      canvas: document.querySelector("#canvas") as HTMLCanvasElement
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(screenSize.width, screenSize.height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, screenSize.width / screenSize.height);
    camera.position.set(0, 0, +1000);
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);

    scene.add(box);

    const tick = () => {
      box.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }

    tick();
    
  };

  return (
    <div>
      <canvas
        id = 'canvas'
        ref = { canvasRef }
      />
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
