import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../lib/Context';
import Result from './Result';
import LoadingPage from './LoadingPage';
import getData from '../lib/getData';
import getCountyDistrict from '../lib/getCountyDistrict';
import getStatistic from '../lib/getStatistic';
import getBarChartOptions from '../lib/getBarChartOptions';
import getPieChartOptions from '../lib/getPieChartOptions';

function ResultLoader() {
  const {
    data, countyOptionsRef, districtOptionsRef,
    setYear, setCounty, setDistrict, countyIsSelected, districtIsSelected,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onMount = useRef(true);

  const [chartOptions, setChartOptions] = useState([]);

  const UrlParams = useParams();

  const fetchDataSetOptions = async (y, c) => {
    const responseData = await getData(y);
    data.current = responseData;
    [countyOptionsRef.current] = getCountyDistrict(responseData);
    districtOptionsRef.current = getCountyDistrict(data.current)[1].get(c);
    countyIsSelected.current = true;
    districtIsSelected.current = true;
    onMount.current = false;
    setYear(UrlParams.year);
    setCounty(UrlParams.county);
    setDistrict(UrlParams.district);
  };

  function createChart() {
    const statisticMap = getStatistic(data.current, `${UrlParams.county}${UrlParams.district}`);
    const barChartOptions = getBarChartOptions(statisticMap);
    const pieChartOptions = getPieChartOptions(statisticMap);
    setChartOptions([barChartOptions, pieChartOptions]);
  }

  const fetching = async () => {
    try {
      const testResponse = await fetch(`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${UrlParams.year}?COUNTY=${UrlParams.county}&TOWN=${UrlParams.district}`);
      const testResult = await testResponse.json();
      if (testResult.responseMessage === '查無資料') throw new Error('查無資料');
      await fetchDataSetOptions(UrlParams.year, UrlParams.county);
      createChart();
      setIsLoading(false);
    } catch (e) {
      onMount.current = false;
      setIsLoading(false);
      setError(e);
    }
  };

  useEffect(() => {
    if (onMount.current) {
      fetching();
    }
    return () => { onMount.current = false; };
  });

  return (
    <div className="result-wrapper">
      {isLoading ? <LoadingPage /> : <Result chartOptions={chartOptions} error={error} />}
    </div>
  );
}

export default ResultLoader;
