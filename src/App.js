import React from 'react';
import { BrowserRouter as Router,Switch,
  Route, } from 'react-router-dom';
import Nav from './components/Navbar';
import { GlobalStyle} from './globalStyles';
import Search from './components/Search/';
function App() {
  return (
    <Router>
      <GlobalStyle />
      <Nav />
      <Switch>
          <Route path="/search">
            <Search />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
