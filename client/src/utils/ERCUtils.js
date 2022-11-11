import contractABI from '../contracts/abi/PlotNFT.json';
import { ethers } from 'ethers';
import { getProvider } from './Provider';
const CONTRACT_ADDRESS = process.env.REACT_APP_PLOT_CONTRACT_ADDRESS;

export async function mintSCPlot(chain, address, coupon) {
  const provider = getProvider();
  const signer = provider.getSigner()
  const Contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
  const contractWithSigner = Contract.connect(signer);

  const txResponse = await contractWithSigner.functions.mintUser(address, '3', coupon);
  return txResponse;
}


