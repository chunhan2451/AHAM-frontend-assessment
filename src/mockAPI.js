import axios from 'axios';

export function investInFund(fundId, investmentAmount, numberOfUnits) {
  // Simulate an API call with Axios
  return axios.post(`http://localhost:3000/investments`, {
    fundId,
    investmentAmount,
    numberOfUnits
  });
}