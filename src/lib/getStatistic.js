export default function getStatistic(data, siteId) {
  const dataThisRegion = data.filter((item) => (item.site_id === siteId));
  const statistic = dataThisRegion.reduce((acc, item) => {
    acc.set('ordinaryF', acc.get('ordinaryF') + +item.household_ordinary_f);
    acc.set('ordinaryM', acc.get('ordinaryM') + +item.household_ordinary_m);
    acc.set('ordinaryT', acc.get('ordinaryT') + +item.household_ordinary_total);
    acc.set('singleF', acc.get('singleF') + +item.household_single_f);
    acc.set('singleM', acc.get('singleM') + +item.household_single_m);
    acc.set('singleT', acc.get('singleT') + +item.household_single_total);
    return acc;
  }, new Map([
    ['ordinaryF', 0],
    ['ordinaryM', 0],
    ['ordinaryT', 0],
    ['singleF', 0],
    ['singleM', 0],
    ['singleT', 0],
  ]));
  return statistic;
}
