import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
// import Navbar from "./components/navbar.component";
import Login from "./components/login";
import Home from "./components/home";

function App() {
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
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
