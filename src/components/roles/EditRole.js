import React from "react";
import axios from "axios";
import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";

export default class EditRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRole: this.props.selected,
      validated: false,
    };
  }

  //create function to update role
  updateRole = () => {
    const { selectedRole } = this.state;
    axios.put(
      `http://localhost:3030/api/v1/roles/${selectedRole.id}`,
      selectedRole
    );
  };

  componentDidMount = () => {};

  setValidated = (boolean) => {
    this.setState({
      validated: boolean,
    });
  };
  setSelectedRole = (role_id) => {
    this.setState({
      selectedRole: role_id,
    });
  };

  handleChange = (e, field) => {
    const aux = { ...this.state.selectedRole, [field]: e.target.value };
    this.setState({ selectedRole: aux });
  };

  handleDelete = (id) => {
    axios.delete(`http://localhost:3030/api/v1/roles/${id}`);
  };

  handleSubmit = (event, type = "update", id) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (type === "update") {
      this.setValidated(true);
      this.updateRole();
    } else {
      this.setValidated(true);
      this.handleDelete(id);
      this.props.closed();
    }
  };

  render() {
    const { selectedRole } = this.state;
    return (
      <Form noValidate validated={this.validated} onSubmit={this.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <FloatingLabel label="Nome do Cargo" className="m-2">
              <Form.Control
                value={selectedRole.name}
                onChange={(e) => this.handleChange(e, "name")}
                required
                type="text"
                placeholder="Nome do Cargo"
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
                value={selectedRole.description}
                onChange={(e) => this.handleChange(e, "description")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <FloatingLabel label="Atividades" className="m-2">
              <Form.Control
                required
                type="text"
                placeholder="Atividades"
                value={selectedRole.activities}
                onChange={(e) => this.handleChange(e, "activities")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button className="m-4" type="submit">
          Salvar
        </Button>
        <Button
          variant="danger"
          className="m-4"
          onClick={(e) => this.handleSubmit(e, "delete", selectedRole.id)}
        >
          Excluir
        </Button>
      </Form>
    );
  }
}
