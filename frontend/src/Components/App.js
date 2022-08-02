import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { Grid } from '@material-ui/core';
import { Home } from './Pages/Home'
import { Wiki } from './Pages/Wiki'
import { Contact } from './Pages/Contact'


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { test: 'test' };
  }

  render(){
    return(
      <div className = "App">
        
        <BrowserRouter>

          <div className = 'Header'>
            <Grid container>

              <Grid item  xs = { 3 } sm = { 8 }></Grid>

              <Grid item  xs = { 3 } sm = { 1 }>
                <Link to='/home' style={ { textDecoration: 'none' , fontWeight: 'bold' } }>
                  <span>Home</span>
                </Link>
              </Grid>

              <Grid item  xs = { 3 } sm = { 1 }>
                <Link to='/wiki' style={ { textDecoration: 'none' , fontWeight: 'bold' } }>
                  <span>Wiki</span>
                </Link>
              </Grid>

              <Grid item  xs = { 3 } sm = { 1 }>
                <Link to='/contact' style={ { textDecoration: 'none' , fontWeight: 'bold' } }>
                  <span>Contact</span>
                </Link>
              </Grid>

            </Grid>
          </div>

          <div className = 'Main'>
            <Switch>
              <Route exact  path = '/'        component = { Home } />
              <Route        path = '/home'    component = { Home } />
              <Route        path = '/wiki'    component = { Wiki } />
              <Route        path = '/contact' component = { Contact } />
            </Switch>
          </div>

        </BrowserRouter>
      </div>
    );
    }
}

export default App;