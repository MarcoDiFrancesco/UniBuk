import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Review from "./Review";

import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import StarRatings from "react-star-ratings";

class ResDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {
        tags: [],
        comments: [],
      },
      rate: 0,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${this.props.resourceType}s/${match.params.resourceId}`
    );
    const json = await res.json();
    if (this.props.resourceType === "book") {
      this.setState({
        resource: json.book,
      });
    } else if (this.props.resourceType === "content") {
      this.setState({
        resource: json.content,
      });
    }
  }

  changeRating = (newRating, name) => {
    this.setState({
      rate: newRating,
    });
  };

  addReview = async (e) => {
    e.preventDefault();
    console.log("should add the review");
    const token = "Bearer " + localStorage.token;
    const headers = {
      "Content-type": "application/json",
      Authorization: token,
    };
    const data = [
      {
        propName: "comments",
        value: {
          author: localStorage.myId,
          rank: this.state.rate,
          text: this.reviewText,
        },
      },
    ];
    console.table(data);
    console.table(headers);
    console.log(this.props);
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/${this.props.resourceType}s/${this.props.match.params.resourceId}/reviews`,
        data,
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { resource } = this.state;
    if (this.props.resourceType === "book") {
      return (
        <Jumbotron className="mx-5 my-5">
          <ListGroup variant="flush" className="bg-transparent text-dark">
            <h3>Book Info</h3>
            <ListGroup.Item>
              <Image
                src={`${process.env.REACT_APP_BACKEND_URL}/${resource.image}`}
                fluid
                thumbnail
              ></Image>
            </ListGroup.Item>
            <ListGroup.Item>author: {resource.author}</ListGroup.Item>
            <ListGroup.Item>description: {resource.description}</ListGroup.Item>
            <ListGroup.Item>isbn: {resource.isbn}</ListGroup.Item>
            <ListGroup.Item>title: {resource.title}</ListGroup.Item>

            <h3>Tag</h3>
            {resource.tags.map((tag) => (
              <ListGroup.Item>{tag}</ListGroup.Item>
            ))}
            <p></p>
            <h3>Commenti</h3>
            <Form onSubmit={this.addReview}>
              <Form.Group controlId="addReviewArea">
                <Form.Label>Write a comment</Form.Label>
                <br />
                <StarRatings
                  rating={this.state.rate}
                  starRatedColor="blue"
                  starHoverColor="blue"
                  starDimension="30px"
                  changeRating={this.changeRating}
                  numberOfStars={5}
                  name="rating"
                />
                <Form.Control
                  as="textarea"
                  rows={2}
                  onChange={(e) => (this.reviewText = e.target.value)}
                  required
                />
                <Button variant="primary" type="submit" size="sm">
                  Publish
                </Button>
              </Form.Group>
            </Form>
            <br />
            {resource.comments.map((comment) => (
              <Review review={comment} />
            ))}
          </ListGroup>
        </Jumbotron>
      );
    } else if (this.props.resourceType === "content") {
      return (
        <Jumbotron>
          <ListGroup>
            <h3>Content Info</h3>
            <ListGroup.Item>
              <Image
                src={`${process.env.REACT_APP_BACKEND_URL}/${resource.image}`}
                fluid
                thumbnail
              ></Image>
            </ListGroup.Item>
            <ListGroup.Item>creator: {resource.creator}</ListGroup.Item>
            <ListGroup.Item>date: {resource.date}</ListGroup.Item>
            <ListGroup.Item>name: {resource.name}</ListGroup.Item>
            <ListGroup.Item>description: {resource.description}</ListGroup.Item>
            <p />
            <h3>Commenti</h3>
            <Form onsubmit={this.addReview()}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
            {resource.comments.map((comment) => (
              <Review review={comment} />
            ))}
          </ListGroup>
        </Jumbotron>
      );
    } else {
      return (
        <div>
          <p>Resource type undefined</p>
        </div>
      );
    }
  }
}

export default withRouter(ResDetail);
