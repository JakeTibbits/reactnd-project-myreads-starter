import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Img from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'


class Book extends Component{

  render() {

    const { book, shelves } = this.props,
          imgLoading = <div className="book-cover loading">...</div>,
          imgNotFound = <div className="book-cover not-found">Cover art missing</div>,
          buildAuthorList = (authors) => {
            if(authors.length >1){
              let authorList = []
              for(let [i, author] of authors.entries()){
                authorList.push(<span className="author" key={author}>{ author + (i < authors.length-1 ? ', ' : '')}</span>)
              }
              return authorList
            } else {
              return authors[0]
            }
          }




    return(
      <li>
        <VisibilitySensor>
        <div className="book">
          <div className="book-top">
            <Img className="book-cover" src={book.imageLinks.thumbnail} loader={imgLoading} unloader={imgNotFound}/>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf}>
                <option value="move" disabled>Move to...</option>
                {shelves.map((shelf) => (
                  <option value={shelf.key} key={shelf.key}>{shelf.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors"><span className="author">{buildAuthorList(book.authors)}</span></div>
        </div>
        </VisibilitySensor>
      </li>
    )
  }
}



class BookShelves extends Component {


  render() {

    const { books } = this.props,
          shelves = [
            {key: 'currentlyReading', title: "Currently Reading"},
            {key: 'wantToRead', title: "Want to Read"},
            {key: 'read', title: "Read"},
            {key: 'none', title:"None"}
          ],
          getShelfBooks = (shelf) => {
            const shelfBooks = books.filter((book) => {
              return book.shelf === shelf.key
            })
            return shelfBooks
          }

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelf) => (
            shelf.key !== 'none' && (
              <div className="bookshelf" key={shelf.key}>
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    { getShelfBooks(shelf).map((book) => (
                      <Book key={book.industryIdentifiers[0].identifier} book={book} shelves={shelves} />
                    ))}
                  </ol>
                </div>
              </div>
            )
          ))}
        </div>
        <div className="open-search">
          <Link to="/search" className="search-button">Add a book</Link>
        </div>
      </div>
    )
  }
}



export default BookShelves
