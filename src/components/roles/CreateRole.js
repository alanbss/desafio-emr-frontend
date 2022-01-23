import React from "react";
import axios from "axios";
import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";

export default class EditEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newRole: {
        name: "",
        description: "",
        activities: "",
      },
      validated: false,
    };
  }

  //function that creates a role
  createRole = () => {
    const { newRole } = this.state;
    axios.post(`http://localhost:3030/api/v1/roles`, newRole).catch((err) => {
      console.log(err);
    });
  };

  //function that deletes a role
  handleDelete = (e, id) => {
    axios.delete(`http://localhost:3030/api/v1/employees/${id}`);
  };

  componentDidMount = () => {};

  setValidated = (boolean) => {
    this.setState({
      validated: boolean,
    });
  };

  // function that handles the changes of the inputs
  handleChange = (e, field) => {
    const aux = { ...this.state.newRole, [field]: e.target.value };
    this.setState({ newRole: aux });
  };

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.createRole();
    }
    this.setValidated(true);
  };

  render() {
    const { newRole, validated } = this.state;
    return (
      <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <FloatingLabel label="Nome do Cargo" className="m-2">
              <Form.Control
                value={newRole.name}
                onChange={(e) => this.handleChange(e, "name")}
                required
                type="text"
                placeholder="Cargo"
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <FloatingLabel label="Descrição" className="m-2">
              <Form.Control
                required
                type="text"
                placeholder="Descrição"
                value={newRole.description}
                onChange={(e) => this.handleChange(e, "description")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <FloatingLabel label="Actividades" className="m-2">
              <Form.Control
                required
                type="text"
                placeholder="Atividades"
                value={newRole.activities}
                onChange={(e) => this.handleChange(e, "activities")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button className="m-4" type="submit">
          Salvar
        </Button>
      </Form>
    );
  }
}
