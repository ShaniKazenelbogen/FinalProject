// import React, { useEffect, useState } from 'react';
// import apiClient from '../api/apiClient'; 
// const returnClientPayment = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     apiClient.get('/swagger-endpoint') // Replace with your actual API endpoint
//       .then(response => setData(response.data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div>
//       <h1>API Data:</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default client;