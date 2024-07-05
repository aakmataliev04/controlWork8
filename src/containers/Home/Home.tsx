import React, {useCallback, useEffect, useState} from 'react';
import {Quote, QuotesApi} from '../../types';
import axiosApi from '../../axiosApi';
import Quotes from '../../components/Quotes/Quotes';
import Preloader from '../../components/Preloader/Preloader';
import './Home.css';
import {NavLink, useParams} from 'react-router-dom';

const Home = () => {
  const [quotes, setPosts] = useState<Quote[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const {category} = params;

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    try {
      if (category !== undefined) {

        const {data: quotes} = await axiosApi.get<QuotesApi | null>(`/quotes.json?orderBy="category"&equalTo="${category}"`);
        if (quotes !== null) {
          const formattedQuotes: Quote[] = Object.keys(quotes).map((id: string) => {
            return {
              ...quotes[id],
              id
            };
          });
          setPosts(formattedQuotes);
        }

      } else {
        const {data: quotes} = await axiosApi.get<QuotesApi | null>('/quotes.json');

        if (quotes !== null) {
          const formattedQuotes: Quote[] = Object.keys(quotes).map((id: string) => {
            return {
              ...quotes[id],
              id
            };
          });
          setPosts(formattedQuotes);
        }
      }

    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);
  let content = <Quotes quotes={quotes} reFetchQuotes={fetchQuotes}/>;
  if (isLoading) {
    content = <div style={{display: 'flex', justifyContent: 'center', padding: '40vh 0'}}><Preloader/></div>;
  }

  return (
    <div className={'main-container'}>

      <div className="sidenav">
        <NavLink to="/quotes">All</NavLink>
        <NavLink to={`/quotes/star-wars`}>Star Wars</NavLink>
        <NavLink to={`/quotes/famous-people`}>Famous people</NavLink>
        <NavLink to={`/quotes/saying`}>Saying</NavLink>
        <NavLink to={`/quotes/humour`}>Humour</NavLink>
        <NavLink to={`/quotes/motivational`}>Motivational</NavLink>
      </div>
      {content}
    </div>
  );
};

export default Home;