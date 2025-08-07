'use client';
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import News from "@/components/News";
import LeftSidebar from "@/components/LeftSidebar";

export default function ClientLayout({ children }) {
  const [showNews, setShowNews] = useState(false);
  const [articleNum, setArticleNum] = useState(5);  
  const [showLeftSidebar, setLeftSidebar] = useState(false);

  const toggleNews = () => setShowNews(prev => !prev);
  const toggleLeftSidebar = () => setLeftSidebar(prev => !prev);

  

  return (
    // <>
      <div className="block lg:hidden justify-between items-center w-full ">
        <div className='flex fixed top-0 p-2 m-2'>      
                <Navbar 
                  toggleNews={toggleNews} 
                  showNews={showNews}
                  toggleLeftSidebar={toggleLeftSidebar}
                  showLeftSidebar={showLeftSidebar}
                />
          </div>


          <div className="block lg:hidden justify-between flex-col gap-y-6">
            <div className="block lg:hidden h-auto mt-16 z-0">
              <LeftSidebar isOpen={showLeftSidebar} toggleSidebar={toggleLeftSidebar} />
            </div> 

            <div className='lg:hidden w-2xl flex items-justify'>{children}

            {/* <div className="mt-16 z-0  px-4 top-0 right-0 col-flex"> */}
            {showNews && (
                <div className="flex top-0 z-0 lg:hidden justify-end">
                  <div className={`overflow-hidden w-64 transition-all 
                  duration-1500 ease-in-out ${showNews ? 'max-h-[1000px]' : 'max-h-0'}`}>
                    <News articleNum={articleNum} setArticleNum={setArticleNum} />               
                </div> 
              </div>         
               )}
            </div>
            </div>
            </div>
            
            // </>
    );
}


