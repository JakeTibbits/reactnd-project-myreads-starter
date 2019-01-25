import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './BooksDisplay'
import BookSearch from './BookSearch'
import { Link } from 'react-router-dom'
import './App.css'

class BooksApp extends Component {
  state = {
    shelves: [
            {key: 'currentlyReading', title: "Currently Reading", books: []},
            {key: 'wantToRead', title: "Want to Read", books: []},
            {key: 'read', title: "Read", books: []},
            {key: 'none', title:"None", books: []}
          ],
    books: []
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      this.shelvesRefresh(this.state.books)
    })
  }

  shelvesRefresh = (books) => {

    let newState = Object.assign({}, this.state)

    for(let shelf of newState.shelves){
      const shelfBooks = books.filter((book) => {
        return book.shelf === shelf.key
      })
      shelf.books = shelfBooks
    }
    this.setState({ newState })
  }


  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(()=>{
      this.getBooks()
    })
  }



  render() {
    //console.log(this.state.books)

    return (
      <div className="app">

        <Route path="/search" render={({ history }) => (
          <BookSearch shelves={this.state.shelves} onMoveBook={this.moveBook} currentBooks={this.state.books}/>
        )}/>


        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {this.state.shelves.map((shelf) => (
                  shelf.key !== 'none' && (
                    <Shelf key={shelf.key} shelf={shelf} shelves={this.state.shelves} onMoveBook={this.moveBook}/>
                  )
                ))}
              </div>
              <div className="open-search">
                <Link to="/search" className="search-button">Add a book</Link>
              </div>
            </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
