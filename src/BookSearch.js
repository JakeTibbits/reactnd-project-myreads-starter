import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './BooksDisplay'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {

  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    const regex = new RegExp("^[a-zA-Z ]*$")

    if(query.length && regex.test(query)){
      
      BooksAPI.search(query).then((data)=>{

        const matchedBooks = this.matchCurrentBooks(this.props.currentBooks, data)

        data &&(this.setState({searchedBooks : matchedBooks}))

      }).catch((error)=>{
        console.log('Error: invalid search')
        this.setState({searchedBooks : []})
      })
    } else {
      this.setState({searchedBooks : []})
    }
  }

  matchCurrentBooks = (currentBooks, searchedBooks) => {
    let books = searchedBooks

    for(let currentBook of currentBooks){
      function checkId(book) { return book.id === currentBook.id }
      const match = books.findIndex(checkId)
      if(match >= 0){
        books[match].shelf = currentBook.shelf
      }
    }

    return books
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {

    const { query, searchedBooks } = this.state
    const { shelves, onMoveBook } = this.props
    let title = (query.length ? (searchedBooks.length ? 'Books matching "'+query+'"...' : 'No matching books found') : 'Enter a search query')
    const shelf = {
      key: 'searchResults',
      title:title,
      books: searchedBooks
    }

    return(
      <div className="search-books">
        <h1 className="sr-only">Search for books by title or author</h1>
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">

            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <Shelf shelf={shelf} shelves={shelves} onMoveBook={onMoveBook}/>
        </div>
      </div>
    )
  }
}

export default BookSearch
