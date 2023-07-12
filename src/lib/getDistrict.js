export default function getDistrict(responseData, county) {
  if (!responseData || !county) return ([]);

  const siteId = responseData.map((item) => item.site_id);
  const countiesDistricts = Array.from(new Set(siteId));
  const countyDistricts = countiesDistricts.filter((item) => item.substr(0, 3) === county);
  const districts = countyDistricts.map((item) => item.substr(3));

  return districts;
}
