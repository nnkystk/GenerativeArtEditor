import React, { useState } from "react";
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { Grid, Divider } from "@material-ui/core";
import { EditorPage } from './Pages/EditorPage'
import { HomePage } from './Pages/HomePage'


const App : React.FunctionComponent = () => {

  return (

    <BrowserRouter>

      <Grid container spacing = { 1 }>

        <Grid item xs = { 12 } >
          <Grid container className = 'Navigation'>
            <Grid item xs = { 1 }>
              <Link to = '/home' style = { { textDecoration: 'none' , fontWeight: 'bold' } }>
                <span>HOME</span>
              </Link>
            </Grid>
            <Grid item xs = { 1 }>
              <Link to = '/editor' style = { { textDecoration: 'none' , fontWeight: 'bold' } }>
                <span>EDITOR</span>
              </Link>
            </Grid>
          </Grid>
          <Divider style = { { width: '100%' } }/>
        </Grid>

        <Grid item xs = { 12 } >
          <Grid container className = 'Main'> { /** URLに応じて表示内容を変更する */ }
            <Routes>
              <Route path = '/'       element = { <EditorPage/>} />
              <Route path = '/editor' element = { <EditorPage/>} />
              <Route path = '/home'   element = { <HomePage/>} />
            </Routes>
          </Grid>
        </Grid>

      </Grid>
    </BrowserRouter>

  );
};


export default App;