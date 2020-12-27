import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

function Request(props) {
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const { home } = useParams();
  const { away } = useParams();
  let history = useHistory();
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  });
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
  return (
    <div className="form-wrapper">
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
      <Form
        name="requst"
        method="POST"
        data-netlify="true"
        noValidate
        validated={validated}
        onSubmit={handleOnSubmit}
      >
        <Form.Control type="hidden" name="form-name" value="request" />
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="hidden"
            name="match"
            value={`${home} vs ${away}`}
          />
          <Form.Text className="text-muted">
            Request Live Streaming for {home} vs {away}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I agree terms & conditions" />
        </Form.Group>
        <Button variant="primary" type="submit" name="request">
          Request
        </Button>
      </Form>
      <Button variant="warning" onClick={history.goBack}>
        Choose different match
      </Button>
    </div>
  );
}

export default Request;
