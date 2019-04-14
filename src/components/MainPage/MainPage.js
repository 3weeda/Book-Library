import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Shelf from '../Shelf/Shelf';
import Book from '../Book/Book';

const shelves = [
  { shelf: "Currently Reading", title: "currentlyReading" },
  { shelf: "Want to Read", title: "wantToRead" },
  { shelf: "Read", title: "read" }
]
class MainPage extends Component {
  render() {
    return (
      <div className="list-books">
        {this.props.expandedBook ?
          (
            <Book
              bookData={this.props.expandedBook}
              collapseBook={this.props.collapseBook}
            />
          )
          :
          (
            <div>
              <div className="list-books-title">
                <h1>Library</h1>
              </div>
              <div className="list-books-content">
                <div className="library-body">
                  {shelves.map(myShelf => {
                    return <Shelf
                      key={myShelf.title}
                      shelf={myShelf.shelf}
                      title={myShelf.title}
                      books={this.props.results}
                      changeShelf={this.props.changeShelf}
                      expandBook={this.props.expandBook}
                    />
                  })}
                </div>
              </div>
              <div className="open-search">
                <span title="Add a new book"><Link
                  to='/search'
                ></Link></span>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default MainPage;
