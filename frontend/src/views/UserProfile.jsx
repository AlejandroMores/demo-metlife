/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class UserProfile extends Component {

  constructor() {
    super()
    this.state = {
      employee: {
        id: undefined,
        firstName: "",
        lastName: "",
        emailId: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    let { employee } = this.state;

    const target = event.target;

    const value = target.value;
    const name = target.name;
    console.log(target)
    console.log(value)
    console.log(name)

    if (name === 'firstName')
      employee.firstName = value
    if (name === 'lastName')
      employee.lastName = value
    if (name === 'emailId')
      employee.emailId = value

    this.setState({
      employee: employee
    });


  }

  handleSubmit = (event) => {
    let method = "POST";
    const { employee } = this.state;
    let { data } = this.props.location;
    event.preventDefault();

    if (data.cveAccion === 2) {
      method = "PUT";
    }

    this.saveEmployee(employee, method);

  };

  saveEmployee = (employee) => {
    console.log("URI_API ->", process.env.REACT_APP_API_URL)
    fetch(process.env.REACT_APP_API_URL + "api/v1/employees", {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.redirectToTable();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  getEmployee = (id) => {
    console.log("URI_API ->", process.env.REACT_APP_API_URL)
    fetch(process.env.REACT_APP_API_URL + "api/v1/employees/" + id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            employee: result
          });
          console.log("state -> ", this.state);
          console.log("result -> ", result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  redirectToTable = () => {
    this.props.history.push({ pathname: "/admin/table" });
  }

  componentDidMount() {
    let { data } = this.props.location;

    if (data == undefined) {
      data = {
        "cveAccion": 1,
        "id": undefined
      }
    }
    if (data.cveAccion === 2) {
      this.getEmployee(data.id);
    }
  }

  render() {
    const { employee } = this.state;
    let { data } = this.props.location;

    if (data == undefined) {
      data = {
        "cveAccion": 1,
        "id": undefined
      }
    }
    let title = "";
    let msjButton = "";
    if (data.cveAccion === 1) {
      title = "Register a new employee";
      msjButton = "Add Employee"
    } else if (data.cveAccion === 2) {
      title = "Update a employee";
      msjButton = "Update Employee"
    }

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={title}
                content={
                  <form onSubmit={this.handleSubmit}>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          onChange: this.handleInputChange,
                          name: "firstName",
                          placeholder: "First name",
                          value: employee.firstName,
                          required: true
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          onChange: this.handleInputChange,
                          name: "lastName",
                          placeholder: "Last name",
                          value: employee.lastName,
                          required: true
                        },
                        {
                          label: "Email",
                          type: "email",
                          bsClass: "form-control",
                          onChange: this.handleInputChange,
                          name: "emailId",
                          placeholder: "email",
                          value: employee.emailId,
                          required: true
                        }
                      ]}
                    />

                    <Button bsStyle="info" pullRight fill type="submit">
                      {msjButton}
                    </Button>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
