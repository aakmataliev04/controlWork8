import React, {ReactNode} from 'react';
import {Quote} from '../../types';
import QuoteItem from './QuoteItem/QuoteItem';
import './Quotes.css';



interface Props {
  quotes: Quote[] | undefined;
  reFetchQuotes: () => void
}


const Quotes: React.FC<Props> = ({quotes, reFetchQuotes}) => {
  let quoteElements: ReactNode = null;

  if (quotes?.length) {
    quoteElements = quotes.map((quote) => {
      return (
        <QuoteItem key={quote.id} quote={quote} reFetchQuotes={reFetchQuotes}/>
      );
    });
  } else {
    quoteElements = <h2>There is no quotes</h2>;
  }
  return (
    <div className={'quotes'}>
      {
        quoteElements
      }
    </div>
  );

};

export default Quotes;