import { useEffect, useState } from 'react';

function Result() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    new Promise((res) => { setTimeout(() => res('test'), 3000); })
      .then(() => setIsLoading(() => false));
  });

  return (
    <div>
      {isLoading ? <div>Loading</div> : <div>Result</div>}
    </div>
  );
}

export default Result;

// export async function resultLoader() {
//   const p = await new Promise((res) => { setTimeout(() => res('test'), 3000); });
//   return p;
// }
