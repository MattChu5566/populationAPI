export default function getBarChartOptions(statisticMap) {
  return (
    {
      chart: {
        type: 'column',
      },
      title: {
        text: '人口數統計',
      },
      xAxis: {
        categories: ['共同生活', '獨立生活'],
        title: {
          text: '型態',
          style: {
            color: 'black',
            fontWeight: '700',
            fontSize: '14px',
          },
        },
      },
      yAxis: {
        title: {
          text: '數量',
          align: 'left',
          x: 10,
          style: {
            color: 'black',
            fontWeight: '700',
            fontSize: '14px',
          },
        },
      },
      series: [{
        name: '男性',
        data: [statisticMap.get('ordinaryM'), statisticMap.get('singleM')],
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '14px',
          },
        },
      }, {
        name: '女性',
        data: [statisticMap.get('ordinaryF'), statisticMap.get('singleF')],
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '14px',
          },
        },
      }],
    }
  );
}
