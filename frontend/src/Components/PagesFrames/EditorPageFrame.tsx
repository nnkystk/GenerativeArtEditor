import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { Grid } from '@material-ui/core';


type Props = {
  mainPages?: Array<React.ReactNode> | null;   // EditorPageはじめ主機能を提供するページ
  metaPages?: Array<React.ReactNode> | null;   // SettingPageはじめ補助機能を提供するページ
}
/**
 * 
 * @param param0 
 * @returns 
 * 
 *  sample.           
 *  <EditorPageFrame
      mainPages = { [ <EditorPage/>, <ContactPage/> ] }
      metaPages = { [ <SettingPage/> ] }
    />
 */


export const EditorPageFrame: React.FC <Props> = ({ mainPages, metaPages}) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) }, [ sampleState ] );

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  return (
    <div>
      { mainPages }
      { metaPages }

    </div>
  );
};

export default EditorPageFrame