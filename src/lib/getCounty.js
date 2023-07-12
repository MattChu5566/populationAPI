export default function getCounty(responseData) {
  if (!responseData) return ([]);

  const siteId = responseData.map((item) => item.site_id);
  const countiesDistricts = Array.from(new Set(siteId));
  const repeatedCounties = countiesDistricts.map((item) => item.substr(0, 3));
  const counties = Array.from(new Set(repeatedCounties));

  return counties;
}
