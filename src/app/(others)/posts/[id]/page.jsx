import Comments from '@/components/Comments';
import Post from '@/components/Post';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';

export default async function PostPage({ params: paramsPromise }) {
  const { id } = await paramsPromise;
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  let data = [];
  try {
    const result = await fetch(`${base}/api/post/get`, {
      method: 'POST',
      body: JSON.stringify({ postId: id }),
      cache: 'no-store',
    })
    if (!result.ok) throw new Error(await result.text());
    data = await result.json();
  } catch (error) {
    console.log('Error getting post:', error);
    data = { text: 'Failed to load post' };
  }

  return (
    <div className='max-w-xl mx-auto border-r border-l min-h-screen'>
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <Link href={'/'} className='hover:bg-gray-100 rounded-full p-2'>
          <HiArrowLeft className='h-5 w-5' />
        </Link>
        <h2 className='sm:text-lg'>Back</h2>
      </div>
      {!data && <h2 className='text-center mt-5 text-lg'>Post not found</h2>}
      {data && <Post post={data} />}
      {data && <Comments comments={data.comments} />}
    </div>
  );
}
