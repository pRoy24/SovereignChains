import React from 'react';
import { getChainById } from '../../utils/Constants';


export function LandingPanaroma(props) {
  const {mintedPlots} = props;

  if (mintedPlots.length === 0) {
    return <span />;
  }
  const filteredPlots = mintedPlots.filter(function(item) {
    if (item.external_data) {
      return item;
    }
  });
  return (
    <div class="grid grid-cols-4 gap-4">
    {filteredPlots.map(function(item, idx) {
      const chain = getChainById(item.chain_id);
      if (!item.external_data) {
        return <span/>;
      }
      return (
        <div className="mt-4 p-4">
          <div className='relative'>
            <img src={item.external_data.image} className="nft-obj-img shadow-lg shadow-green-500/50 m-auto"/>
            <div className='absolute bottom-0 h-10 bg-neutral-800 w-full opacity-80 text-white'>
              Minted on: {chain}
             </div> 
          </div>
        </div>
      )
    })}
    </div>
  )
}