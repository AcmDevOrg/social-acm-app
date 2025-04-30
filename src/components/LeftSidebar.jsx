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

export default function LeftSidebar() {
  return (
    <div className='flex flex-col p-3 justify-between h-screen items-center'>
      <div className='flex flex-col gap-4 p-3'>
        <Link href='/'>          
          <FaParachuteBox className='w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200' />
        </Link>
        <Link
          href='/'
          className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'
        >
          <RiHome4Fill className='w-7 h-7' />
          <span className='font-bold hidden xl:inline'>Home</span>
        </Link>        
        <div className='bg-blue-400 text-white text-xl rounded-full hover:brightness-95 transition-all duration-200 
        w-24 h-9 shadow-md xl:inline text-center p-1 font-bold'>
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
  );
}
