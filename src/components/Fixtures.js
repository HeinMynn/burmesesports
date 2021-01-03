import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { HashLink as Anchor } from "react-router-hash-link";
import { Form } from "react-bootstrap";
import Iframe from "react-iframe";

function Fixtures(props) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("");

  let fixtures = matches.filter((fixture) => fixture.status === "SCHEDULED");
  const postponed = matches.filter((fixture) => fixture.status === "POSTPONED");

  function filterTeam(array, value) {
    return array.filter((e) => {
      return e.homeTeam.name === value || e.awayTeam.name === value;
    });
  }

  if (team !== "") {
    fixtures = filterTeam(fixtures, team);
    // console.log(fixtures);
  }
  function handleTeams(e) {
    return setTeam(e.target.value);
  }
  
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
    axios
      .get("https://api.football-data.org/v2/competitions/PL/teams/", {
        headers: {
          "X-Auth-Token": "3aad16c1141f43f1889e56cb290b37e4",
        },
      })
      .then((res) => {
        const teams = res.data;
        setTeams(teams.teams);
        setLoading(false);
        // console.log(teams.teams);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fixtures</title>
      </Helmet>

      <h2 id="top">Fixtures</h2>
      <div className={loading ? "loading" : "hide"}></div>
      <div className="filter-team">
        <Form.Control as="select" onChange={handleTeams}>
          <option>အသင်းရွေးပါ</option>
          {teams.map((team) => {
            return <option>{team.name}</option>;
          })}
        </Form.Control>
      </div>

      <small className="text-muted">
        <Anchor smooth to="/fixtures#tbc-matches">
          See Postponed Matches
        </Anchor>
      </small>

      {fixtures.map((obj, index) => {
        const localDate = new Date(obj.utcDate);
        const matchday = FullDate(localDate);
        var showDate = true;
        if (matchday === date2) {
          showDate = false;
        }
        date2 = matchday;

        if (index % 3 === 0 && index !== 0 && showDate === true) {
          return (
            <div key={obj.id} className="fixture preMatch">
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
        }

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