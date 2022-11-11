import React, { useState } from 'react';
import bnb from '../imgs/bnb.svg';
import ftm from '../imgs/ftm.svg';
import polygon from '../imgs/p3.webp';

const tokenList = [
  {
    name: 'BSC',
    symbol: 'bnb',
    minted: '200',
    img: bnb,
  },
  {
    name: 'Fantom',
    symbol: 'ftm',
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
  const { mintNFT, hideDialog } = props;
  const [selectedChain, setSelectedChain ] = useState('bsc');
  const sendMintNftRequest = () => {
    hideDialog();
    mintNFT(selectedChain);
  }
  let eligibiltyBsc = "Not Eligible";

  const tokenCellCols = tokenList.map(function(tl) {
    return (
      <PartnerIconCell tokenData={tl} key={`partner_row_${tl.symbol}`} />
    )
  });

  return (
  <div class="hidden relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden
         rounded-lg bg-white text-left shadow-xl transition-all
          sm:my-8 sm:w-full sm:max-w-lg p-2">
          <h3 class="text-lg font-medium leading-6 text-gray-900 pb-4" id="modal-title">
            Check your eligibility to mint on one of the chains.
          </h3>
          <div class="flex flex-row">
            {tokenCellCols}
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button"
              class="mt-3 inline-flex w-full justify-center
              rounded-md border border-gray-300 bg-white px-4 py-2
              text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50
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
  const { tokenData, } = props;
  let rowState = `opacity-75`;
  if (tokenData.rowState === 'enabled') {
    rowState = `hover:border-gray-400 opacity-100`;
  }
  return (
    <div class={`basis-1/3  ${rowState}`}>
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