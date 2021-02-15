import React, { useEffect, useState } from 'react';
import Routes from './configs/router';
import {Provider} from 'react-redux';
import {store} from './configs/store';
import {ThemeProvider} from 'styled-components';
import {themeLight, themeDark} from './configs/theme';
import './App.css';

function App() {
  const [currentTheme, setCurrentTheme] = useState(themeLight,themeDark)
  useEffect(() => {
    store.subscribe(() => {
      setCurrentTheme(store.getState().theme.currentTheme)
    })
  })
  return (
    <div className="App">
      <ThemeProvider theme={themeDark} >
      <Provider store={store}>
          <Routes></Routes>
        </Provider>
      </ThemeProvider>

    </div>
  );
}

export default App;
