import React, { Component } from "react";
import ViewBook from "./ViewBook";
import "../bookStyle.css";

export default class MyReads extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeBookShelf = this.changeBookShelf.bind(this);
    this.ViewBooks = this.ViewBooks.bind(this);
  }

  changeBookShelf(bookIndex, newShelf) {
    this.props.changeBookShelf(
      this.props.bookList[bookIndex].shelf,
      bookIndex,
      newShelf
    );
  }

  ViewBooks = () => {
    return (
      <div className="flexbox-container">
        {this.props.bookList.map((book, index) => {
          return (
            <ViewBook
              index={index}
              key={book.id}
              book={book}
              changeBookShelf={this.changeBookShelf}
            />
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div className="stylediv">
        <h1 className="titleline">{this.props.title}</h1>
        {this.ViewBooks()}
      </div>
    );
  }
}
