import React, { Component } from "react";
import { Row, Button } from "react-bootstrap";
import "../bookStyle.css";
import * as BooksAPI from "../BooksAPI";
import ViewBook from "./ViewBook";
import { NavLink } from "react-router-dom";

export default class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredBooks: [],
    };
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.ViewBooks = this.ViewBooks.bind(this);
    this.changeBookShelf = this.changeBookShelf.bind(this);
  }

  checker(str, searchStr) {
    return (str || "").toLowerCase().indexOf(searchStr.toLowerCase()) >= 0;
  }

  onChangeSearchInput(event) {
    const searchInput = event.target.value;

    if (searchInput.length > 0) {
      this.setState(() => ({
        filteredBooks: [],
      }));
      BooksAPI.search(searchInput).then((searchResults) => {
        this.setState({
          filteredBooks: searchResults,
        });
      });
    } else {
      this.setState({
        filteredBooks: [],
      });
    }
  }
  changeBookShelf(bookIndex, newShelf) {
    const book = this.state.filteredBooks[bookIndex];

    this.props.updateSearchResult(book, newShelf);
  }

  ViewBooks = () => {
    if (
      this.state.filteredBooks.error ||
      this.state.filteredBooks.length == 0
    ) {
      return (
        <div className="noBooksFou">
          <h2>No books found</h2>
        </div>
      );
    } else {
      return (
        <div className="flexbox-container">
          {this.state.filteredBooks.map((book, index) => {
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
    }
  };
  render() {
    return (
      <div className="container-fluid">
        <NavLink to={"/"}>
          <Button className="backbutton">
            <i class="fa-solid fa-arrow-left"></i>
          </Button>
        </NavLink>
        <input
          className="form-control me-2"
          type="text"
          name="searchInput"
          placeholder="Search by title, author, or ISBN"
          onChange={this.onChangeSearchInput}
        />
        <Row>{this.ViewBooks()}</Row>
      </div>
    );
  }
}
