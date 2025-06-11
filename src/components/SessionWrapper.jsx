'use client'

import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { useModalStore } from '@/store/modalStore';

export default function SessionWrapper({ children }) {
  const [posts, setPosts] = useState([]);
  const refresh = useModalStore((state) => state.refresh);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to load posts:', err);
      }
    };

    fetchPosts();
  }, [refresh]);

  return <RecoilRoot>{children}</RecoilRoot>;
}
