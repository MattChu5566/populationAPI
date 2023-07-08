/* eslint-disable */

import {
  createContext, useContext, useState,
} from 'react';

const Context = createContext(null);

export function ContextProvider(props) {
  const [year, setYear] = useState('');
  const [county, setCounty] = useState('');
  const [district, setDistrict] = useState('');

  const { children } = props;
  return (
    <Context.Provider
      value={{
        year,
        setYear,
        county,
        setCounty,
        district,
        setDistrict,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useStateContext = () => useContext(Context);
