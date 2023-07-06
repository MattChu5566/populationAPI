export default function getCountyDistrict(responseData) {
  const siteId = responseData.map((item) => item.site_id);
  const countiesDistricts = Array.from(new Set(siteId));
  const repeatedCounties = countiesDistricts.map((item) => item.substr(0, 3));
  const counties = Array.from(new Set(repeatedCounties));

  const districtMap = countiesDistricts.reduce((acc, item) => {
    const [key, value] = [item.substr(0, 3), item.substr(3)];
    if (!acc.has(key)) {
      acc.set(key, []);
    }
    acc.get(key).push(value);
    return acc;
  }, new Map());

  return [counties, districtMap];
}
