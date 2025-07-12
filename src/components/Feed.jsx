import Post from './Post';

export default function Feed({ data }) {
  return (
    <div>
      {Array.isArray(data) && data.length > 0 && data.map((post) => (
         post._id ?
        <Post key={post._id} post={post} /> : null
      ))}    
  </div>
  );
}
