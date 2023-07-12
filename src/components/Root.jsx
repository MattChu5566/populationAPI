import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Outlet } from 'react-router-dom';
import {
  useStateContext, getCounty, getData, getDistrict,
} from '../lib/index';
import { YearReactSelect, CountyReactSelect, DistrictReactSelect } from './index';

export default function Root() {
  const {
    year, setYear,
    county, setCounty,
    district, setDistrict,
    countyIsSelected, districtIsSelected,
    data,
  } = useStateContext();

  const countyOptions = getCounty(data.current);
  const districtOptions = getDistrict(data.current, county);
  const yearOptions = useMemo(() => {
    const years = [];
    for (let i = 111; i >= 106; i -= 1) {
      years.push(`${i}`);
    }
    return years;
  }, []);

  const clearCountyOptions = () => {
    countyIsSelected.current = false;
    setCounty('');
  };

  const clearDistrictOptions = () => {
    districtIsSelected.current = false;
    setDistrict('');
  };

  return (
    <div className="query-wrapper">
      <h2 className="query-title">
        人口數、戶數按戶別及性別統計
      </h2>
      <form
        id="form"
        onSubmit={
        (e) => {
          e.preventDefault();
          window.location = `/${year}/${county}/${district}`;
        }
      }
      >
        <YearReactSelect
          key={uuidv4()}
          year={year}
          optionArray={yearOptions}
          isDisabled={false}
          selectHandler={(selectedOption) => {
            if (selectedOption.value !== year) {
              clearCountyOptions();
              clearDistrictOptions();
              setYear('');
              getData(selectedOption.value)
                .then(
                  (responseData) => {
                    data.current = responseData;
                    setYear(selectedOption.value);
                  },
                );
            }
          }}
        />

        <CountyReactSelect
          key={uuidv4()}
          year={year}
          county={county}
          countyIsSelected={countyIsSelected.current}
          optionArray={countyOptions}
          isDisabled={!year}
          selectHandler={(selectedOption) => {
            if (selectedOption.value !== county) {
              clearDistrictOptions();
              countyIsSelected.current = true;
              districtIsSelected.current = false;
              setCounty(selectedOption.value);
            }
          }}
        />

        <DistrictReactSelect
          key={uuidv4()}
          county={county}
          district={district}
          districtIsSelected={districtIsSelected.current}
          optionArray={districtOptions}
          isDisabled={!county}
          selectHandler={(selectedOption) => {
            districtIsSelected.current = true;
            setDistrict(selectedOption.value);
          }}
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

      <Outlet />

    </div>
  );
}
