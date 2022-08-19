import React, { Component } from "react";

import { Routes, Route } from "react-router-dom";
import ReadsLayout from "./ReadsLayout";
import NavBar from "./NavBar";
import BookSearch from "./BookSearch";
import NotFound from './notFound';
import * as BooksAPI from "../BooksAPI";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allBooks: [],
      wantToReadBooks: [],
      currentlyReadingBooks: [],
      readBooks: [],
    };

    this.changeBookShelf = this.changeBookShelf.bind(this);
    this.updateSearchResult = this.updateSearchResult.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      const wantToReadBooks = allBooks.filter(
        (book) => book.shelf == "wantToRead"
      );
      const currentlyReadingBooks = allBooks.filter(
        (book) => book.shelf == "currentlyReading"
      );
      const readBooks = allBooks.filter((book) => book.shelf == "read");

      this.setState({
        allBooks,
        wantToReadBooks,
        currentlyReadingBooks,
        readBooks,
      });
    });
  }

  changeBookShelf(currentSelf, bookIndex, newShelf) {
    if (newShelf == "none") {
      let oldList = [...this.state[currentSelf + "Books"]];
      oldList.splice(bookIndex, 1);
      
      this.setState({
        [currentSelf + "Books"]: oldList,
      });
    } else {
      if (currentSelf != newShelf) {
        let oldList = [...this.state[currentSelf + "Books"]];
        let newList = [...this.state[newShelf + "Books"]];

        const book = oldList[bookIndex];
        book.shelf = newShelf;
        oldList.splice(bookIndex, 1);
        newList.push(book);

        this.setState({
          [currentSelf + "Books"]: oldList,
          [newShelf + "Books"]: newList,
        });
      }
    }
  }

  updateSearchResult(book, newShelf) {
    if (newShelf == "none") {
      if (book.shelf) {
        const currentSelf = book.shelf;
        book.shelf = undefined;
        let oldList = [...this.state[currentSelf + "Books"]];
        oldList.splice(oldList.indexOf(book), 1);

        this.setState({
          [currentSelf + "Books"]: oldList,
        });
      }
    } else {
      if (book.shelf) {
        const currentSelf = book.shelf;
        let oldList = [...this.state[currentSelf + "Books"]];
        oldList.splice(oldList.indexOf(book), 1);

        this.setState({
          [currentSelf + "Books"]: oldList,
        });
      }
      book.shelf = newShelf;
      let newList = [...this.state[newShelf + "Books"]];
      newList.push(book);
      this.setState({
        [newShelf + "Books"]: newList,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <ReadsLayout
                  wantToReadBooks={this.state.wantToReadBooks}
                  currentlyReadingBooks={this.state.currentlyReadingBooks}
                  readBooks={this.state.readBooks}
                  changeBookShelf={this.changeBookShelf}
                />
              }
            />
            <Route
              path="/search"
              element={
                <BookSearch
                  allBooks={this.state.allBooks}
                  updateSearchResult={this.updateSearchResult}
                />
              }
            />
			<Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
