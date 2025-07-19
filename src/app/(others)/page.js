import Input from '@/components/Input';
import React from 'react';
import Feed from '@/components/Feed';

export default async function Home() {
  let data = [];
  try {
    const result = await fetch(process.env.URL + '/api/post/all', {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(result.ok){
    data = await result.json();
    } else {
    const errText = await result.text();
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  return (
    <div className='min-h-screen max-w-xl mx-auto border-r border-l'>
      <div className='py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
      </div>
      { <Input />}
      <Feed data={data} />
     </div>
  );
}
