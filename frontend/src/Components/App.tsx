import React, { useState } from "react";
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { Grid } from '@material-ui/core';
import { EditorPage } from './Pages/EditorPage'
import { HomePage } from './Pages/HomePage'


const App : React.FunctionComponent = () => {

  const [ temporaryStorage, setTemporaryStorage ] = useState<any>();    // 一時的にデータを格納する領域

  const onMovePage = (dataToSave: any) => {
    setTemporaryStorage(dataToSave);
  }

  return (
    <BrowserRouter>
      <Grid container>

        <Grid item xs = { 1 }>
          <div className = 'Navigation'>
            <Grid item  xs = { 3 } sm = { 1 }>
              <Link to = '/editor' style = { { textDecoration: 'none' , fontWeight: 'bold' } }>
                <span>EDITOR</span>
              </Link>
            </Grid>
            <Grid item  xs = { 3 } sm = { 1 }>
              <Link to = '/home' style = { { textDecoration: 'none' , fontWeight: 'bold' } }>
                <span>HOME</span>
              </Link>
            </Grid>
          </div>
        </Grid>
        
        <Grid item xs = { 10 }>
          <div className = 'Main'>  { /** URLに応じて表示内容を変更する */ }
              <Routes>
                <Route path = '/'       element = { <EditorPage temporaryStorage = { temporaryStorage } setTemporaryStorage = { setTemporaryStorage } />} />
                <Route path = '/editor' element = { <EditorPage temporaryStorage = { temporaryStorage } setTemporaryStorage = { setTemporaryStorage } />} />
                <Route path = '/home'   element = { <HomePage   temporaryStorage = { temporaryStorage } setTemporaryStorage = { setTemporaryStorage }/>} />
              </Routes>
          </div>
        </Grid>
        
      </Grid>
    </BrowserRouter>
  );
};


export default App;