import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

export default function TokenStation() {
  const gotoHome = () => {
    console.log("HERE");
    //history.replace("/home");
  }  
  return (
    <div className="text-white p-4 pl-10 text-left">
    
       <div>
          Your pending emissions 10.1 
        </div> 
        <div>
          Your community
        </div>
        <div>
          <div className='mt-2'>
          Switch to a different community. 
          <div className='text-xs'>(Switching burns your current plot NFT and mints you a new one on new chain)</div>
          <div className='mt-2'>
            You are eligible
          </div>
          <div className='flex flex-row mt-2'>

            <button className='row-page-btn'>
              BSC
            </button>

            <button className='row-page-btn'>
              Fantom
            </button>
            <button className='row-page-btn'>
              Polygon
            </button>               
          </div>
          <div>

          </div>
          </div>
        </div> 

    </div>
  )
}