import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView'
import CodeView from './components/CodeView'
import PhotoView from './components/PhotoView'

import './App.css';

function App() {
  return (
    <div id="app">
      <Header />
        <div >
          <Switch>
              <Route exact path="/" component={HomeView} />
              <Route exact path="/code" component={CodeView} />
              <Route exact path="/photography" component={PhotoView} />
          </Switch>
        </div>
      <Footer />
    </div>
  );
}

export default App;
