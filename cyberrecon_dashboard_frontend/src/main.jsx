import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

// PUBLIC_INTERFACE
function bootstrap() {
  /** Bootstraps the CyberRecon Dashboard React application by mounting App into #root. */
  const container = document.getElementById('root');
  if (!container) {
    // Fail fast with a clear message to ease debugging if the root element is missing
    throw new Error('Root container #root not found in index.html');
  }
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Start the app
bootstrap();

export default bootstrap;
