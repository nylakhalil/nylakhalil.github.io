import React from 'react';
import { HashRouter, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './components/HomeView'
import CodeView from './components/CodeView'
import PhotoView from './components/PhotoView'

import './App.css';

function App() {
    return (
        <div id="app">
            <Header />
            <main id="main">
                <HashRouter basename={process.env.PUBLIC_URL}>
                    <Route exact path='/' component={HomeView} />
                    <Route path='/code' component={CodeView} />
                    <Route path='/photography' component={PhotoView} />
                </HashRouter>
            </main>
            <Footer />
        </div>
    );
}

export default App;
