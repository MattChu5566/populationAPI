import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useStateContext, getData, getStatistic, getBarChartOptions, getPieChartOptions,
} from '../lib/index';
import Result from './Result';
import LoadingPage from './LoadingPage';

function ResultLoader() {
  const {
    data,
    setYear, setCounty, setDistrict, countyIsSelected, districtIsSelected,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onMount = useRef(true);

  const [chartOptions, setChartOptions] = useState([]);

  const UrlParams = useParams();

  const fetchDataSetOptions = async (y) => {
    const responseData = await getData(y);
    data.current = responseData;
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

  const fetchingOnMount = async () => {
    try {
      const testResponse = await fetch(`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${UrlParams.year}?COUNTY=${UrlParams.county}&TOWN=${UrlParams.district}`);
      const testResult = await testResponse.json();
      if (testResult.responseMessage === '查無資料') throw new Error('查無資料');
      await fetchDataSetOptions(UrlParams.year, UrlParams.county);
      createChart();
    } catch (e) {
      onMount.current = false;
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (onMount.current) {
      fetchingOnMount();
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
