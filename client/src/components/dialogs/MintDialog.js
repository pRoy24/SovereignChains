import React, { useState } from 'react';
import bnb from '../imgs/bnb.svg';
import ftm from '../imgs/ftm.svg';
import polygon from '../imgs/p3.webp';

const tokenList = [
  {
    name: 'BSC',
    symbol: 'bsc',
    minted: '200',
    img: bnb,
  },
  {
    name: 'Fantom',
    symbol: 'fantom',
    minted: '140',
    img: ftm,
  },
  {
    name: 'Polygon',
    symbol: 'polygon',
    minted: '100',
    img: polygon,
    rowState: 'enabled'
  }
];

export function MintDialog(props) {
  const { mintNFT, hideDialog, show } = props;
  const [selectedChain, setSelectedChain ] = useState('bsc');
  const sendMintNftRequest = () => {
    hideDialog();
    mintNFT(selectedChain);
  }
  let eligibiltyBsc = "Not Eligible";

  const tokenCellCols = tokenList.map(function(tl) {
    return (
      <PartnerIconCell tokenData={tl} key={`partner_row_${tl.symbol}`} setSelectedChain={setSelectedChain}/>
    )
  });
  let dialogVisibled = `z-10 block`;
  if (show === false) {
    dialogVisibled = `z-0 hidden`;
  }

  return (
  <div class={`relative ${dialogVisibled}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden
         rounded-lg bg-stone-800 text-left text-white shadow-xl transition-all
          sm:my-8 sm:w-full sm:max-w-lg pl-4 pr-4 pt-2 pb-2">
          <h3 class="text-lg font-medium leading-6 text-neutral-100 pb-4" id="modal-title">
            Check your eligibility to mint on one of the chains.
          </h3>
          <div class="flex flex-row">
            {tokenCellCols}
          </div>
          <div class="bg-stone-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button"
              class="mt-3 inline-flex w-full justify-center
              rounded-md border border-white-300 bg-white-800 px-4 py-2
              text-base font-medium text-white-700 shadow-sm hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={sendMintNftRequest}>Mint</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

function PartnerIconCell(props) {
  const { tokenData,setSelectedChain } = props;
  let rowState = `opacity-75`;
  if (tokenData.rowState === 'enabled') {
    rowState = `hover:border-gray-400 opacity-100`;
  }
  return (
    <div class={`basis-1/3  ${rowState}`} onClick={() => setSelectedChain(tokenData.symbol)}>
    <div class="flex justify-start h-20 cursor-pointer">
      <div>
        <img src={tokenData.img} width={60} height={60} />              
      </div>
      <div class="px-2 pt-2">
        <div class="mono text-sm tracking-tight font-bold">
          {tokenData.name}
        </div>
        <div class="text-xs">
          {tokenData.minted} Minted
        </div>
      </div>
    </div>
    <div class="text-center font-semibold text-slate-600">
      Not Eligible
    </div>
  </div>
  )
}