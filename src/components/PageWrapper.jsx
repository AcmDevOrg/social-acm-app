'use client';
import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import Navbar from './Navbar';

export default function PageWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex xl:flex-row flex-col min-h-screen">
      {/* <LeftSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 xl:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={toggleSidebar}>        
        {children}
        </ Navbar >
      </div>
    </div>
  );
}
