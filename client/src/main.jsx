import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import deviceStore from './store/deviceStore';
import UserStore from './store/userStore';
import './input.css';

export const Context = React.createContext(null);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new deviceStore(),
    }}>
    <App />
  </Context.Provider>,
);
