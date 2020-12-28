import axios from 'axios';
import Alert from "react-bootstrap/Alert";
import React, { useEffect, useState } from 'react';

function Lives(props) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const lives = matches.filter(
    (lives) => lives.status === "IN_PLAY" || lives.status === "PAUSED"
  );

  const MatchesCheck = () => {
    if (lives.length === 0 && loading === false) {
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
      const intervalId = setInterval(() => {
        axios
          .get("https://api.football-data.org/v2/competitions/PL/matches/", {
            headers: {
              "X-Auth-Token": "3aad16c1141f43f1889e56cb290b37e4",
            },
          })
          .then((res) => {
            const competitions = res.data;
            setMatches(competitions.matches);
            setLoading(false);
            // console.log(lives);
          });
      }, 30000);
      return () => clearInterval(intervalId);
    }, []);
    return (
      <div>
        <h2>Live</h2>
        <div className={loading ? "loading" : "hide"}></div>
        <MatchesCheck />
        {lives.map((obj) => {
          return (
            <div key={obj.id} className="fixture preMatch">
              <span className="overview">
                <span className="teams">
                  <span className="team">
                    <span className="team-name">{obj.homeTeam.name}</span>
                  </span>
                  <span className="score">
                    {obj.score.fullTime.homeTeam}
                    <span></span>
                    {obj.score.fullTime.awayTeam}
                  </span>
                  <span className="team">
                    <span className="team-name">{obj.awayTeam.name}</span>
                  </span>
                </span>
              </span>
            </div>
          );
        })}
      </div>
    );
}

export default Lives;