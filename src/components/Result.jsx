import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import getData from '../lib/getData';
import { useStateContext } from '../lib/Context';
import getCountyDistrict from '../lib/getCountyDistrict';
import getStatistic from '../lib/getStatistic';
import getBarChartOptions from '../lib/getBarChartOptions';
import getPieChartOptions from '../lib/getPieChartOptions';
import LoadingPage from './LoadingPage';

function Result() {
  const [chartOptions, setChartOptions] = useState([]);
  const UrlParams = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { data, countyOptionsRef, districtOptionsRef } = useStateContext();
  const {
    setYear, setCounty, setDistrict, countyIsSelected, districtIsSelected,
  } = useStateContext();
  const onMount = useRef(true);

  const fetchDataSetOptions = async (y, c) => {
    const responseData = await getData(y);
    data.current = responseData;
    [countyOptionsRef.current] = getCountyDistrict(responseData);
    districtOptionsRef.current = getCountyDistrict(data.current)[1].get(c);
    countyIsSelected.current = true;
    districtIsSelected.current = true;
    setYear(UrlParams.year);
    setCounty(UrlParams.county);
    setDistrict(UrlParams.district);
    setIsLoading(false);
  };

  function createChart() {
    const statisticMap = getStatistic(data.current, `${UrlParams.county}${UrlParams.district}`);
    const barChartOptions = getBarChartOptions(statisticMap);
    const pieChartOptions = getPieChartOptions(statisticMap);
    setChartOptions([barChartOptions, pieChartOptions]);
  }

  useEffect(() => {
    if (onMount.current) {
      fetchDataSetOptions(UrlParams.year, UrlParams.county)
        .then(() => createChart());
      onMount.current = false;
    }
  });

  return (
    <div className="result-wrapper">
      {isLoading ? <LoadingPage />
        : (
          <div>
            <h2 className="">
              {`${UrlParams.year}年 ${UrlParams.county} ${UrlParams.district}`}
            </h2>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions[0]}
              containerProps={{
                style: {
                  marginLeft: 'auto', marginRight: 'auto', marginBottom: '100px',
                },
              }}
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions[1]}
              containerProps={{
                style: {
                  marginLeft: 'auto', marginRight: 'auto', marginBottom: '100px',
                },
              }}
            />
          </div>
        )}
    </div>
  );
}

export default Result;
