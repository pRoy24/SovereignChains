import React, { useState, useEffect, } from 'react';
import { Container } from '@chakra-ui/react'
import { RulesDialog } from '../dialogs/RulesDialog';
import { TopNav } from '../nav/TopNav';
import { ethers } from "ethers";
import axios from 'axios';
import detectEthereumProvider from '@metamask/detect-provider';
import { MintDialog } from '../dialogs/MintDialog';
import { mintSCPlot } from '../../utils/ERCUtils';


var API_SERVER = process.env.REACT_APP_API_SERVER;

export function Landing() {
  const [ rulesDialogVisible, setRulesDialogVisible ] = useState(false);
  const [ currentProvider, setCurrentProvider ] = useState(null);
  const [ selectedAddress, setSelectedAddress ] = useState('');
  const connectWallet = () => {
    async function connectInjectProvider() {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
    }
    connectInjectProvider();
  }

  const mintNFT = (chainSelection) => {
    console.log(chainSelection);
    axios.get(`${API_SERVER}/user_coupon?address=${selectedAddress}&chain=${chainSelection}`).then(function(dataResponse) {
      const coupon = dataResponse.data;
      mintSCPlot(chainSelection, selectedAddress, coupon).then(function(transactionReceipt) {
        console.log(transactionReceipt);
      });
    });
  }

  useEffect(() => {
    async function onInit() {
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setSelectedAddress(account);
      getWhitelistData(account);
      window.ethereum.on('accountsChanged', function (accounts) {
        getWhitelistData(account);
      });
      window.ethereum.on("chainChanged", (chainId) => {
        /* do what you want here */
        /* full refresh is recommended */
      });      
    }
    onInit();
  }, []);

  const getWhitelistData = (currentAddress) => {
    console.log(currentAddress);
    if (currentAddress) {
      axios.get(`${API_SERVER}/address_whitelist?address=${currentAddress}`)
      .then(function(dataResponse) {
        console.log(dataResponse.data);
      });
    }
  }

  useEffect(() => {
    if (currentProvider && currentProvider.selectedAddress) {
      const currentAddress = currentProvider.selectedAddress;
      console.log(currentAddress);

    }
  }, [currentProvider]);

  const hideRulesDialog = () => {
    setRulesDialogVisible(false); 
  }

  const showRulesDialog = () => {
    setRulesDialogVisible(true); 
  }

  return (
      <Container>
        <TopNav />
        <RulesDialog
          connectWallet={connectWallet}
          onClose={hideRulesDialog}
          show={rulesDialogVisible}
        />
        <MintDialog show={true} mintNFT={mintNFT}/>
      </Container>
    )
}