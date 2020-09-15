import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
// import Navbar from "./components/navbar.component";
import Login from "./components/login";
import Home from "./components/home";
import io from 'socket.io-client';
function App() {
  const socket = io('http://localhost:5000/');
  socket.on('hello', (message) => {
    console.log(message);
  })
  socket.on('accelerometer', (data) => {
    console.log(data);
  })
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
