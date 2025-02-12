import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './hooks/ThemeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
