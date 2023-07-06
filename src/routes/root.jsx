import { useState, useEffect, useRef } from 'react';
import years from '../lib/getYears';
import getCountyDistrict from '../lib/getCountyDistrict';
import getData from '../lib/getData';

export default function Root() {
  const [year, setYear] = useState('111');
  const [county, setCounty] = useState(null);
  const [district, setDistrict] = useState(null); console.log(district);
  const dataThisYear = useRef([]);

  let countyOptions;
  let districtOptions;
  if (dataThisYear.current.length !== 0) {
    const [countyArray, districtMap] = getCountyDistrict(dataThisYear.current);
    countyOptions = countyArray;
    districtOptions = districtMap.get(county);
  }

  useEffect(() => {
    const getDataThisYear = async (y) => {
      const responseData = await getData(y);
      dataThisYear.current = responseData;
      const firstCounty = getCountyDistrict(responseData)[0][0];
      setCounty(firstCounty);
    };

    getDataThisYear(year);
    return () => {
      dataThisYear.current = [];
    };
  }, [year]);

  useEffect(() => {
    if (districtOptions) {
      setDistrict(districtOptions[0]);
    }
  }, [year, county, districtOptions]);

  const handleSelectChange = (eleId, setState) => {
    const ele = document.getElementById(eleId);
    setState(ele.value);
  };

  return (
    <div className="query-wrapper">
      <h2 className="query-title">
        人口數、戶數按戶別及性別統計
      </h2>
      <form>
        <label className="year" htmlFor="year">
          <span>年份</span>
          <select id="year" onChange={() => handleSelectChange('year', setYear)}>
            {years.map((y) => <option value={y}>{y}</option>)}
          </select>
        </label>

        <label className="county" htmlFor="county">
          <div>縣/市</div>
          <select id="county" onChange={() => handleSelectChange('county', setCounty)}>
            {countyOptions?.map((c) => <option value={c}>{c}</option>)}
          </select>
        </label>

        <label className="district" htmlFor="district">
          <div>區</div>
          <select id="district" onChange={() => handleSelectChange('district', setDistrict)}>
            {districtOptions?.map((d) => <option value={d}>{d}</option>)}
          </select>
        </label>

        <input type="submit" value="SUBMIT" className="submit-btn" />

      </form>
      <div />
    </div>
  );
}
