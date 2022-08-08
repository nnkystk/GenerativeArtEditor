import React, { useEffect, useState } from "react";
import * as THREE from 'three';

type Props = {
  sampleProp ?: any;
}

export const EditorPage : React.FC<Props> = ({ sampleProp }) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) }, [ sampleState ] );
  useEffect( () => { render() }, [] );   // didMountで描画しないと、Cannot read property 'width' of nullというエラーが出る
  
  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }


  const render = () => {
    
    const tick = () => {
      box.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }

    const width = 960;
    const height = 540;

    const renderer: any = new THREE.WebGLRenderer({
      canvas: document.querySelector("#canvas") as HTMLCanvasElement
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    tick();

  };



  return (
    <div>
      <h2>{ EditorPage.name }</h2>
      <canvas id='canvas' />
    </div>
  );
};

export default EditorPage