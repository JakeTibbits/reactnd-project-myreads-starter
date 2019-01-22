import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelves from './BookShelves'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/search" render={({ history }) => (
          <BookSearch/>
        )}/>


        <Route exact path="/" render={() => (
          <BookShelves/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
