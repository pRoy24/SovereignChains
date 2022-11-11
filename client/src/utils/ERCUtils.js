import contractABI from '../contracts/abi/PlotNFT.json';
import { ethers } from 'ethers';
import { getProvider } from './Provider';
import axios from 'axios';
const API_SERVER = process.env.REACT_APP_API_SERVER;
const CONTRACT_ADDRESS = process.env.REACT_APP_PLOT_CONTRACT_ADDRESS;

export async function mintSCPlot(chain, address, coupon) {
  const provider = getProvider();
  const signer = provider.getSigner()
  const Contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
  const contractWithSigner = Contract.connect(signer);
  
  const txResponse = await contractWithSigner.functions.mintUser(address, '4', coupon);
  axios.get(`${API_SERVER}/update_state`)
  return txResponse;
}


