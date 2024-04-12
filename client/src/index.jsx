import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";

import "uikit/dist/css/uikit.min.css";
import "./index.scss";
import "uikit/dist/js/uikit.min.js";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);