import React from 'react';
import {Quote} from '../../../types';
import {Link} from 'react-router-dom';
import './QuoteItem.css';
import axiosApi from '../../../axiosApi';

interface Props {
  quote: Quote;
  alonePost?: boolean;
  reFetchQuotes: ()=>void
}

const QuoteItem: React.FC<Props> = ({quote,reFetchQuotes}) => {
  const deleteQuote = async () => {
    try {
      await axiosApi.delete(`/quotes/${quote.id}.json`);
    } finally {
      alert('quote deleted');
      reFetchQuotes();
    }

  };
  return (
    <div className="quote">
      <div className="quote-content">
        <p className={'quote-text'}>category: {quote.category}</p>
        <h4 className={'quote-title'}>-{quote.author}</h4>
        <p className={'quote-text'}>"{quote.text}"</p>
      </div>
      <div className="quote-button-wrapper">
            <button onClick={deleteQuote} className="quote-btn outline">Delete</button>
            <Link to={`/quotes/${quote.id}/edit`} className="quote-btn fill">Edit &gt;&gt;</Link>
      </div>
    </div>
  );
};

export default QuoteItem;