import React from 'react';
import { useHistory } from 'react-router-dom';
import './nav.scss';

export function TopNav(props) {
  const {showMintDialog, currentChain } = props;
  const history = useHistory();
  const gotoHome = () => {
    history.replace("/home");
  }
  return (
    <div class="container mx-auto ">
      <div className='top-nav-container rounded-b-md'>
      <div class="flex">
        <div class="flex-none w-80 h-14 pt-2 font-['Open_Sans'] text-neutral-50 font-bold text-2xl" onClick={gotoHome}>
          Sovereign Chains
        </div>
        <div class="grow h-14">

        </div>
        <div class="flex-none w-200 h-40 pr-10 pt-3 text-base text-neutral-50 font-medium">
        <button onClick={showMintDialog} className="
          text-white w-200 font-medium mint-nav-btn">Mint</button>

        </div>

        <div class="flex-none w-200 h-40 pr-10 pt-3 text-base text-neutral-50 font-medium">
        Connected to 0x00.....476
        </div>
      </div>  
      </div>
    </div>
  )
}