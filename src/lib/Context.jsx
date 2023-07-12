/* eslint-disable */

import {
  createContext, useContext, useState, useRef
} from 'react';

const Context = createContext(null);

export function ContextProvider(props) {
  const [year, setYear] = useState('');
  const [county, setCounty] = useState('');
  const [district, setDistrict] = useState('');

  const countyIsSelected = useRef(false);
  const districtIsSelected = useRef(false);

  const data = useRef(null);

  const countyOptionsRef = useRef([]);
  const districtOptionsRef = useRef([]);

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
        countyIsSelected,
        districtIsSelected,
        data,
        countyOptionsRef,
        districtOptionsRef,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useStateContext = () => useContext(Context);
