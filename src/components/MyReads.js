import React, {Component} from "react";
// import ReactDOM from "react-dom";
import * as BooksAPI from "../BooksAPI";
import ViewBook from "./ViewBook";


export default class MyReads extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            allBooks: [],
        }
    }
    componentDidMount(){
        BooksAPI.getAll().then(allBooks => {
            this.setState({allBooks});
        });
    }
    ViewBooks = () => {
        return this.state.allBooks.map(book => {
            return (<ViewBook 
                key = {book.id}
                book = {book}/>);
        });
    }

    render() {
        return (
            <div>
                {this.ViewBooks()}
            </div>
        );
    }
}