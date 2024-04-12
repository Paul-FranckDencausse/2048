import React, { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default App;
