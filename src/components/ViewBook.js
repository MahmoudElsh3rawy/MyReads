import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import "../bookStyle.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "bootstrap/dist/css/bootstrap.min.css";

export default class ViewBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChangeBookShelf = this.onChangeBookShelf.bind(this);
  }

  onChangeBookShelf(event) {
    this.props.changeBookShelf(this.props.index, event.target.id);
  }

  renderButton() {
    return (
      <DropdownButton
        title
        id="dropdown-basic-button"
        variant="success"
        icon="IoMdArrowDropdownCircle"
      >
        <Dropdown.Item disabled>Move to...</Dropdown.Item>
        <Dropdown.Item onClick={this.onChangeBookShelf} id="currentlyReading" active={this.props.book.shelf == "currentlyReading"}>
          Currently Reading
        </Dropdown.Item>
        <Dropdown.Item onClick={this.onChangeBookShelf} id="wantToRead" active={this.props.book.shelf == "wantToRead"}>
          Want to Read
        </Dropdown.Item>
        <Dropdown.Item onClick={this.onChangeBookShelf} id="read" active={this.props.book.shelf == "read"} >
          Read
        </Dropdown.Item>
        <Dropdown.Item onClick={this.onChangeBookShelf} id="none" active={this.props.book.shelf == undefined}>
          None
        </Dropdown.Item>
      </DropdownButton>
    );
  }

  render() {
    return (
      <div className="divViewBook">
        <Row className="show-grid">
          <img
            className="myImage"
            src={this.props.book.imageLinks.smallThumbnail}
            alt="new"
          />
          {this.renderButton()}
        </Row>
        <Row>
          <Row className="titleBook">{this.props.book.title}</Row>
          <Row className="authorsBook">{this.props.book.authors}</Row>
        </Row>
      </div>
    );
  }
}
