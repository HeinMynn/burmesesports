import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Match(props) {
  let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
  var tempDate = new Date();
  var date = `${formatTwoDigits(tempDate.getDate())}-${formatTwoDigits(
    tempDate.getMonth() + 1
  )}-${tempDate.getFullYear()}`;
  return (
    <Col sm={12} md={6} xl={4}>
      <div className="match-card">
        <Row>
          <Col xs={4} sm={3} className="team-container">
            <img
              src={`images/${props.teamA}.png`}
              className="team-logo"
              alt={props.date}
            />
          </Col>
          <Col xs={4} sm={6}>
            <span className={props.hide === "playing" ? "play" : "hide"}>
              Live
            </span>
            <span className="match-type">{props.match}</span>
            <br />
            <span className="match-time">{props.time}</span>
            <br />
            <span className="match-date">{props.date ? props.date : date}</span>
            <br />
            <Link
              to={`/player/${props.id}`}
              className={`button-link ${props.hide}`}
            >
              Watch Live 1
            </Link>
            <a
              href={props.link}
              className={`button-link ${props.hide}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch Live 2
            </a>
          </Col>
          <Col xs={4} sm={3} className="team-container">
            <img
              src={`images/${props.teamB}.png`}
              className="team-logo"
              alt={props.team2}
            />
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default Match;
