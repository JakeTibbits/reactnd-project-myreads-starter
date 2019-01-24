import React, { Component } from 'react'
import Img from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'


class Book extends Component{

  moveBook = (e) => {
    console.log('change event fired')
    const newShelf = e.target.value
    this.props.onMoveBook(newShelf)
  }

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
              <select defaultValue={book.shelf} onChange={this.moveBook} >
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


export default Book
