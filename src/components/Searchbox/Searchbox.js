import React, { Component } from 'react';
import Axios from "axios";
import Cardlist from '../Cardlist/Cardlist.js';
import './Searchbox.css';

const apiKey = "x9Mns1ayA7AWF4jBG5jAlw";

class Searchbox extends Component {

	state = {
		searchText: "",
		error: "",
		fetchingData: false
	};

	onTextChange = val => {
		this.setState({
			searchText: val.target.value
		});
	};

	onButtonClick = () => {
		this.setState({
			fetchingData: true
		});

		const { searchText } = this.state;
		const requestUri = 
			`https://cors-anywhere.herokuapp.com/` +
      		`https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${searchText}`;
		
		Axios.get(requestUri)
		    .then(res => {
		    	this.parseXMLResponse(res.data);
		  	})
		    .catch(error => {
		        this.setState({
		          	error: error.toString(),
		          	fetchingData: false
		        });	
			});
	};

	parseXMLResponse = response => {
		const parser = new DOMParser();
	    const XMLResponse = parser.parseFromString(response, "application/xml");
	    const parseError = XMLResponse.getElementsByTagName("parsererror");

	    if (parseError.length) {
	      	this.setState({
		        error: "There was an error fetching results.",
		        fetchingData: false
	      	});
	    } else {
			const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
			const searchResults = XMLresults.map(result => this.XMLToJson(result));
			const fetchedResults = [];
                for (let key in searchResults) {
                    fetchedResults.push({
                        ...searchResults[key],
                        shelf: ""
                    })
                }
			this.setState({ fetchingData: false }, () => {
		    	this.props.setResults(fetchedResults);
	      	});
	    }
	};

	// Function to convert simple XML document into JSON.
	// Loops through each child and saves it as key, value pair
	// if there are sub-children, call the same function recursively on its children.
	XMLToJson = XML => {
	    const allNodes = new Array(...XML.children);
	    const jsonResult = {};
	    allNodes.forEach(node => {
	      	if (node.children.length) {
	        	jsonResult[node.nodeName] = this.XMLToJson(node);
	      	} else {
	        	jsonResult[node.nodeName] = node.innerHTML;
	      	}
	    });
	    return jsonResult;
	};

  	render() {
    	return (
			<div className="pa4-l pt5-l tc pa3-m pa2">
			  	<div className="bg-light-red mw7 center pa4 br2-ns ba b--black-10">
				    <fieldset className="cf bn ma0 pa0">
				      	<legend className="search pa0 f5 f3-ns mb3 black-80 bold fw7">
				      		SEARCH FOR BOOKS
				      	</legend>
				      	<div className="cf">
				        	<input className="rada f4 input-reset bn fl black-80 bg-white pa3 lh-solid w-80-l w-100 w-75-m tc br2-ns br--left-ns" 
				        	   placeholder="Search Books By title, author, or ISBN..." 
				        	   onChange={this.onTextChange}
				        	   type="text" 
				        	   value={this.state.searchText}
				        	/>
				        	<button className="radb f4 f3-ns button-reset fl pv3 tc bn pa3 bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns grow" 
				        		onClick={this.onButtonClick} 
				        	>
				        		Search
				        	</button>
				      	</div>
				    </fieldset>
			  	</div>

			  	{this.state.fetchingData ? (
			        <h1 className="ld bold tc fw8 pt6">
			         	{"loading... "}
			        </h1>
		    	) : (
					    (this.state.error && (
					    	<h1 className="red bold pt5">{this.state.error}</h1>
					    )) || (
					       	<Cardlist
								books={this.props.results}
								library={this.props.library}
								expandBook={this.props.expandBook}
								changeShelf={this.props.changeShelf}
					        />
					    )
				)}
			</div>
    	);
  	}
}

export default Searchbox;
