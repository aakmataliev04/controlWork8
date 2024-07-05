export interface QuoteApi {
  author: string;
  text: string;
  category: string;
}

export interface QuotesApi {
  [id: string]: QuoteApi;
}

export interface Quote extends QuoteApi {
  id: string;
}