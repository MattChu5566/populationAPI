export default async function getData(year = '111') {
  // const storedResult = JSON.parse(localStorage.getItem(year));
  // if (storedResult && storedResult[0]?.statistic_yyy === year) return storedResult;

  const response = await fetch(`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}`);
  const responseResult = await response.json();
  const { totalPage } = responseResult;
  let { responseData } = responseResult;

  if (totalPage > 1) {
    let moreResponse = [];
    for (let page = 2; page <= totalPage; page += 1) {
      moreResponse.push(fetch(`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}?PAGE=${page}`));
    }
    moreResponse = await Promise.all(moreResponse);
    const moreResults = await Promise.all(moreResponse.map((res) => res.json()));
    responseData = responseData.concat(...moreResults.map((res) => res.responseData));
  }
  // console.log(responseData);
  // localStorage.setItem(year, JSON.stringify(responseData));
  return responseData;
}
