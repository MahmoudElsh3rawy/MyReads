//import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import MyReads from './MyReads';
import NavBar from './NavBar';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <MyReads />
    </React.Fragment>
  );
}

export default App;
