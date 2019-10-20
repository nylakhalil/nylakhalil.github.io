import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { withTracker } from './withTracker';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CodeView from './components/CodeView';
import PhotoView from './components/PhotoView';

import './App.css';

export default function App() {
  return (
    <div id="app">
      <Header />
      <main id="main" className="flex-grow-1">
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Route exact path='/' component={withTracker(HomeView)} />
          <Route path='/develop' component={withTracker(CodeView)} />
          <Route path='/photography' component={withTracker(PhotoView)} />
        </HashRouter>
      </main>
      <Footer />
    </div>
  );
}
