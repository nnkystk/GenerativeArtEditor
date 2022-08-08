import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { Grid } from '@material-ui/core';
import { EditorPage } from './Pages/EditorPage'
import { ContactPage } from './Pages/ContactPage'
import { SettingPage } from './Pages/SettingPage'


const App : React.FunctionComponent = () => {

  return (
    <div>


      <BrowserRouter>

        { /** ナビゲーシション（Drawer） */ }
        <div className = 'Navigation'>
          <Grid container>

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

          </Grid>
        </div>

        { /** メインコンテンツ URLに応じて表示内容を変更 */ }
        <div className = 'Main'>
          <Routes>
            <Route path = '/'        element = { <EditorPage />} />
            <Route path = '/editor'  element = { <EditorPage />} />
            <Route path = '/setting' element = { <SettingPage />} />
            <Route path = '/contact' element = { <ContactPage />} />
          </Routes>
        </div>

      </BrowserRouter>

    </div>
  );

};


export default App;