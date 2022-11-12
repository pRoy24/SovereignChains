**Sovereign Chains**
A peer to peer marketplace for knowledge workers with tokenized incentives for participation.
People who satisfy the allowlist criteria for each chain can mint a plot on the chain. The plot emits the chain specific ERC20 token and the platform provides 
avenues for people to spend the emissions to extract useful real-life value and experiences.

This project is built in fulfillment of the [Moralis x Google hackathon](https://moralis.io/google-hackathon/) 


**Live deployments -**
Demo video-
https://www.youtube.com/watch?v=2xeCl5HcsBs

Demo UI-
http://sovereign-chains.s3-website-us-east-1.amazonaws.com/

PlotNFTContract-
Polygon, BSC, Fantom -0xD992Fe2042E342128cdd2Bfa2EDFEE7CA6f81Ebb

**Tools and Technologies used-** 
Moralis API and Streams.
GCP Compute Engine
Polygon chain
Binance Smart Chain
Fantom Chain
Covalent NFT tracking APIs
Mutichain Anycall v6
Axelar general message passing


**Projects** 
Solidity
This contains the contracts for the project. 
SCCommunityPlot.sol is the main plot contract. 

Gateway
This is the Express/NodeJS proxy router. This makes calls to Moralis and Covalent APIs. This also contains webhooks to listen to Moralis Streams.

Client
This is a ReactJS app created using cra and Tailwind css. The front-end has been tested on Metamask provider on Chrome.


Special Thanks to hackathon sponsors and partners.
Polygon, Binance Smart Chain, Fantom, Axelar, Covalent and Multichain for providing the tooling and infrastructure to make this ideation and demo prossible.