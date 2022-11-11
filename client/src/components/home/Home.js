import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

export default function Home() {
  return (
    <div class="pt-4 pb-4 pl-6 pr-6">
      <div class="flex flex-row">
        <div class="basis-1/2">
          <img 
            src={"https://sovereign-chains-meta.s3.us-east-1.amazonaws.com/000102%402x.png"}
            height="400" width="400" 
            class="m-auto"/>
        </div>
        <div class="basis-1/2">
          <div class="mt-4 flex flex-col">
            <Link to="/workstation">
            <button class="rounded-b-md  home-btn">
              Home
            </button>
            </Link>
            <Link to="/workstation">
            <button class="rounded-b-md w-80  h-120 mt-4 home-btn">
              Workstation
            </button>
            </Link>
            <Link to="/community">
            <button class="rounded-b-md w-80 	h-120 mt-4 home-btn">
              Community
            </button>
            </Link>
            <Link to="/staking">
            <button class="rounded-b-md w-80 	h-120 mt-4 home-btn">
              Staking
            </button>
            </Link>
            <Link to="/profile">
            <button class="rounded-b-md w-80 h-120 mt-4 home-btn">
              Profile
            </button>
            </Link>
            <Link to="/settings">
            <button class="rounded-b-md w-80	h-120 mt-4 home-btn">
              Settings
            </button>
            </Link>          
          </div>
      </div>
    </div>
    <div class="flex flex-row">
        <div>
          Your pending emisssions - 5.01 BSEMI
        </div>
      </div>   
  </div>
  )
}