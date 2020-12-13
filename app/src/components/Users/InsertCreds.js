import React, { Component } from "react";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class InsertCreds extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const token = "Bearer " + localStorage.token;
    const headers = {
      "Content-type": "application/json",
      Authorization: token,
    };
    const data = [
      {
        propName: "studentCreds",
        value: {
          university: this.uni,
          course: this.course,
          year: this.year,
        },
      },
      {
        propName: "links",
        value: {
          website: this.website,
          contactEmail: this.contactEmail,
          linkedin: this.linkedin,
          gitHub: this.gitHub,
        },
      },
      {
        propName: "profileImage",
        value: this.image,
      },
    ];
    console.table(data);
    console.table(headers);
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${this.props.userId}`,
        data,
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Jumbotron>
          <Form onSubmit={this.handleSubmit}>
            <h4>Insert Your profile picture link</h4>
            <Form.Group>
              <Form.Label>Profile picture</Form.Label>
              <Form.Control
                type="text"
                defaultValue={this.props.user.profileImage}
                onChange={(e) => (this.image = e.target.value)}
              />
            </Form.Group>
            <h4>Insert your university</h4>
            <Form.Group>
              <Form.Label>University</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Università di Trento"
                onChange={(e) => (this.uni = e.target.value)}
              >
                <option>Università di Trento</option>
                <option>Università di Padova</option>
                <option>Università di Roma</option>
                <option>Università di Pisa</option>
                <option>Università di Milano</option>
                <option>Università di Torino</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Course</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Informatica"
                onChange={(e) =>
                  (this.course = e.target.value || e.defaultValue)
                }
              >
                <option>Informatica</option>
                <option>Economia</option>
                <option>Giurisprudenza</option>
                <option>Matematica</option>
                <option>Fisica</option>
                <option>Lettere</option>
                <option>Biotecnologie</option>
                <option>Medicina</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                as="select"
                defaultValue="1"
                onChange={(e) => (this.year = e.target.value || e.defaultValue)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>Fuori corso</option>
              </Form.Control>
            </Form.Group>
            <h4>Insert your Contacts</h4>
            <Form.Group>
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                defaultValue={this.props.user.links.website}
                placeholder="Website"
                onChange={(e) => (this.website = e.target.value)}
              />
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={this.props.user.links.contactEmail}
                placeholder="Contact email"
                onChange={(e) => (this.contactEmail = e.target.value)}
              />
              <Form.Label>Linkedin</Form.Label>
              <Form.Control
                type="text"
                defaultValue={this.props.user.links.linkedin}
                placeholder="linkedin"
                onChange={(e) => (this.linkedin = e.target.value)}
              />
              <Form.Label>GitHub</Form.Label>
              <Form.Control
                type="text"
                defaultValue={this.props.user.links.gitHub}
                placeholder="github"
                onChange={(e) => (this.gitHub = e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Change
            </Button>
          </Form>
        </Jumbotron>
      </div>
    );
  }
}
