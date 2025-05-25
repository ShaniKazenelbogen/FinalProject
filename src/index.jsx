import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import SignIn from './components/signIn';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* Add a route for Sign Up when ready */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);