import { PostCard, PostsSkeleton } from '@/components';
import { getPosts } from '@/data';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <PostsSkeleton />;
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 '>
      {posts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Home;
