import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';

function Standings(props) {
    const [standing, setStanding] = useState([]);
    useEffect(() => {
        axios
          .get("https://api.football-data.org/v2/competitions/2021/standings", {
            headers: {
              "X-Auth-Token": "3aad16c1141f43f1889e56cb290b37e4",
            },
          })
          .then((res) => {
            const standings = res.data;
              setStanding(standings.standings[0].table);
              console.log(standings.standings[0])
          });
    },[])
    return (
      <header className="header">
        <Container>
          <Row>
            <h2>Standing Table</h2>
            <Table striped responsive bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Pl</th>
                  <th>Pts</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Form</th>
                </tr>
              </thead>
              <tbody>
                {standing.map((obj) => {
                  return (
                    <tr key={obj.position}>
                      <td>{obj.position}</td>
                      <td className="team-name">
                              <img src={obj.team.crestUrl} className="table-logo" alt={obj.team.name}/>
                        <span className="d-none d-sm-inline">
                          {obj.team.name.replace("FC", "")}
                        </span>
                      </td>
                      <td>{obj.playedGames}</td>
                      <td>{obj.points}</td>
                      <td>{obj.won}</td>
                      <td>{obj.draw}</td>
                      <td>{obj.lost}</td>
                      <td>{obj.goalsFor}</td>
                      <td>{obj.goalsAgainst}</td>
                      <td>{obj.goalDifference}</td>
                      <td>{obj.form}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
      </header>
    );
}

export default Standings;