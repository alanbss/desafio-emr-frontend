import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import EmployeesList from "./routes/employees_list";
import RolesList from "./routes/roles_list";

ReactDOM.render(
  <BrowserRouter>
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand  href="/">
          EMR
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavLink style={{ color: "white" }} className={"p-1"} to="/employees">
            Funcionários
          </NavLink>
          <NavLink style={{ color: "white" }} className={"p-1"} to="/roles">
            Cargos
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="employees" element={<EmployeesList />} />
      <Route path="roles" element={<RolesList />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
