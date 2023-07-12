import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Outlet } from 'react-router-dom';
import getCountyDistrict from '../lib/getCountyDistrict';
import getData from '../lib/getData';
import { useStateContext } from '../lib/Context';
import YearReactSelect from '../components/YearReactSelect';
import CountyReactSelect from '../components/CountyReactSelect';
import DistrictReactSelect from '../components/DistrictReactSelect';

export default function Root() {
  const {
    year, setYear,
    county, setCounty,
    district, setDistrict,
    countyIsSelected, districtIsSelected,
    data,
    countyOptionsRef, districtOptionsRef,
  } = useStateContext();

  const countyOptions = countyOptionsRef.current;
  const districtOptions = districtOptionsRef.current;
  const yearOptions = useMemo(() => {
    const years = [];
    for (let i = 111; i >= 106; i -= 1) {
      years.push(`${i}`);
    }
    return years;
  }, []);

  const getDataOnYearChange = async (yearSelected) => {
    const responseData = await getData(yearSelected);
    data.current = responseData;
  };
  const getCountyOptions = () => {
    [countyOptionsRef.current] = getCountyDistrict(data.current);
  };

  const clearCountyOptions = () => {
    countyIsSelected.current = false;
    setCounty('');
  };

  const getDistrictOptions = (countySelected) => {
    const [, districtMap] = getCountyDistrict(data.current);
    const districtArray = districtMap.get(countySelected);
    districtOptionsRef.current = districtArray;
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
              getDataOnYearChange(selectedOption.value)
                .then(
                  () => getCountyOptions(),
                )
                .then(
                  () => {
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
              getDistrictOptions(selectedOption.value);
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
