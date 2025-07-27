'use client';
import React from "react";
import { CgMenuRound } from "react-icons/cg";

export default function Navbar({ toggleSidebar, children }) {
  return (
    <>
      {/* Top navbar for mobile */}
      <nav className="w-full p-4 bg-black text-white flex justify-between items-center xl:hidden">
        <button onClick={toggleSidebar} className="text-2xl flex items-center gap-2">
          <CgMenuRound />
          <h1 className="text-lg font-semibold">AcmMedia</h1>
        </button>
      </nav>

      {/* Main content below navbar */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 min-h-[calc(100vh-64px)]">
        {children}
      </div>
    </>
  );
}
