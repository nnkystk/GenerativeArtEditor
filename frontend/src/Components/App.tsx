import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { Grid } from '@material-ui/core';
import { EditorPage } from './Pages/EditorPage'
import { ContactPage } from './Pages/ContactPage'
import { SettingPage } from './Pages/SettingPage'


const App : React.FunctionComponent = () => {

  return (
    <BrowserRouter>
      <Grid container>

        <Grid item xs = { 1 }>
          <div className = 'Navigation'>
            <Grid item  xs = { 3 } sm = { 1 }>
              <Link to='/editor' style={ { textDecoration: 'none' , fontWeight: 'bold' } }>
                <span>Editor</span>
              </Link>
            </Grid>
            <Grid item  xs = { 3 } sm = { 1 }>
              <Link to='/contact' style={ { textDecoration: 'none' , fontWeight: 'bold' } }>
                <span>Contact</span>
              </Link>
            </Grid>
            <Grid item  xs = { 3 } sm = { 1 }>
              <Link to='/setting' style={ { textDecoration: 'none' , fontWeight: 'bold' } }>
                <span>Setting</span>
              </Link>
            </Grid>
          </div>
        </Grid>

        <Grid item xs = { 10 }>
          <div className = 'Main'>  { /** URLに応じて表示内容を変更する */ }
              <Routes>
                <Route path = '/'        element = { <EditorPage />} />
                <Route path = '/editor'  element = { <EditorPage />} />
                <Route path = '/setting' element = { <SettingPage />} />
                <Route path = '/contact' element = { <ContactPage />} />
              </Routes>
          </div>
        </Grid>
        
      </Grid>
    </BrowserRouter>
  );
};


export default App;