import React from "react";

class Book extends React.PureComponent {
  

  render() {
    const {book}= this.props;
    return (
      <div className="col s12 m7">        
        <div className="card horizontal">
          <div className="card-image">
            <img alt="book cover"  src={book.best_book.image_url} />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p dangerouslySetInnerHTML={{__html:book.best_book.title}}></p>
            </div>
            <div className="card-action">
              <label><strong>Author:</strong>&nbsp;{book.best_book.author.name}</label>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default Book;
