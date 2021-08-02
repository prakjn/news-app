import React, {useState} from 'react';
import { BrowserRouter as Router,Switch,
  Route, } from 'react-router-dom';
import Nav from './components/Navbar';
import { GlobalStyle} from './globalStyles';
import Search from './components/Search/';
import History from './components/History';
function App() {

  const [history, setHistory] = useState([])  
  const [term, setTerm] = useState("")
  return (
    <Router>
      <GlobalStyle />
      <Nav />
      <Switch>
          <Route path="/search">
            <Search history={history} setHistory={setHistory} term={term} setTerm={setTerm}/>
          </Route>
          <Route path="/history">
            <History history={history} term={term} setTerm={setTerm}/>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
