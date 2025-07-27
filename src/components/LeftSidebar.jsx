import React from 'react';
import { FaParachuteBox } from 'react-icons/fa';
import { RiHome4Fill } from 'react-icons/ri';
import Link from 'next/link';
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  SignOutButton,
} from '@clerk/nextjs';
import MiniProfile from './MiniProfile';
import { FaWindowClose } from "react-icons/fa";


export default function LeftSidebar({isOpen, toggleSidebar}) {
  return (
    <div
      className={`fixed top-0 left-0 z-50 bg-white w-64 h-full shadow-md transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        xl:translate-x-0 xl:static xl:flex
      `}
    >
    <div className='flex flex-col justify-between h-full p-4'>
      
        {/* Close button for mobile */}
          <button
            className="text-xl mb-4 self-end xl:hidden"
            onClick={toggleSidebar}
          >
            <FaWindowClose  className='rounded-pill'/>
          </button>
          <div className='flex flex-col gap-4 p-3'>
        <Link href='/'>          
          <FaParachuteBox className='w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200' />
        </Link>
        <Link
          href='/'
          className='flex flex-initial items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'
        >
          <RiHome4Fill className='w-7 h-7' />
          <span className='font-bold hidden xl:inline'>Home</span>
        </Link>        
        <div className='bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-38 h-9 shadow-md hidden xl:inline text-center p-1 font-bold'>
          <SignedIn>
           <SignOutButton />
          </SignedIn>          
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
      <SignedIn>
      <MiniProfile />
      </SignedIn>
    </div>
    </div>
  );
}
