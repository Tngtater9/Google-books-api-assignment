import React, { Component } from "react";
import Results from "./Results";

const API_KEY = "AIzaSyA4LfiBSfIBL_NKuxHXAaXtGUhd3DNadU4";

export default class Form extends Component {
  state = {
    forSale: "FOR_SALE",
    showResults: false,
    authorName: "",
    eBooks: "",
    books: [],
  };

  resetForm = () => {
    this.setState({
      forSale: "FOR_SALE",
      showResults: false,
      authorName: "",
      eBooks: "",
      books: [],
    });
  }

  handleFormSubmit(e) {
    // this.setState({
    //   forSale: "FOR_SALE",
    //   showResults: false,
    //   authorName: "",
    //   eBooks: "",
    //   books: [],
    // });
    e.preventDefault();

    let url = "https://www.googleapis.com/books/v1/volumes?q=inauthor:"
    let { author_search, show_ebooks } = e.target;
    let author = author_search.value.trim().replace(" ", "+");
    show_ebooks.value === 'true' ? show_ebooks = "filter=free-ebooks" : show_ebooks = "";
console.log(show_ebooks);
    this.setState({
      ...this.state,
      authorName: author,
      eBooks: show_ebooks
    })
    let fetchUrl = `${url}${author}&${show_ebooks}&key=${API_KEY}`;
    // document.getElementById("search-form").reset();

    fetch(fetchUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        const availableBooks = data.items.filter(book => book.saleInfo.saleability === "FREE"| book.saleInfo.saleability === "FOR_SALE" )
        const bookResults = availableBooks.map((book) => {
          return {
            id: book.id,
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            categories: book.volumeInfo.categories,
            author: book.volumeInfo.authors,
            price: book.saleInfo.saleability === "FREE" ? '$0.00' : book.saleInfo.retailPrice.amount,
            imageThumbnail: book.volumeInfo.imageLinks.thumbnail
          }
        });
          this.setState({
                    ...this.state,
                    showResults: true,
                    books: bookResults
                  });
console.log(bookResults);
      })
       .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <form id="search-form" onSubmit={(e) => this.handleFormSubmit(e)}>
          <label htmlFor="author_search">Search by author:</label>
          <input
            type="text"
            id="author_search"
            className="author_search"></input>
          <label htmlFor="show_ebooks">Only show free eBooks:</label>
          <select id="show_ebooks">
            <option value="---">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button type="submit">Search!</button>
        </form>
        <section>
          {this.state.showResults ? <Results reset={this.resetForm} books={this.state.books} /> : ""}
        </section>
      </div>
    );
  }
}
