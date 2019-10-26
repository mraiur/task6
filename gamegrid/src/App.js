import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.scss';

import ListGames from './pages/ListGames';
import ViewGame from './pages/ViewGame';

function App() {
  return (
        <Router>
            <header>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container d-flex justify-content-between">
                        <Link to="/" className="navbar-brand d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                                 strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true"
                                 className="mr-2" viewBox="0 0 24 24" focusable="false">
                                <path
                                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                <circle cx="12" cy="13" r="4"/>
                            </svg>
                            <strong>Home</strong>
                        </Link>
                    </div>
                </div>
            </header>
            <Route path="/" exact component={ListGames} />
            <Route path="/view/:gameId" component={ViewGame} />
        </Router>
  );
}

export default App;
