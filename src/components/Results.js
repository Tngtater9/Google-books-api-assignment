import React, { Component } from "react";

export default class Results extends Component {
  componentDidUpdate () {
    this.props.reset();
  }
  renderResults = () => {
    const book = this.props.books.map((book) => (
      <React.Fragment key={book.id}>
      <div  className="book-container">
        <div className="image-container">
          <img src={`${book.imageThumbnail}`} alt={`${book.description}`} />
        </div>
        <div className="book-content-container">
          {book.title}<br/>
          Author: {book.author[0]}<br/>
          Price: {book.price}<br/>
          {book.description}<br/>
        </div>
      </div>
      <hr/>
      </React.Fragment>
    ));
    return book;
  };
  render() {
    return (
      <div>
        <h2>Results</h2>
        <section>{this.renderResults()}</section>
      </div>
    );
  }
}
