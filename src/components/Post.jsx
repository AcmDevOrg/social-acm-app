'use client'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Icons from './Icons';
import Image from 'next/image';

export default function Post({ post }) {
  return (
    <div className='flex p-3 border-b border-gray-200 w-full hover:bg-gray-50'>
      <Link href={`/users/${post?.username}`}>
      <Image
        width={50}
        height={50}
        src={post?.profileImg}
        alt='user-img'
        className='h-11 w-11 rounded-full mr-4'
        />
      </Link>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-xs truncate max-w-32'>
              {post?.name}              
            </h4>
            <span className='text-xs truncate max-w-32'>@{post?.username}</span>
            {/* add dot space here */}
            <span className='text-xl text-gray-500'>╗</span>
            <span className='text-xs text-gray-500 flex-1 truncate max-w-32'>
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
          <HiOutlineDotsHorizontal className='text-sm' />
        </div>
        <Link href={`/posts/${post?._id}`}>
        <p className='text-gray-800 text-sm my-3 w-full'>{post?.text}</p>
        </Link>
        <Link href={`/posts/${post?._id}`}>
          <img           
          alt='' 
          src={post?.image} 
          className='rounded-2xl mr-2' />
        </Link>
        <Icons post={post} id={post._id} />
      </div>
      </div>
  );
}
