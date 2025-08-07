import Input from '@/components/Input';
import React from 'react';
import Feed from '@/components/Feed';


export default async function Home() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  let data = [];
  try {
    const result = await fetch(`${base}/api/post/all`, {
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
    <section className="w-full min-h-screen mx-auto px-3">
      <div className='z-50 bg-white border-b border-gray-200 py-2'>
        
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
      </div>
          <div>
          { <Input />}
          <Feed data={data} />
        </div>
      </section>
  );
}
