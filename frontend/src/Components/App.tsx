import React from 'react';
import FCTemplate from './FCTemplate'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { Grid } from '@material-ui/core';
import { EditorPage } from './Pages/EditorPage'
import { ContactPage } from './Pages/ContactPage'
import { SettingPage } from './Pages/SettingPage'

const App : React.FunctionComponent = () => {

  return (
    <div>
      <h1>Hello</h1>
      <FCTemplate sampleProp="test"/>

      <BrowserRouter>

        <div className = 'Header'>
          <Grid container>

            <Grid item  xs = { 3 } sm = { 8 }></Grid>

            <Grid item  xs = { 3 } sm = { 1 }>
              <Link to='/editor' style={ { textDecoration: 'none' , fontWeight: 'bold' } }>
                <span>Editor</span>
              </Link>
            </Grid>

            <Grid item  xs = { 3 } sm = { 1 }>
              <Link to='/setting' style={ { textDecoration: 'none' , fontWeight: 'bold' } }>
                <span>Setting</span>
              </Link>
            </Grid>

            <Grid item  xs = { 3 } sm = { 1 }>
              <Link to='/setting' style={ { textDecoration: 'none' , fontWeight: 'bold' } }>
                <span>Setting</span>
              </Link>
            </Grid>

          </Grid>
        </div>

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