import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Match from './Match';
import Tabletop from "tabletop";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function Home(props) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const livematches = data.filter(
    (live) => live.status === "live" || live.status === "playing"
  );
  const pastmatches = data.filter((past) => past.status === "hide");
  const MatchesCheck = () => {
    if (livematches.length === 0 && loading === false) {
      return (
        <Alert variant="warning">
          <Alert.Heading>No Live Match!</Alert.Heading>
          There is no upcoming match.{" "}
          <Alert.Link href="https://sports.idigitalnews.com/category/news">
            Read Latest Football News.
          </Alert.Link>
        </Alert>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    Tabletop.init({
      key: "1Nj7lCM4_Rij_Bd2dE3qBpAj5a8s4snrquEezy149vQU",
      callback: (googleData) => {
        setData(googleData);
        setLoading(false);
      },
      simpleSheet: true,
    });
    const intervalId = setInterval(() => {
      Tabletop.init({
        key: "1Nj7lCM4_Rij_Bd2dE3qBpAj5a8s4snrquEezy149vQU",
        callback: (googleData) => {
          setData(googleData);
          setLoading(false);
        },
        simpleSheet: true,
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Container>
      <h2 className="heading display-6">Live Stream</h2>
      <small className="text-muted">
        <Link to="/fixtures">See All Fixtures</Link>
      </small>
      <div className={loading ? "loading" : "hide"}></div>
      <MatchesCheck />
      <Row className="match-container">
        {livematches.map((obj) => {
          return (
            <Match
              key={`${obj.key}`}
              teamA={`${obj.teamA}`}
              teamB={`${obj.teamB}`}
              time={`${obj.time}`}
              date={`${obj.date}`}
              match={`${obj.match}`}
              link={`${obj.link}`}
              hide={`${obj.status}`}
            />
          );
        })}
      </Row>
      <h2 className="heading display-6">Results</h2>
      <small className="text-muted">
        <Link to="/results" className="see-all">
          See All Results
        </Link>
      </small>
      <div className={loading ? "loading" : "hide"}></div>
      <Row className="match-container">
        {pastmatches.map((obj) => {
          return (
            <Match
              key={`${obj.key}`}
              teamA={`${obj.teamA}`}
              teamB={`${obj.teamB}`}
              time={`${obj.time}`}
              date={`${obj.date}`}
              match={`${obj.match}`}
              link={`${obj.link}`}
              hide={`${obj.status}`}
            />
          );
        })}
      </Row>
    </Container>
  );
}

export default Home;