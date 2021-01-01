import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function TeamFilter(props) {
  const [matches, setMatches] = useState([]);
  // const [loading, setLoading] = useState(true);
  let fixtures = matches.filter((fixture) => fixture.status === "SCHEDULED");
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("");

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
        // setLoading(false);
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
        // setLoading(false);
        // console.log(teams.teams);
      });
  });
  return (
    <div className="filter-team">
      <Form.Control as="select" onChange={handleTeams}>
        <option>အသင်းရွေးပါ</option>
        {teams.map((team) => {
          return <option>{team.name}</option>;
        })}
      </Form.Control>
    </div>
  );
}

export default TeamFilter;
