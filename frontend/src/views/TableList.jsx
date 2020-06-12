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
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { Link } from "react-router-dom";

class TableList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    console.log("URI_API ->", process.env.REACT_APP_API_URL)
    fetch(process.env.REACT_APP_API_URL + "api/v1/employees")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });

          console.log(result)
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

  handleClick = (cveAccion, id) => {
    let data = {
      "cveAccion": cveAccion,
      "id": id
    }
    this.props.history.push({ pathname: "/admin/user", data: data });
  }

  deleteEmployee = (id) => {
    console.log("URI_API ->", process.env.REACT_APP_API_URL)
    fetch(process.env.REACT_APP_API_URL + "api/v1/employees/" + id, {
      method: 'DELETE'
    })
      .then(
        (result) => {
          this.componentDidMount();
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

  render() {
    const { error, isLoaded, items } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>

              <Button bsStyle="info" pullRight fill type="button" onClick={() => this.handleClick(1)}>
                Add employee
              </Button>
              <Card
                title="Employees"
                category="Management employees"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item => {
                        return (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.emailId}</td>
                            <td>
                              <Button bsStyle="warning" round fill simple type="button" onClick={() => this.handleClick(2, item.id)}>
                                <i className="fa pe-7s-note" />
                              </Button>
                            </td>
                            <td>
                              <Button bsStyle="danger" round fill simple type="submit" onClick={() => this.deleteEmployee(item.id)}>
                                <i className="fa pe-7s-close" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }

              />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

export default TableList;
