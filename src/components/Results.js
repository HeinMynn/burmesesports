import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Results(props) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  var date2 = "";
  const results = matches.filter((results) => results.status === "FINISHED");

  const FullDate = (dates) =>
    dates.toLocaleString("en-GB", {
      dateStyle: "long",
    });
  useEffect(() => {
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
        // console.log(results);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Results</title>
      </Helmet>
      <h2>Results</h2>
      <div className={loading ? "loading" : "hide"}></div>
      {results.reverse().map((obj) => {
        const localDate = new Date(obj.utcDate);
        const matchday = FullDate(localDate);
        var showDate = true;
        if (matchday === date2) {
          showDate = false;
        }
        date2 = matchday;
        return (
          <div key={obj.id} className="fixture preMatch">
            <span className="matchday">{showDate ? matchday : ""}</span>
            <span className="overview">
              <span className="teams">
                <span className="team">
                  <span className="team-name">{obj.homeTeam.name}</span>
                </span>
                <span className="score score-finished">
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

export default Results;