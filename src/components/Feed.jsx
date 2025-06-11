'use client'

import Post from './Post';

export default function Feed({ data }) {
  return (
    <div>
    {data && data.length > 0 ? (
      data.map((post) => (
        <Post key={post._id} post={post} />
      ))
    ) : (
      <p>No posts found.</p>
    )}
  </div>
  );
}
