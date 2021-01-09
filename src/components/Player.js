import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import ReactHlsPlayer from "react-hls-player";
import { useHistory, useParams } from "react-router-dom";
import Tabletop from "tabletop";

function Player(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pause, setPause] = useState(true);
  const { id } = useParams();
  let history = useHistory();
  const match = data.filter((match) => match.key === id);
  console.log(match);
  useEffect(() => {
    Tabletop.init({
      key: "1Y6FocRKVVw-SCPNqHD8c-C96F6z43fbNHUprkIRbGbs",
      callback: (googleData) => {
        setData(googleData);
        setLoading(false);
      },
      simpleSheet: true,
    });
  }, []);
  return (
    <div>
      <div className={loading ? "loading loading-mid" : "hide"}></div>

      <Tabs
        transition={false}
        // defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        onSelect={() => setPause(false)}
        onBlur={() => setPause(true)}
      >
        {match.map((obj) => {
          return (
            <Tab eventKey={obj.title} title={obj.title}>
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
