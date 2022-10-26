import { WHITELISTED_CHAINS } from "../utils/chains";

import axios from 'axios';

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

const API_KEY = '';

export async function checkAddressForWhitelist(address) {
  const result = WHITELISTED_CHAINS.map(function(chainId) {
    return getTransactionHistory(chainId, address).then(function(dateRes) {
      return dateRes;
    });
  });

  const dataResult = await Promise.all(result);

  const verifyWhitelist = getWhitelistVerification(dataResult);

  console.log(verifyWhitelist);
  console.log("TTTT");
  
  return verifyWhitelist;
}


function getWhitelistVerification(dataResult) {
  Object.keys(dataResult).map(function(resultKey) {
    const dataResultItem = dataResult[resultKey];
    
  });
}

async function getTransactionHistory(chainId, address) {
  const headers = {
    "headers": {
      "X-API-Key": MORALIS_API_KEY
    }
  };

  const responseData = await axios.get(
    `https://deep-index.moralis.io/api/v2/${address}?chain=${chainId}`,
    headers
  );
  const response = responseData.data.result;
  let dataResponse = {};

  dataResponse[chainId] = response.result;
  return dataResponse;
} 


