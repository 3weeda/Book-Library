import React, { Component } from 'react';
import Card from '../Card/Card';

class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title"><div className="title-child">{this.props.shelf}</div></h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .filter(book => book.shelf === this.props.title)
              .map(book => (
                <li key={book.id + Math.random()}>
                  <Card
                    bookData={book}
                    expandBook={this.props.expandBook}
                    changeShelf={this.props.changeShelf}
                    currentShelf={this.props.title}
                  />
                </li>))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf;
