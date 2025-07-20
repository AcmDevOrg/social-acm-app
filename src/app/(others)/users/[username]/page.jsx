import FollowButton from '@/components/FollowButton';
import Link from 'next/link';
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi';
import Post from '@/components/Post';
import Image from 'next/image';

export default async function UserPage({ params:paramsPromise }) {
 const { username } = await paramsPromise;
 const base = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

  let data = [];
  try {
    const result = await fetch(`${base}/api/user/get`, {
      method: 'POST',
      body: JSON.stringify({ username: username }),
      cache: 'no-store',
      herders: {
        'Content-Type': 'application/json',
      },
    });
    data = await result.json();
    const userPosts = await fetch(`${base}/api/post/user/get`, {
      method: 'POST',
      body: JSON.stringify({ userId: data._id }),
      cache: 'no-store',
      herders: {
        'Content-Type': 'application/json',
      },
    });
    data.posts = await userPosts.json();
  } catch (error) {
    console.error('Failed to fetch post', error);
  }
  return (
    <div className='max-w-xl mx-auto border-r border-l min-h-screen'>
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <Link href={'/'} className='hover:bg-gray-100 rounded-full p-2'>
        <HiArrowLeft className='h-5 w-5' />
        </Link>
        <h2 className='sm:text-lg'>Back</h2>
      </div>
      {!data && <h2 className='text-center mt-5 text-lg'>User not found</h2>}
      {data && (
        <div className='flex items-center space-x-2 p-3 border-b border-gray-200'>
          <div className='p-4'>
            <div className='flex items-center space-x-4'>
              <img               
                src={data.avatar} 
                alt='Profile' 
                className='h-16 w-16 rounded-full' 
                />
                <div>
                  <h2 className='text-xl font-bold'>
                    {data.firstName + ' ' + data.lastName}
                  </h2>
                  <p className='text-gray-500'>@{data.username}</p>
                </div>
            </div>
            <div className='mt-4 flex space-x-4'>
              {data?.following &&(
              <div>
                <span className='font-bold'>{data.following.length}</span>{' '}
                Following
              </div>
              )}
              {data?.followers && (
              <div>
                <span className='font-bold'>{data.followers.length}</span>{' '}
                Followers
              </div>
              )}
            </div>
            <div className='mt-4 flex-1'>
              <FollowButton user={data} />
            </div>
          </div>
          </div>
      )}
      {data && 
      data.posts &&
      data.posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}
