import axios from 'axios';
import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from 'react';

function Fixtures(props) {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [homeTeam, setHomeTeam] = useState("");
    const [awayTeam, setAwayTeam] = useState("");
    const [validated, setValidated] = useState(false);
    const [serverState, setServerState] = useState({
      submitting: false,
      status: null,
    });
    
    const handleClose = (homeTeam, awayTeam) => {
      setShow(false);
      setHomeTeam("");
      setAwayTeam("");
    };
    const handleShow = (homeTeam, awayTeam) => {
      setShow(true);
      setHomeTeam(homeTeam);
      setAwayTeam(awayTeam);
    };
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    });
    if (ok) {
      form.reset();
      setValidated(false);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      handleServerResponse(
        false,
        "Some error occurs while submiting. Please check your entries again.",
        form
      );
    }

    setValidated(true);
    if (form.checkValidity() === true) {
      setLoading(true);
      setServerState({ submitting: true });
      axios({
        method: "post",
        url: props.location.pathname,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: new FormData(form),
      })
        .then((r) => {
          handleServerResponse(
            true,
            "Success! Thanks for your submission.",
            form
          );
          setLoading(false);
        })
        .catch((r) => {
          handleServerResponse(false, r.response.data.error, form);
        });
    }
  };

    const fixtures = matches.filter((fixture) => fixture.status === 'SCHEDULED');
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
            // console.log(fixtures);
          });
    }, []);
    return (
      <div>
        <h2>Fixtures</h2>
        {serverState.status && (
          <p
            className={
              !serverState.status.ok
                ? "errorMsg alert alert-danger"
                : "alert alert-success"
            }
          >
            {serverState.status.msg}
          </p>
        )}
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
                    <span className="team-name">{obj.homeTeam.name}</span>
                  </span>
                  <time dateTime={dateToTime(localDate)}>
                    {dateToTime(localDate)}
                  </time>
                  <span className="team">
                    <span className="team-name">{obj.awayTeam.name}</span>
                  </span>
                </span>
              </span>
              <Button
                variant="primary"
                onClick={() => handleShow(obj.homeTeam.name, obj.awayTeam.name)}
              >
                Request Live Stream
              </Button>
              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form
                    name="requst_live"
                    method="POST"
                    data-netlify="true"
                    noValidate
                    validated={validated}
                    onSubmit={handleOnSubmit}
                  >
                    <Form.Control
                      type="hidden"
                      name="form-name"
                      value="request-live"
                    />
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="hidden"
                        value={`${homeTeam} vs ${awayTeam}`}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="I agree terms & conditions"
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Request
                    </Button>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          );
        })}
      </div>
    );
}

export default Fixtures;