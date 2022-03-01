import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux'

import './App.css';
import MainScreen from './proofReduxComnponents/MainScreen';

import AppRoutes from './router/AppRoutes';
import { store } from './store/store';



function App() {


  return (
    <Provider store={ store }>
      <AppRoutes />
    </Provider>
  );
}

export default App;
