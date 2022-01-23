import React from "react";
import axios from "axios";
import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";

export default class EditEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      validated: false,
      selectedRoleId: undefined,
      selectedEmployee: this.props.selected,
    };
  }
  getRoles = () => {
    axios.get(`http://localhost:3030/api/v1/roles`).then((res) => {
      const roles = res.data;
      this.setState({ roles });
    });
  };
  updateEmployee = () => {
    const { selectedEmployee } = this.state;
    axios
      .put(
        `http://localhost:3030/api/v1/employees/${selectedEmployee.id}`,
        selectedEmployee
      )
      .catch((err) => console.log(err));
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

  handleChange = (e, field) => {
    const aux = { ...this.state.selectedEmployee, [field]: e.target.value };
    this.setState({ selectedEmployee: aux });
  };
  handleDelete = (id) => {
    axios.delete(`http://localhost:3030/api/v1/employees/${id}`);
  };

  handleSelect = (e) => {
    if (e.target.value === "") {
      this.setSelectedRole(null);
    } else {
      this.setSelectedRole(e.target.value);
    }
  };

  handleSubmit = (event, type = "update", id) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (type === "update") {
      this.updateEmployee();
    } else {
      this.handleDelete(id);
      this.props.closed();
    }
    this.setValidated(true);
  };

  render() {
    const { selectedEmployee } = this.state;
    return (
      <Form noValidate validated={this.validated} onSubmit={this.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <FloatingLabel label="Nome" className="m-2">
              <Form.Control
                value={selectedEmployee.first_name}
                onChange={(e) => this.handleChange(e, "first_name")}
                required
                type="text"
                placeholder="Nome"
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <FloatingLabel label="Sobrenome" className="m-2">
              <Form.Control
                required
                type="text"
                placeholder="Sobrenome"
                value={selectedEmployee.last_name}
                onChange={(e) => this.handleChange(e, "last_name")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <FloatingLabel label="Data de nascimento" className="m-2">
              <Form.Control
                required
                type="date"
                placeholder="Data de nascimento"
                value={selectedEmployee.birthdate}
                onChange={(e) => this.handleChange(e, "birthdate")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <FloatingLabel className="m-2">
              <Form.Select
                className="p-3 mt-2"
                onChange={this.handleSelect.bind(this)}
              >
                <option value={selectedEmployee.roleName}>
                  {selectedEmployee.role_name}
                </option>
                {this.state.roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <FloatingLabel label="Salário" className="m-2">
              <Form.Control
                required
                type="number"
                placeholder="Salário"
                step="0.01"
                value={selectedEmployee.salary}
                onChange={(e) => this.handleChange(e, "salary")}
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <FloatingLabel label="Data de admissão" className="m-2">
              <Form.Control
                required
                type="date"
                placeholder="Data de admissão"
                value={selectedEmployee.admission_date}
                onChange={(e) => this.handleChange(e, "admission_date")}
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
          onClick={(e) => this.handleSubmit(e, "delete", selectedEmployee.id)}
        >
          Excluir
        </Button>
      </Form>
    );
  }
}
