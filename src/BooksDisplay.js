import React, { Component } from 'react'
import Img from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'


class Book extends Component{

  moveBook = (e) => {
    const newShelf = e.target.value
    this.props.onMoveBook(newShelf)
  }

  render() {


    const { book, shelves } = this.props,
          imgLoading = <div className="book-cover loading">...</div>,
          imgNotFound = <div className="book-cover not-found">Cover art missing</div>,
          buildAuthorList = (authors) => {
            if(typeof authors === 'object' && authors.length >1){
              let authorList = []
              for(let [i, author] of authors.entries()){
                authorList.push(<span className="author" key={author}>{ author + (i < authors.length-1 ? ', ' : '')}</span>)
              }
              return authorList
            } else {
              return authors
            }
          }

    return(
      <li>
        <VisibilitySensor>
        <div className="book">
          <div className="book-top">
            <Img className="book-cover" src={typeof book.imageLinks === 'object' &&(book.imageLinks.thumbnail)} loader={imgLoading} unloader={imgNotFound}/>
            <div className="book-shelf-changer">
              <select defaultValue={ (book.shelf ? book.shelf : 'none')} onChange={this.moveBook} >
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


class Shelf extends Component{

  render() {

    const shelf = this.props.shelf

    return (
      <div className="bookshelf" key={shelf.key}>
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { shelf.books.length > 0 &&(shelf.books.map((book) => (
              <Book key={book.industryIdentifiers[0].identifier} book={book} shelves={this.props.shelves} onMoveBook={(shelf)=>(
                  this.props.onMoveBook(book, shelf)
                )}/>
            )))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
