import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { restAPI } from '../../utils';

const PostItem = () => {
  const {
    data: post,
    isLoading,
    error,
  } = useSWR(`${restAPI}/api/post`, (url) =>
    fetch(url).then((res) => res.json())
  );

  const {
    trigger,
    data: updatedPost,
    error: mutationError,
  } = useSWRMutation(`${restAPI}/api/post/remote`, (url) =>
    fetch(url, { method: 'put' }).then((res) => res.json())
  );

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>An error occurred</p>;
  if (mutationError) return <p>Failed to update post</p>;

  return (
    <div className='bg-primary p-10 rounded-lg shadow-md'>
      <span className='block mb-4 font-bold text-lg text-secondary capitalize'>
        {post?.title}
      </span>
      <span className='text-secondary'>{post?.body}</span>
      <p className='my-7 text-secondary'>
        <strong>Views: </strong>
        {updatedPost ? updatedPost.views : post?.views}
      </p>
      <button
        className={`block mt-3 rounded-md border-2 border-secondary border-solid text-secondary bg-primary font-bold py-2 px-5`}
        onClick={() => trigger()}
      >
        Update views
      </button>
    </div>
  );
};

export default PostItem;
