import React, { useState, useEffect, } from 'react';
import { Container } from '@chakra-ui/react'
import { RulesDialog } from '../dialogs/RulesDialog';
import { TopNav } from '../nav/TopNav';
import { ethers } from "ethers";

export function Landing() {
    const [ rulesDialogVisible, setRulesDialogVisible ] = useState(false);
    const [ currentProvider, setCurrentProvider ] = useState(null);
    const connectWallet = () => {
        async function connectInjectProvider() {
            // A Web3Provider wraps a standard Web3 provider, which is
            // what MetaMask injects as window.ethereum into each page
            const provider = new ethers.providers.Web3Provider(window.ethereum)

            // MetaMask requires requesting permission to connect users accounts
            await provider.send("eth_requestAccounts", []);

            // The MetaMask plugin also allows signing transactions to
            // send ether and pay to change state within the blockchain.
            // For this, you need the account signer...
            const signer = provider.getSigner();
        }
        connectInjectProvider();
    }

    useEffect(() => {
        if (window.web3 && window.web3.currentProvider) {
           setCurrentProvider(window.web3.currentProvider);
        }
    }, []);

    const hideRulesDialog = () => {
       setRulesDialogVisible(false); 
    }

    const showRulesDialog = () => {
        setRulesDialogVisible(true); 
    }

    return (
        <Container>
            <TopNav/>
            <RulesDialog
                connectWallet={connectWallet}
                onClose={hideRulesDialog}
                show={rulesDialogVisible}
            />
        </Container>
    )
}