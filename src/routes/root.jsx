import { useRef, useEffect, useMemo } from 'react';
import getCountyDistrict from '../lib/getCountyDistrict';
import getData from '../lib/getData';
import { useStateContext } from '../lib/Context';
import InputSelect from '../components/InputSelect';

export default function Root() {
  const {
    year, setYear, county, setCounty, district, setDistrict,
  } = useStateContext();

  const dataThisYear = useRef([]);
  const countyOptionsRef = useRef([]);
  const districtOptionsRef = useRef([]);
  const countyOptions = countyOptionsRef.current;
  const districtOptions = districtOptionsRef.current;

  const yearOptions = useMemo(() => {
    const years = [];
    for (let i = 111; i >= 106; i -= 1) {
      years.push(`${i}`);
    }
    return years;
  }, []);

  const getCountyOptions = () => {
    const countySelect = document.getElementById('county');
    countySelect.innerHTML = '';
    const [countyArray] = getCountyDistrict(dataThisYear.current);
    countyArray.forEach(
      (c) => countySelect.append(new Option(c, c, false, false)),
    );
    countySelect.value = '';
    countyOptionsRef.current = countyArray;
  };

  const getDistrictOptions = () => {
    const countySelect = document.getElementById('county');
    const districtSelect = document.getElementById('district');
    districtSelect.innerHTML = '';
    const [, districtMap] = getCountyDistrict(dataThisYear.current);
    const districtArray = districtMap.get(countySelect.value);
    districtArray.forEach(
      (d, i) => districtSelect.append(new Option(d, d, i === 0, false)),
    );
    districtSelect.disabled = false;
    districtSelect.value = '';
    districtOptionsRef.current = districtArray;
  };

  useEffect(() => {
    const getDataForYearChange = async (y) => {
      const responseData = await getData(y);
      dataThisYear.current = responseData;
      getCountyOptions();
    };
    getDataForYearChange(year);
  }, [year]);

  useEffect(() => {
    if (county) getDistrictOptions();
  }, [county]);

  return (
    <div className="query-wrapper">
      <h2 className="query-title">
        人口數、戶數按戶別及性別統計
      </h2>
      <form>
        <InputSelect
          label="year"
          labelWord="年份"
          optionArray={yearOptions}
          state={year}
          selectChangeHandler={(e) => {
            countyOptionsRef.current = [];
            districtOptionsRef.current = [];
            setCounty('');
            document.getElementById('county').value = '';
            setYear(e.target.value);
          }}
        />

        <InputSelect
          label="county"
          labelWord="縣/市"
          optionArray={countyOptions}
          state={county}
          selectChangeHandler={(e) => {
            districtOptionsRef.current = [];
            setDistrict('');
            document.getElementById('district').value = '';
            setCounty(e.target.value);
          }}
        />

        <InputSelect
          label="district"
          labelWord="區"
          optionArray={districtOptions}
          state={district}
          selectChangeHandler={(e) => setDistrict(e.target.value)}
          disabled={!county}
        />

        <input
          type="submit"
          value="SUBMIT"
          className="submit-btn"
          disabled={!document.getElementById('year')?.value || !document.getElementById('county').value || !document.getElementById('district').value}
        />

      </form>
      <hr />
      <div className="search-result-wrapper">
        <div className="search-result">
          搜尋結果
        </div>
      </div>
    </div>
  );
}
