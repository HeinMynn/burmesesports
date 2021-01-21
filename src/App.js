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
import Request from "./components/Request";
import Player from "./components/Player";
import { PageView, initGA } from "./components/Tracking";
import { useEffect } from "react";
import Iframe from "react-iframe";
import { HelmetProvider } from "react-helmet-async";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    initGA("UA-43406006-5");
    PageView();
  }, []);
  return (
    <Router>
      <Menu />
      <div className="App">
        <header className="header">
          <small>Advertisement</small>
          <div className="ads">
            <Iframe
              url="//jelqr4dqeep7.com/watchnew?key=3f59da4b039a9a15f3ef09ce6a8cef2d"
              width="728"
              height="90"
              frameborder="0"
              scrolling="no"
              align="center"
            />
          </div>
          <HelmetProvider>
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
              <Route path="/request/:home/:away" component={Request} />
              <Route path="/player/:id" component={Player} />
              <Route path="/results">
                <Results />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </HelmetProvider>
        </header>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
