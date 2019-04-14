import React, { Component } from 'react';
import MainPage from './components/MainPage/MainPage'
import SearchPage from './components/SearchPage/SearchPage'
import { Route } from 'react-router-dom'
import './App.css'

class app extends Component {
	state = {
		results: [],    			//array of all the books obtained
		localLibrary: [],			//local array of my library books
		expandedBook: null			//variable wich stores book data when some book is opened
	}

	setResults = (results) => {
		this.setState({ results })
		let newLibrary = this.state.localLibrary.concat(results)
		this.setState({ localLibrary: newLibrary })
	};
	collapseBook = () => {
		this.setState({
			expandedBook: null
		});
	};
	expandBook = expandedBook => {
		this.setState({ expandedBook });
	};

	componentDidMount() {
		let library = JSON.parse(localStorage.getItem("library"));
		if (library) {
			let filteredLibrary = library.filter(book => book.shelf !== '' && book.shelf !== 'none')
			this.setState({
				localLibrary: filteredLibrary
			})
			this.setState({
				localLibrary: filteredLibrary
			})
		}
	}
	componentDidUpdate() {
		this.updateLocalStorage();
		console.log(this.state.results)
		console.log(this.state.localLibrary)
	}
	updateLocalStorage() {
		let library = JSON.stringify(this.state.localLibrary);
		localStorage.setItem("library", library);
	}

	changeShelf = (book, newShelf) => {
		let localLibrary = JSON.parse(localStorage.getItem("library"));
		localLibrary.map(currentBook => {
			if (currentBook.id === book.id) {
				currentBook.shelf = newShelf
			}
			return localLibrary;
		})
		this.setState({ localLibrary: localLibrary })
		this.updateLocalStorage();
	}

	render() {
		return (
			<div className="app" >
				< Route exact path='/' render={() => (
					<MainPage
						results={this.state.localLibrary}
						setResults={this.setResults}
						expandedBook={this.state.expandedBook}
						expandBook={this.expandBook}
						collapseBook={this.collapseBook}
						changeShelf={this.changeShelf}
					/>
				)} />
				<Route path='/search' render={({ history }) => (
					<SearchPage
						results={this.state.results}
						library={this.state.localLibrary}
						setResults={this.setResults}
						expandedBook={this.state.expandedBook}
						expandBook={this.expandBook}
						collapseBook={this.collapseBook}
						changeShelf={this.changeShelf}
					/>
				)} />
			</div >
		)
	}
}

export default app;
