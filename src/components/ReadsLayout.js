import React, { Component } from "react";
import MyReads from "./MyReads";
import { OverlayTrigger, Tooltip, Button, Row } from "react-bootstrap";
import "../bookStyle.css";
import { NavLink } from "react-router-dom";

export default class ReadsLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ReadsLayout">
        <Row>
          <MyReads
            title={"Currently Reading"}
            bookList={this.props.currentlyReadingBooks}
            changeBookShelf={this.props.changeBookShelf}
          />
        </Row>
        <Row>
          <MyReads
            title={"Want To Read"}
            bookList={this.props.wantToReadBooks}
            changeBookShelf={this.props.changeBookShelf}
          />
        </Row>
        <Row>
          <MyReads
            title={"Read"}
            bookList={this.props.readBooks}
            changeBookShelf={this.props.changeBookShelf}
          />
        </Row>

        <OverlayTrigger
          placement="left"
          trigger={["hover", "focus"]}
          overlay={<Tooltip className="in">{"Search"}</Tooltip>}
        >
          <NavLink to={"/search"}>
            <Button className={`floating-btn`}>
              <i className="fa-solid fa-plus"></i>
            </Button>
          </NavLink>
        </OverlayTrigger>
      </div>
    );
  }
}
