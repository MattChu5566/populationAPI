import { useRef, useMemo } from 'react';
import getCountyDistrict from '../lib/getCountyDistrict';
import getData from '../lib/getData';
import { useStateContext } from '../lib/Context';
import InputSelect from '../components/InputSelect';

export default function Root() {
  const {
    year, setYear,
    county, setCounty,
    district, setDistrict,
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
    [countyOptionsRef.current] = getCountyDistrict(dataThisYear.current);
  };

  const clearCountyOptions = () => {
    document.getElementById('county').innerHTML = '';
    document.getElementById('county').value = '';
    countyOptionsRef.current = [];
    setCounty('');
  };

  const clearDistrictOptions = () => {
    document.getElementById('district').innerHTML = '';
    districtOptionsRef.current = [];
    setDistrict('');
  };

  const disableDistrictSubmitBtn = () => {
    document.getElementById('district').disabled = true;
    document.querySelector('label.district span').className = 'disabled';
    document.querySelector('label.district input').disabled = true;
    document.querySelector('.submit-btn').disabled = true;
  };

  const getDistrictOptions = () => {
    const [, districtMap] = getCountyDistrict(dataThisYear.current);
    const districtArray = districtMap.get(document.getElementById('county').value);
    districtOptionsRef.current = districtArray;
  };

  const getDataOnYearChange = async (y) => {
    const responseData = await getData(y);
    dataThisYear.current = responseData;
  };

  /* useEffect(() => {
    document.getElementById('year').value = '';
  }, []);

  useEffect(() => {
    document.getElementById('county').value = '';
  }, [year]);

  useEffect(() => {
    document.getElementById('district').value = '';
  }, [year, county]); */

  return (
    <div className="query-wrapper">
      <h2 className="query-title">
        人口數、戶數按戶別及性別統計
      </h2>
      <form>
        <InputSelect
          label="year"
          labelWord="年份"
          placeholder=""
          optionArray={yearOptions}
          state={year}
          selectChangeHandler={(e) => {
            clearCountyOptions();
            clearDistrictOptions();
            disableDistrictSubmitBtn();
            getDataOnYearChange(e.target.value)
              .then(
                () => getCountyOptions(),
              )
              .then(
                () => {
                  setYear(e.target.value);
                },
              );
          }}
        />

        <InputSelect
          label="county"
          labelWord="縣/市"
          placeholder="請選擇 縣/市"
          optionArray={countyOptions}
          state={county}
          selectChangeHandler={(e) => {
            clearDistrictOptions();
            getDistrictOptions();
            setCounty(e.target.value);
          }}
          disabled={!year}
        />

        <InputSelect
          label="district"
          labelWord="區"
          placeholder="請先選擇 縣/市"
          optionArray={districtOptions}
          state={district}
          selectChangeHandler={(e) => setDistrict(e.target.value)}
          disabled={!county}
        />

        <input
          type="submit"
          value="SUBMIT"
          className="submit-btn"
          disabled={!year || !county || !district}
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
