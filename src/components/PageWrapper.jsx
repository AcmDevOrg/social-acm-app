// 'use client';
// import React, { useState } from 'react';
// import LeftSidebar from './LeftSidebar';
// import Navbar from './Navbar';
// import News from './News';

// export default function PageWrapper({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const [showNews, setShowNews] = useState(false);
//   const [articleNum, setArticleNum] = useState(5);


//   return (
//     <div className="flex flex-col min-h-screen">
      
//       {/* ✅ Desktop sidebar - always visible on xl and above */}
//       <div className="hidden xl:flex">
//         <LeftSidebar />
//       </div>

//       {/* ✅ Mobile sidebar - toggled */}
//       <div className="xl:hidden fixed top-0 left-0 z-50 w-[30%]">
//         {sidebarOpen && (
//           <LeftSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//         )}
//       </div>

//       {/* ✅ Main content area */}
//         <div className="flex flex-col min-h-screen">
//           <Navbar 
//             showNews={showNews}
//             toggleNews={() => setShowNews(prev => !prev)}
//           />
//           {showNews && (
//             <div className="p-4">
//               <News articleNum={articleNum} setArticleNum={setArticleNum} />
//             </div>
//           )};

//       <main className='top-0'>
//         {children}
//       </main>
//     </div>
//     </div>
//   );
// }
