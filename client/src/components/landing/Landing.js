import React, { useState, useEffect, } from 'react';
import { Container } from '@chakra-ui/react'
import { RulesDialog } from '../dialogs/RulesDialog';
import { TopNav } from '../nav/TopNav';
import { ethers } from "ethers";
import axios from 'axios';
import detectEthereumProvider from '@metamask/detect-provider';
import { MintDialog } from '../dialogs/MintDialog';
import { LandingPanaroma } from './LandingPanaroma';
import { mintSCPlot } from '../../utils/ERCUtils';
import './landing.scss';
import {
  useHistory,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from '../home/Home';
import TokenStation from '../community/TokenStation';
import WorkStation from '../community/WorkStation';

var API_SERVER = process.env.REACT_APP_API_SERVER;

export function Landing() {
  const { history } = useHistory();
  const [ rulesDialogVisible, setRulesDialogVisible ] = useState(false);
  const [ mintDialogVisible, setMintDialogVisible ] = useState(false);
  const [ currentProvider, setCurrentProvider ] = useState(null);
  const [ selectedAddress, setSelectedAddress ] = useState('');
  const [ mintedPlots, setMintedPlots ] = useState([]);
  const [ setNFTMinted, setNftMinted ] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState([]);
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
    axios.get(`${API_SERVER}/user_coupon?address=${selectedAddress}&chain=${chainSelection}`)
      .then(function(dataResponse) {
      axios.get(`${API_SERVER}/upload_meta`).then(function(uploadMetaResponse) { 
        const coupon = dataResponse.data;
        console.log(coupon);
        mintSCPlot(chainSelection, selectedAddress, coupon).then(function(transactionReceipt) {
          console.log(transactionReceipt);
          hideMintNFTDialog();
          setNFTMinted(true);
          //history.replace("/home");
        });
      }); 
    });
  }



  useEffect(() => {
    axios.get(`${API_SERVER}/nft_mints`).then(function(nftMintData) {
      const dataRes = nftMintData.data;
      setMintedPlots(dataRes);
    });

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

  useEffect(() => {
    // Fetch user nft and token data
    if (selectedAddress) {
      axios.get(`${API_SERVER}/user_portfolio?address=${selectedAddress}`).then(function(userPortfolioResponse) {
        console.log(userPortfolioResponse.data);
        setUserPortfolio(userPortfolioResponse.data);
      })
      
    }
  }, [selectedAddress]);

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
  const hideMintNFTDialog = () => {
    setMintDialogVisible(false);
  }
  const showMintNFTDialog = () => {
    setMintDialogVisible(true);
  }

  return (
      <div class="container m-auto">
          <TopNav showMintDialog={showMintNFTDialog}/>
          <RulesDialog
            connectWallet={connectWallet}
            onClose={hideRulesDialog}
            show={false}
          />
          <MintDialog
            show={mintDialogVisible} mintNFT={mintNFT}
            hideDialog={hideMintNFTDialog}/>
          <div class="container mx-auto landing-container min-h-screen mt-20 m-auto">
            <Switch>
              <Route exact path="/">
                <LandingPanaroma mintedPlots={mintedPlots} />
              </Route>
              <Route path="/home">
                <Home userPortfolio={userPortfolio}/>
              </Route>
              <Route path="/community">
                <TokenStation />
              </Route>
              <Route path="/workstation">
                <WorkStation />
              </Route>
            </Switch>
          </div>
     
      </div>
    )
}