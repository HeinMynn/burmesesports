import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { HashLink as Anchor } from "react-router-hash-link";

function Fixtures(props) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fixtures = matches.filter((fixture) => fixture.status === "SCHEDULED");
  const postponed = matches.filter((fixture) => fixture.status === "POSTPONED");
  var date2 = "";
  const dateToTime = (dates) =>
    dates.toLocaleString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "numeric",
    });
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
        // console.log(competitions.matches);
      });
  }, []);
  return (
    <div>
      <h2 id="top">
        Fixtures
      </h2>
      <small className="text-muted">
        <Anchor to="/fixtures#tbc-matches">See Postponed Matches</Anchor>
      </small>
      <div className={loading ? "loading" : "hide"}></div>
      {fixtures.map((obj) => {
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
                  <span className="team-name">
                    {obj.homeTeam.name.replace("FC", "")}
                  </span>
                </span>
                <time dateTime={dateToTime(localDate)}>
                  {dateToTime(localDate)}
                </time>
                <span className="team">
                  <span className="team-name">
                    {obj.awayTeam.name.replace("FC", "")}
                  </span>
                </span>
              </span>
            </span>
            <Link to={`/request/${obj.homeTeam.name}/${obj.awayTeam.name}`}>
              Request Live
            </Link>
          </div>
        );
      })}
      <span className="matchday" id="tbc-matches">
        Date To Be Confirmed
      </span>
      <small className="text-muted">
        <Anchor to="/fixtures#top">See All Fixtures</Anchor>
      </small>
      {postponed.map((obj) => {
        return (
          <div key={obj.id} className="fixture preMatch">
            <span className="overview">
              <span className="teams">
                <span className="team">
                  <span className="team-name">
                    {obj.homeTeam.name.replace("FC", "")}
                  </span>
                </span>
                <time>TBC</time>
                <span className="team">
                  <span className="team-name">
                    {obj.awayTeam.name.replace("FC", "")}
                  </span>
                </span>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Fixtures;