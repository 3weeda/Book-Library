import React, { Component } from 'react';
import Searchbox from '../Searchbox/Searchbox.js';
import { Link } from 'react-router-dom';
import Book from '../Book/Book';

class SearchPage extends Component {
    render() {
        return (
            <div>
                <Link
                    to='/'
                    className="close-search"
                >Close</Link>
                {this.props.expandedBook ?
                    (
                        <Book
                            bookData={this.props.expandedBook}
                            collapseBook={this.props.collapseBook}
                        />
                    )
                    :
                    (
                        <Searchbox
                            results={this.props.results}
                            library={this.props.library}
                            setResults={this.props.setResults}
                            expandBook={this.props.expandBook}
                            changeShelf={this.props.changeShelf}
                        />
                    )
                }
            </div>
        );
    }
}

export default SearchPage;
