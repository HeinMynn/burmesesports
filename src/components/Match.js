import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {CloudinaryContext, Image} from "cloudinary-react";

function Match(props) {
  let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
  var tempDate = new Date();
  var date = `${formatTwoDigits(tempDate.getDate())}-${formatTwoDigits(
    tempDate.getMonth() + 1
  )}-${tempDate.getFullYear()}`;
  // var matchday = new Date(props.matchday*1000)
  // console.log(props.matchday.Timestamp)
  // var date = new Date(props.matchday.seconds * 1000 + props.matchday.nanoseconds/1000000)
  return (
    <Col sm={12} md={6} xl={4}>
      <div className="match-card">
        <Row>
          <Col xs={4} sm={3} className="team-container">
          <CloudinaryContext cloudName="burmese-sports" className="inline">
              <Image publicId={`bstv/${props.teamA}`} width="50" className="team-logo"/>
          </CloudinaryContext>
          </Col>
          <Col xs={4} sm={6}>
            <span className={props.hide === "playing" ? "play" : "hide"}>
              Live 
            </span>
            <span className="match-type">{props.match}</span>
            <br />
            <span className="match-time">{props.time}</span>
            <br />
            <span className="match-date">{props.matchday ? props.matchday : date}</span>
            <br />
            <Link
              to={`/player/${props.id}`}
              className={`button-link ${props.hide === "ft"?"hide":""}`}
            >
              Watch Live
            </Link>
          </Col>
          <Col xs={4} sm={3} className="team-container">
          <CloudinaryContext cloudName="burmese-sports" className="inline">
              <Image publicId={`bstv/${props.teamB}`} width="50" className="team-logo"/>
          </CloudinaryContext>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default Match;
