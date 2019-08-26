import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './global-styles/default-theme';
import GlobalStyle from './global-styles/GlobalStyle';

// App views
import MainView from './views/dashboard';
import Home from './views/home';
import LoginView from './views/login';
import SignUpView from './views/sign-up';

class App extends Component {
  public render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <>
          <GlobalStyle />
          <BrowserRouter>
            <Switch>
              <Route exact={true} path="/" render={() => <Home />} />
              <Route path="/dashboard" render={() => <MainView />} />
              <Route path="/signup" render={() => <SignUpView />} />
              <Route path="/login" render={() => <LoginView />} />
            </Switch>
          </BrowserRouter>
        </>
      </ThemeProvider>
    );
  }
}

export default App;
