import React from 'react';
import './App.css';
import Quote from './components/Quote';

function App() {
  return (
    <div className="container-fluid p-5">
      <div className="row justify-content-center">
        <div className="card text-primary mb-3">
          <div className="card-header text-dark"><strong>A RANDOM QUOTE MACHINE</strong></div>
          <Quote />
        </div>
      </div>
    </div>
  );
}

export default App;
