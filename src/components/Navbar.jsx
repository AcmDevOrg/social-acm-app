'use client';
import React from "react";
import { CgMenuRound } from "react-icons/cg";
import { CgCloseR } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LeftSidebar from "./LeftSidebar";

export default function Navbar({ showNews, toggleNews, setShowNews, showLeftSidebar, toggleLeftSidebar }) {
  const [input, setInput] = useState('');
  const [ isClient, setIsClient ] = useState(false);
  const router = useRouter();

    // Client-only check to avoid hydration mismatch
    useEffect(() => {
      setIsClient(true);      
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!input.trim()) return;
      router.push(`/search/${input}`);
      setTimeout(() => {
        router.refresh();
      }, 100);
    };

    if (!isClient) return null; // prevent SSR rendering

    
  return (
    <>
      {/* Top navbar for mobile */}
      <nav className="flex lg:hidden fixed w-full top-0 left-0 z-50 px-4 py-1 bg-black text-white 
      justify-between items-center rounded-xl">
     
        <button onClick={toggleLeftSidebar}>
         
          {showLeftSidebar ? <CgCloseR className="text-2xl" /> : <CgMenuRound className="text-2xl" />}
        </button>
        

        <h1 className="text-xl6 text-purple-600  left-0">AcmMedia</h1>
            <>
            <div className='top-0  py-2 text-white'>
            <form onSubmit={handleSubmit}>
            <input 
            type='text' 
            placeholder='Search' 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className='bg-gray-400 border border-gray-500 text-black rounded-3xl text-sm w-full px-4 py-2'
            />
            </form>
            </div>
            <button className="text-sm font-semibold right-2.5 bg-green-500  rounded
            rounded-tr-full  p-2 mr-4 hover:bg-blue-500"  
             onClick={toggleNews}>
              {showNews ? 'Hide News' : 'Show News'}
            </button>              
            </>
      </nav>
      <div />
      </>
        );
        
      }
