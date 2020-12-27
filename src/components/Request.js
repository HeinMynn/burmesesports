import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function Request(props) {
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const { home } = useParams();
  const { away } = useParams();
  let history = useHistory();

  return (
    <div className="form-wrapper">
      <Form
        name="requst"
        method="POST"
        data-netlify="true"
        noValidate
        validated={validated}
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
        <Button variant="primary" type="submit">
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
