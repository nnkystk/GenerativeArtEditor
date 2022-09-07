import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@material-ui/core";



interface Props {
  canvas?: HTMLCanvasElement | null;
}

export const Recorder: React.FC<Props> = (props: Props) => {
/**
 * Summary: 渡されたCanvasに描画された映像を録画ファイルとして出力するボタン
 */

  // ___ state ___ ___ ___ ___ ___
  const [ recorder, setRecorder ] = useState<MediaRecorder>();

  // ___ use ref ___ ___ ___ ___ ___
  const anchorRef: any | null = useRef(null);

  // ___ use effect ___ ___ ___ ___ ___

  // ___ event handler ___ ___ ___ ___ ___

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
  }

  const startRecording = () => {

    //canvasからストリームを取得
    if(props.canvas){

      {/** @ts-ignore */}
      const stream = props.canvas.captureStream();
      const recorder = new MediaRecorder(stream, {mimeType:'video/webm;codecs=vp9'});

      // 録画終了時に発火するイベントを登録
      recorder.ondataavailable = (e) => {
        var videoBlob = new Blob([e.data], { type: e.data.type });
        const blobUrl = window.URL.createObjectURL(videoBlob);
        anchorRef.current.download = 'GenerativeArtWork.webm';    // 出力ファイル名
        anchorRef.current.href = blobUrl;                         // anchorDOMにファイルをセット
        anchorRef.current.click();                                // リンク押下を実行
      }

      recorder.start();
      setRecorder(recorder);
    }
  }

  const stopRecording = () => {
    if(recorder){
      if(recorder.state == "recording"){
        recorder.stop();
      } else {
        alert('Recording has not been triggered')
      }
    }
  }

  return (
    <div>
      <button onClick = { startRecording }> start </button>
      <button onClick = { stopRecording }> stop </button>
      <a ref = { anchorRef } id="anchor" hidden> download </a>
    </div>
  );

};


export default Recorder
