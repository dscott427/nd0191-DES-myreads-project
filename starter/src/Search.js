import React, { useState} from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

const Search = ({ books, updateBook }) => {

  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const updateQuery = (query) => {
    const retrieveSearchResults = async () => {
      setQuery(query);
      if (query.length !== 0) {
        console.log("query: " + query)
        const res = await BooksAPI.search(query);
        if (res.error) {
          setSearchedBooks([]);
        }
        else {
          res.map(a => (books.find(b => a.id === b.id && (a.shelf = b.shelf, true))));
          console.log(res);
          setSearchedBooks(res);
        }
      }
      else {
        setSearchedBooks([]);
      }
    };

    retrieveSearchResults();
  };

  const clearQuery = () => {
    updateQuery("");
  };

  const onQueryChange = (event) => {
    let searchString = event.target.value;
    updateQuery(searchString);
  };


  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            className="search-books"
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={onQueryChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
        <ol className="books-grid">
          {(searchedBooks.length > 0 ) ? searchedBooks.map((book) => (
            <li key={book.id}>
              <Book book={book} updateBook={updateBook}></Book>
            </li>
          )): query !== "" ? <div>No books found</div> : ""} 
        </ol>
        <div className="showing-books">
          <button onClick={clearQuery}>Clear</button>
        </div>
      </div>
    </div>

  );
}

export default Search;