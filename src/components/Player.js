import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button, Alert, Row, Col, Container } from "react-bootstrap";
import ReactHlsPlayer from "react-hls-player";
import { useHistory, useParams } from "react-router-dom";
import Iframe from "react-iframe";
import app from "../firebase.config";

function Player(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pause, setPause] = useState(true);
  const { id } = useParams();
  let history = useHistory();

  const db = app.firestore();
  // const match = data.filter((match) => match.key === id);
  let i = 0;

  const MatchesCheck = () => {
    if (!data.stream && loading === false) {
      return (
        <Alert variant="warning">
          <Alert.Heading>Finding Live Streaming ... </Alert.Heading>
          Live Stream will be available <b>1 HOUR</b> before the match.{" "}
        </Alert>
      );
    } else {
      return null;
    }
  };

  const fetchMatch = async () => {
    const response = db.collection("matches").doc(id);
    response.get().then((querySnapshot) => {
      setData(querySnapshot.data());
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchMatch();
  }, []);
  return (
    <div>
      <div className={loading ? "loading loading-mid" : "hide"}></div>
      <MatchesCheck />
      <Tabs
        transition={false}
        // defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        onSelect={() => setPause(false)}
        onBlur={() => setPause(true)}
      >
        {data.iframe &&
          data.iframe.map((obj) => {
            i++;
            return (
              <Tab key={obj} eventKey={obj} title={`Live ${i}`}>
                <div className="ads">
                  <Iframe
                    allow="encrypted-media"
                    width="640"
                    height="360"
                    marginwidth="0"
                    marginheight="0"
                    scrolling="no"
                    frameborder="0"
                    allowFullScreen="true"
                    url={obj}
                  />
                </div>
              </Tab>
            );
          })}
        {data.stream &&
          data.stream.map((obj) => {
            i++;
            return (
              <Tab key={obj} eventKey={obj} title={`Live ${i}`}>
                <Container>
                  <Row>
                    <Col>
                      <ReactHlsPlayer
                        url={obj}
                        autoplay={false}
                        controls={true}
                        pause={pause}
                      />
                    </Col>
                  </Row>
                </Container>
              </Tab>
            );
          })}
      </Tabs>
      <Button variant="warning" onClick={history.goBack}>
        Watch Another Match
      </Button>
    </div>
  );
}

export default Player;
