import React from "react";
import axios from "axios";
import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";

export default class CreateEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmployee: {
        first_ame: "",
        last_name: "",
        salary: 0,
        admission_date: undefined,
        birthdate: 0,
        role_id: undefined,
      },
      roles: [],
      validated: false,
      selectedRole: undefined,
    };
  }

  getRoles = () => {
    axios.get(`http://localhost:3030/api/v1/roles`).then((res) => {
      const roles = res.data;
      this.setState({ roles });
    });
  };

  CreateEmployee = () => {
    axios.post(
      "http://localhost:3030/api/v1/employees",
      this.state.newEmployee
    );
  };

  componentDidMount = () => {
    this.getRoles();
  };

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

  handleSelect = (e) => {
    if (e.target.value === "") {
      this.setSelectedRole(null);
    } else {
      this.setSelectedRole(e.target.value);
    }
  };
  handleChange = (e, field) => {
    const aux = { ...this.state.newEmployee, [field]: e.target.value };
    this.setState({ newEmployee: aux });
  };

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.CreateEmployee();
    }
    this.setValidated(true);
  };

  render() {
    const { validated } = this.state;
    return (
      <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <FloatingLabel label="Nome" className="m-2">
              <Form.Control
                required
                type="text"
                placeholder="Nome"
                onChange={(e) => this.handleChange(e, "first_name")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <FloatingLabel label="Sobrenome" className="m-2">
              <Form.Control
                required
                type="text"
                placeholder="Sobrenome"
                onChange={(e) => this.handleChange(e, "last_name")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <FloatingLabel label="Data de nascimento" className="m-2">
              <Form.Control
                required
                type="date"
                placeholder="Data de nascimento"
                onChange={(e) => this.handleChange(e, "birthdate")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <FloatingLabel label="Selecione o cargo" className="m-2">
              <Form.Select
                className="p-3 mt-2"
                placeholder="Selecione o cargo"
                onChange={(e) => this.handleChange(e, "role_id")}
              >
                {this.state.roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom05">
            <FloatingLabel label="Salário" className="m-2">
              <Form.Control
                required
                type="number"
                placeholder="Salário"
                step="0.01"
                onChange={(e) => this.handleChange(e, "salary")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom06">
            <FloatingLabel label="Data de admissão" className="m-2">
              <Form.Control
                required
                type="date"
                placeholder="Data de admissão"
                onChange={(e) => this.handleChange(e, "admission_date")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button className="m-4" type="submit">
          Criar
        </Button>
      </Form>
    );
  }
}
