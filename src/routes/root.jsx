import { useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import years from '../lib/getYears';
import getCountyDistrict from '../lib/getCountyDistrict';
import getData from '../lib/getData';

export default function Root() {
  const dataThisYear = useRef([]);

  const setCountyOptions = () => {
    const countySelect = document.getElementById('county');
    countySelect.innerHTML = '';
    const [countyArray] = getCountyDistrict(dataThisYear.current);
    countyArray.forEach(
      (county, i) => countySelect.append(new Option(county, county, i === 0, false)),
    );
  };

  const setDistrictOptions = () => {
    const countySelect = document.getElementById('county');
    const districtSelect = document.getElementById('district');
    districtSelect.innerHTML = '';
    const [, districtMap] = getCountyDistrict(dataThisYear.current);
    const districtArray = districtMap.get(countySelect.value);
    districtArray.forEach(
      (district, i) => districtSelect.append(new Option(district, district, i === 0, false)),
    );
  };

  useEffect(() => {
    const getDataFromYear = async (y) => {
      const responseData = await getData(y);
      dataThisYear.current = responseData;
      setCountyOptions();
      setDistrictOptions();
    };
    getDataFromYear('111');
  }, []);

  const fetchDataOtherYear = () => {
    const anotherYear = document.getElementById('year').value;
    const getDataFromYear = async (y) => {
      const responseData = await getData(y);
      dataThisYear.current = responseData;
      setCountyOptions();
      setDistrictOptions();
    };

    getDataFromYear(anotherYear);
  };

  return (
    <div className="query-wrapper">
      <h2 className="query-title">
        人口數、戶數按戶別及性別統計
      </h2>
      <form>
        <label className="year" htmlFor="year">
          <span>年份</span>
          <select id="year" onChange={() => fetchDataOtherYear()}>
            {years.map((y) => <option key={uuidv4()} value={y}>{y}</option>)}
          </select>
        </label>

        <label className="county" htmlFor="county">
          <div>縣/市</div>
          <select id="county" onChange={() => setDistrictOptions()}>{}</select>
        </label>

        <label className="district" htmlFor="district">
          <div>區</div>
          <select id="district">dd</select>
        </label>

        <input type="submit" value="SUBMIT" className="submit-btn" />

      </form>
      <div />
    </div>
  );
}
