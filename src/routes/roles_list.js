import React from "react";
import axios from "axios";
import { Button, Table, FormControl, Modal, Stack } from "react-bootstrap";

import CreateRole from "../components/roles/CreateRole";
import EditRole from "../components/roles/EditRole";

export default class RolesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      roles: [],
      showEdit: false,
      showCreate: false,
      selectedRoleId: undefined,
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
    this.setState({ selectedRoleId: index });
  };

  //functions that handle actions
  handleCloseCreate = () => {
    this.setShowCreate(false);
  };
  handleCloseEdit = () => {
    this.setShowEdit(false);
    setTimeout(() => {
      this.getRoles();
    }, 100);
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
      this.searchRoles();
    }
  };

  // function that searches for employees
  searchRoles = () => {
    axios
      .get("http://localhost:3030/api/v1/roles/search", {
        params: {
          keyword: this.state.keyword,
        },
      })
      .then((res) => {
        const roles = res.data;
        this.setState({ roles });
      });
  };

  // function that clear the search
  clearSearch = () => {
    this.setState({ keyword: "" });
    this.getRoles();
  };

  // function that gets all employees
  getRoles = () => {
    axios.get(`http://localhost:3030/api/v1/roles`).then((res) => {
      const roles = res.data;
      this.setState({ roles });
    });
  };

  componentDidMount = () => {
    this.getRoles();
  };

  render() {
    const { keyword, roles, showCreate, showEdit } = this.state;
    return (
      // barra de pesquisa
      <Stack gap={2}>
        <Stack direction="horizontal" gap={3} className="m-4">
          <FormControl
            onChange={(e) => this.handleBlur(e)}
            value={keyword}
            placeholder="Pesquisar cargo"
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
            <Modal.Title>Cadastrar Novo Cargo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateRole />
          </Modal.Body>
        </Modal>

        {/* Modal para editar funcionário */}
        <Modal show={showEdit} onHide={this.handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Cargo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditRole
              selected={roles[this.state.selectedRoleId]}
              closed={this.handleCloseEdit}
            />
          </Modal.Body>
        </Modal>

        <Table striped bordered hover className="m-4">
          <thead>
            <tr>
              <th>Nome do Cargo</th>
              <th>Descrição</th>
              <th>Atividades</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>{role.activities}</td>
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
          Cadastrar Cargo
        </Button>
      </Stack>
    );
  }
}
