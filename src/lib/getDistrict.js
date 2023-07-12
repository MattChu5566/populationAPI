export default function getDistrict(responseData, county) {
  const siteId = responseData.map((item) => item.site_id);
  const countiesDistricts = Array.from(new Set(siteId));

  // const districtMap = countiesDistricts.reduce((acc, item) => {
  //   const [key, value] = [item.substr(0, 3), item.substr(3)];
  //   if (!acc.has(key)) {
  //     acc.set(key, []);
  //   }
  //   acc.get(key).push(value);
  //   return acc;
  // }, new Map());

  const countyDistricts = countiesDistricts.filter((item) => item.substr(0, 3) === county);
  const districts = countyDistricts.map((item) => item.substr(3));

  return districts;
}
