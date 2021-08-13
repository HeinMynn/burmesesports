import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button, Alert } from "react-bootstrap";
import ReactHlsPlayer from "react-hls-player";
import { useHistory, useParams } from "react-router-dom";
import Iframe from "react-iframe";
import { readRemoteFile } from "react-papaparse";

function Player(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pause, setPause] = useState(true);
  const { id } = useParams();
  let history = useHistory();
  const match = data.filter((match) => match.key === id);

  const MatchesCheck = () => {
    if (match.length === 0 && loading === false) {
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

  useEffect(() => {
    readRemoteFile(
      "https://docs.google.com/spreadsheets/d/1Y6FocRKVVw-SCPNqHD8c-C96F6z43fbNHUprkIRbGbs/pub?output=csv",
      {
        header: true,
        download: true,
        complete: (results) => {
          console.log(results);
          setData(results.data);
          setLoading(false);
        },
      }
    );
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
        {match.slice(0, 1).map((obj) => {
          if (obj.title !== "iframe") {
            return null;
          } else {
            return (
              <Tab key={obj.link} eventKey={obj.title} title={obj.title}>
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
                    url={obj.link}
                  />
                </div>
              </Tab>
            );
          }
        })}
        {match.slice(1).map((obj) => {
          return (
            <Tab key={obj.link} eventKey={obj.title} title={obj.title}>
              <ReactHlsPlayer
                url={obj.link}
                autoplay={false}
                controls={true}
                pause={pause}
                width={500}
                height={375}
              />
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
