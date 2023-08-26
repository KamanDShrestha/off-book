import { createContext, useContext, useState } from 'react';

import React from 'react';

const FetchContext = createContext();

const FetchQueryProvider = ({ children }) => {
  const [fetchQuery, setFetchQuery] = useState({
    selectedGenre: '',
    sortPrice: '',
    searchQuery: '',
  });

  return (
    <FetchContext.Provider value={{ fetchQuery, setFetchQuery }}>
      {children}
    </FetchContext.Provider>
  );
};

export function useFetchContext() {
  const context = useContext(FetchContext);
  return context;
}

export default FetchQueryProvider;
