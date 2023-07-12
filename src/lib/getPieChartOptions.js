export default function getPieChartOptions(statisticMap) {
  return (
    {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: '戶數統計',
        align: 'center',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          dataLabels: {
            enabled: true,
            format: '{point.percentage:.1f} %',
            style: {
              fontSize: '14px',
            },
          },
          slicedOffset: '0',
          showInLegend: true,
        },
      },
      legend: {
        enabled: true,
      },
      colors: ['#626EB2', '#A3B1FF'],
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: '共同生活',
          y: statisticMap.get('ordinaryT'),
          sliced: true,
          selected: true,
        }, {
          name: '獨立生活',
          y: statisticMap.get('singleT'),
        }],
      }],
    }
  );
}
