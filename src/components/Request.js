import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

function Request(props) {
  // const [loading, setLoading] = useState(true);
  const { home } = useParams();
  const { away } = useParams();
  let history = useHistory();

  return (
    <div className="form-wrapper">
      <Card className="bg-dark text-white">
        <Card.Header>
          Request Live Streaming for {home} vs {away}
        </Card.Header>
        <Card.Body>
          <Form name="requst" method="POST" data-netlify="true">
            <Form.Control type="hidden" name="form-name" value="request" />
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                required
                className="w-50 m-auto"
              />
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
        </Card.Body>
        <Card.Footer>
          <Button variant="warning" onClick={history.goBack}>
            Choose different match
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Request;
