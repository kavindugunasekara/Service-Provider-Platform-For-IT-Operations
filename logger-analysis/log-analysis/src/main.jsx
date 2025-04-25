import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import store from '../src/Redux/store.jsx'; // Import your Redux store
import App from './App.jsx';
import { LogProvider } from './components/Logcontext.jsx';
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <LogProvider> {/* Wrap the app with LogProvider */}
        <App />
      </LogProvider>
    </Provider>
  </StrictMode>
);
