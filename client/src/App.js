import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import Login from "./pages/login";
import Home from "./pages/home";
import Offline from "./pages/offline";
import socketStore from "./store/store";
function App() {
  const { connect, disconnect } = socketStore;
  useEffect(() => {
    connect();
    return disconnect();
  }, [connect, disconnect]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <Navbar/>
        <br/> */}
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/login" exact component={Login} />
          <Route path="/overall" exact>
            <Offline/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
