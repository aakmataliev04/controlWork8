import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import './AddQuote.css';
import {QuoteApi} from '../../types';
import {useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import Preloader from '../../components/Preloader/Preloader';


const AddQuote: React.FC = () => {
  const [quoteMutation, setQuoteMutation] = useState<QuoteApi>({
    author: '',
    text: '',
    category: 'motivational',
  });
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const {id} = params;

  const fetchPost = useCallback(async () => {
    if (id) {
      setIsLoading(true);
      const {data: loadedPost} = await axiosApi.get<QuoteApi>(`/quotes/${id}.json`);

      if (loadedPost !== null) {
        setQuoteMutation({author: loadedPost.author, text: loadedPost.text, category: loadedPost.category});
        setIsLoading(false);
      }
    }
  }, [id]);
  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

  const navigate = useNavigate();
  const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setQuoteMutation((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

   const quote = {...quoteMutation};
    try {
      if (id !== undefined) {
        await axiosApi.put(`/quotes/${id}.json`, quote);
      } else {
        await axiosApi.post('/quotes.json', quote);
      }
    } finally {
      setIsLoading(false);
      navigate('/');
    }
  };

  let form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <select
          className={'form-control'}
          onChange={onFieldChange}
          name={'category'}
          defaultValue={quoteMutation.category}>
          <option value={'motivational'}>Motivational</option>
          <option value={'famous-people'}>Famous people</option>
          <option value={'humour'}>Humour</option>
          <option value={'saying'}>Saying</option>
          <option value={'star-wars'}>Star Wars</option>
        </select>
        <label htmlFor="author">Author</label>
        <input
          onChange={onFieldChange}
          value={quoteMutation.author}
          id="author"
          type="text"
          name="author"
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="text">Quote text</label>
        <textarea
          onChange={onFieldChange}
          value={quoteMutation.text}
          id="text"
          name="text"
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn">
        Post Quote
      </button>
    </form>
  );
  if (isLoading) {
    form = <div style={{display: 'flex', justifyContent: 'center', padding: '110px 0'}}><Preloader/></div>;
  }
  return (
    <div className={'container add-container'}>
      <h2>{id ? 'Edit Quote' : 'Add New Quote'}</h2>

      {form}

    </div>

  );
};

export default AddQuote;