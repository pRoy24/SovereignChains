import contractABI from '../contracts/abi/PlotNFT.json';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = process.env.REACT_APP_PLOT_NFT_BNB;

export async function mintSCPlot() {
  const provider = getProvider();

  const Contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
  const txResponse = await Contract.mint();
  return txResponse;
}


async function getProvider() {
  const provider = window.web3.currentProvider;

}