'use client';

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { HiX } from 'react-icons/hi';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modalStore';


export default function CommentModal() {
  const {isOpen, setOpen, postId, setPostId } = useModalStore();  
  const [post, setPost] = useState({});
  const [postLoading, setPostLoading] = useState(false);
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isLoaded } = useUser();
  const router = useRouter();
  

  
useEffect(() => {
  // run only when a post id is present & modal is open
  if (!postId || !isOpen) return;

  const fetchPost = async () => {
    setPostLoading(true);
    try {
      const res = await fetch('/api/post/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
        cache: 'no-store',
      });

      // 1️⃣ guard against empty / non‑json responses
      const isJson = res.headers
        .get('content-type')
        ?.includes('application/json');

      if (!res.ok || !isJson) {
        console.error('Failed to fetch post', res.status);
        return;
      }

      const postData = await res.json();
      setPost(postData);
    } catch (err) {
      console.error('Fetch error', err);
    } finally {
      setPostLoading(false);
    }
  };

  fetchPost();
}, [postId, isOpen]);          // 2️⃣ include isOpen in deps

if (!isLoaded) return null;

  const sendComment = async () => {
    if (!user || isSubmitting) {
      return router.push('/sign-in');
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/post/comment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          comment: input,
          user: user.publicMetadata.userMongoId,
          name: user.name,
          username: user.username,
          profileImg: user.imageUrl,
        }),
      });
      if (res.ok) {
        setInput('');
        setOpen(false);
        setPostId('');
        router.push(`/posts/${postId}`);
      } else {
        console.error('Comment failed', await res.text());
      } 
    } catch(err) {
      console.error('Network error', err);
    } finally {
      setIsSubmitting(false);
    }
  };
    

  return (
    <div>
      {isOpen && (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        setOpen(false);
        setPostId('');
      }}
      ariaHideApp={false}
      className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md'
    >
      <div className='p-4'>
        <div className='border-b border-gray-200 py-2 px-1.5'>
          <HiX 
          className='text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer' 
          onClick={() => {
            setOpen(false);
            setPostId('');
          }}
          />
        </div>
        <div className='p-2 flex items-center space-x-1 relative'>
          <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300' />
          <img 
          src={
            postLoading 
            ? 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg' 
            : post?.profileImg
          } 
            alt='user-img' 
            className='h-11 w-11 rounded-full mr-4' 
            />
          <h4 className='font-bold sm:text-[16px] text-[15px] hover:underline truncate'>
           {postLoading ? 'Name' : post.name}
          </h4>
          <span className='text-sm sm:text-[15px] truncate'>
            @{postLoading ? 'username' : post.username}
            </span>
        </div>
        <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2'>
          {postLoading ? 'Loading...' : post.text}
          </p>
        <div className='flex p-3 space-x-3'>
          <img          
           src={user.imageUrl} 
           alt='user-img' 
           className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95' 
           /> 
          <div className='w-full divide-y divide-gray-200'>
            <div>
              <textarea
                className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 placeholder:text-gray-500'
                placeholder='Reply to this...'
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className='flex items-center justify-end pt-2.5'>
              <button
                className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                disabled={input.trim() === '' || postLoading || isSubmitting}
                onClick={sendComment}
              >
                {isSubmitting ? 'Sending...' : 'Reply'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    )};
    </div>
  );
}
