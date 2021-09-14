import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Match from "./Match";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";
import { Helmet } from "react-helmet-async";
import { readRemoteFile } from "react-papaparse";

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
        </Alert>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    readRemoteFile(
      "https://docs.google.com/spreadsheets/d/1Nj7lCM4_Rij_Bd2dE3qBpAj5a8s4snrquEezy149vQU/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          console.log(results);
          setData(results.data);
          setLoading(false);
        },
      }
    );
    const intervalId = setInterval(() => {
      readRemoteFile(
        "https://docs.google.com/spreadsheets/d/1Nj7lCM4_Rij_Bd2dE3qBpAj5a8s4snrquEezy149vQU/pub?output=csv",
        {
          download: true,
          header: true,
          complete: (results) => {
            console.log(results);
            setData(results.data);
            setLoading(false);
          },
        }
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <Helmet>
        <script
          async="async"
          data-cfasync="false"
          src="//jelqr4dqeep7.com/0598f6fa244fae4bfda38c266a87dda5/invoke.js"
        ></script>
      </Helmet>
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
                id={`${obj.key}`}
              />
            );
          })}
        </Row>
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
                id={`${obj.key}`}
              />
            );
          })}
        </Row>
        <small>Advertisement</small>
        <div id="container-0598f6fa244fae4bfda38c266a87dda5"></div>
      </Container>
    </div>
  );
}

export default Home;