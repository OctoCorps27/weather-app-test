import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './Components/TopBar'; 
import Weather from './Components/Weather';

function App() {
  return (
    <Router>
      <TopBar /> 
      
        <Routes>
          <Route path="/" element={<Weather />} />
        </Routes>
      
    </Router>
  );
}

export default App;
