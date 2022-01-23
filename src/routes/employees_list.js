import React from "react";
import axios from "axios";
import { Button, Table, FormControl, Modal, Stack } from "react-bootstrap";

import CreateEmployee from "../components/employees/CreateEmployee";
import EditEmployee from "../components/employees/EditEmployee";

export default class EmployeesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      keyword: "",
      showCreate: false,
      showEdit: false,
      selected_id: undefined,
    };
  }

  //functions that set states
  setShowCreate = (boolean) => {
    this.setState({ showCreate: boolean });
  };
  setShowEdit = (boolean) => {
    this.setState({ showEdit: boolean });
  };
  setIndex = (index) => {
    this.setState({ selected_id: index });
  };

  //functions that handle actions
  handleCloseCreate = () => {
    this.setShowCreate(false);
  };
  handleCloseEdit = () => {
    this.setShowEdit(false);
    setTimeout(() => {
      this.getEmployees();
    }, 500);
  };
  handleShowCreate = () => {
    this.setShowCreate(true);
  };
  handleShowEdit = (index) => {
    this.setShowEdit(true);
    this.setIndex(index);
  };
  handleBlur = (event) => {
    this.setState({ keyword: event.target.value });
  };
  handleClick = () => {
    this.searchEmployee(this.state.keyword);
  };
  handleSearch = () => {
    if (this.state.keyword !== null && this.state.keyword !== "") {
      this.searchEmployees();
    }
  };

  // function that searches for employees
  searchEmployees = () => {
    axios
      .get("http://localhost:3030/api/v1/employees/search", {
        params: {
          keyword: this.state.keyword,
        },
      })
      .then((res) => {
        const employees = res.data;
        this.setState({ employees });
      });
  };

  // function that clear the search
  clearSearch = () => {
    this.setState({ keyword: "" });
    this.getEmployees();
  };

  // function that gets all employees
  getEmployees = () => {
    axios.get(`http://localhost:3030/api/v1/employees`).then((res) => {
      const employees = res.data;
      this.setState({ employees });
    });
  };

  componentDidMount = () => {
    this.getEmployees();
  };

  render() {
    const { keyword, employees, showCreate, showEdit } = this.state;
    return (
      // barra de pesquisa
      <Stack gap={2}>
        <Stack direction="horizontal" gap={3} className="m-4">
          <FormControl
            onChange={(e) => this.handleBlur(e)}
            value={keyword}
            placeholder="Pesquisar por nome ou cargo"
          />
          <Button variant="primary" onClick={this.handleSearch}>
            Buscar
          </Button>
          <div className="vr" />
          <Button variant="outline-danger" onClick={this.clearSearch}>
            Limpar
          </Button>
        </Stack>

        {/* Modal para criar funcionário */}
        <Modal show={showCreate} onHide={this.handleCloseCreate}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar Novo Funcionário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateEmployee />
          </Modal.Body>
        </Modal>

        {/* Modal para editar funcionário */}
        <Modal show={showEdit} onHide={this.handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Funcionário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditEmployee
              selected={this.state.employees[this.state.selected_id]}
              closed={this.handleCloseEdit}
            />
          </Modal.Body>
        </Modal>

        <Table striped bordered hover className="m-4">
          <thead>
            <tr>
              <th>Nome completo</th>
              <th>Cargo</th>
              <th>Salário</th>
              <th>Admissão</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td>
                  {employee.first_name} {employee.last_name}
                </td>
                <td>{employee.role_name}</td>
                <td>R$ {employee.salary}</td>
                <td>{employee.admission_date}</td>
                <td>
                  <Button
                    className="m-1"
                    variant="secondary"
                    onClick={() => this.handleShowEdit(index)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          variant="primary"
          className="ms-auto m-4"
          onClick={this.handleShowCreate}
        >
          Cadastrar funcionário
        </Button>
      </Stack>
    );
  }
}
