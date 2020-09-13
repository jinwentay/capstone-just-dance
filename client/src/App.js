import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
// import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <Navbar/>
        <br/> */}
        <Route path="/" exact component={Login} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
