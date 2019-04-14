import React from 'react';
import './Card.css';

const Card = (props) => {

	const bookTitle = props.bookData.best_book.title;
	let displayTitle = bookTitle.substring(0, 12);
	if (bookTitle.length > displayTitle.length) {
		displayTitle += "...";
	}

	return (
		<article className="br2 ba dark-gray b--black-10 mv4 w-100 mw5 dib ma2  bg-white">
			<img
				src={props.bookData.best_book.image_url}
				className="db w-100 br2 br--top ma3"
				alt="BOOK COVER"
				style={{
					'height': '300px',
					'width': '222px'
				}}
			/>
			<div className="pa2 ph3-ns pb3-ns">
				<div className="dt w-100 mt1">
					<div className="dtc">
						<h1 className="f5 f4-ns mv0">
							<span className="hint--bottom" aria-label={displayTitle.includes("...") ? bookTitle : ""}>
								{displayTitle}
							</span>
						</h1>
					</div>
				</div>
				<p className="f6 lh-copy measure mt2 mid-gray">
					{props.bookData.best_book.author.name}
				</p>

				<a className="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue" onClick={() => props.expandBook(props.bookData)} href='##' >
					More Info
			  	</a>
				<div className="book-shelf-changer">
					<select
						onChange={(event) => props.changeShelf(props.bookData, event.target.value)}
						value={props.currentShelf}
					>
						<option value="move" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
		</article>
	);
}

export default Card;
