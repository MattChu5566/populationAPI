import { useParams } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import FetchErrorPage from './FetchErrorPage';

function Result({ chartOptions, error }) {
  const UrlParams = useParams();

  return (
    <div>
      {error ? <FetchErrorPage error={error} />
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
