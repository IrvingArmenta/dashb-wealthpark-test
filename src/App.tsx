import React from 'react';
import { Box, Button, Provider } from 'rendition';
import './App.css';

const App = () => {
  
  return (
    <Provider>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
            <Button>TEST</Button>
            </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
            </a>
        </header>
      </div>
    </Provider>
  );

}

export default App;
