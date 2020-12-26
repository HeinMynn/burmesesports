import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/Menu";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from "./components/Home";
import Standings from "./components/Standings";
import Fixtures from "./components/Fixtures";
import Lives from "./components/Lives";
import Results from "./components/Results";

function App() {
  return (
    <Router>
      <Menu />
      <div className="App">
        <header className="header">
          <Switch>
            <Route path="/standings">
              <Standings />
            </Route>
            <Route path="/livescore">
              <Lives />
            </Route>
            <Route path="/fixtures">
              <Fixtures />
            </Route>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          {/* <Footer /> */}
        </header>
      </div>
    </Router>
  );
}

export default App;
