import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { restAPI } from '../../utils';

const Posts = () => {
  const {
    data: posts,
    isLoading,
    error: isError,
    mutate,
  } = useSWR(`${restAPI}/api/posts`, (url) =>
    fetch(url).then((res) => res.json())
  );

  const [displayForm, setDisplayForm] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  if (isError) return <div>Error loading posts</div>;

  const addPost = async () => {
    if (!postTitle || !postBody) return;

    const addNewPost = async () => {
      const res = await fetch(`${restAPI}/api/post/new`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          title: postTitle,
          body: postBody,
          id: posts.length + 1,
        }),
      });

      return await res.json();
    };
    mutate(addNewPost, {
      populateCache: (newPost, posts) => {
        return [...posts, newPost];
      },
      revalidate: false,
    });
  };

  return (
    <>
      <header className='p-7 text-center bg-primary shadow-md'>
        <h1 className='text-secondary font-bold text-xl'>Posts App</h1>
      </header>
      <main className='max-w-[1100px] mx-auto mt-10 pb-10 px-4'>
        {isLoading ? (
          <p className='text-secondary'>Loading posts</p>
        ) : (
          <>
            <ul className='grid grid-cols-3 gap-x-3 gap-y-3'>
              {posts.map((post, index) => (
                <li
                  className='bg-primary p-10 rounded-lg shadow-md'
                  key={post.id}
                >
                  <span className='block mb-4 font-bold text-lg text-secondary capitalize'>
                    {post.title}
                  </span>
                  <span className='text-secondary'>{post.body}</span>
                </li>
              ))}
              <button
                className='bg-primary p-10 rounded-lg shadow-md'
                onClick={() => setDisplayForm(true)}
              >
                <span className='block mb-4 font-bold text-lg text-secondary'>
                  add new +
                </span>
              </button>
            </ul>
            {displayForm && (
              <>
                <input
                  type='text'
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder='Enter post title'
                  name='post-title'
                  className='block'
                />
                <input
                  type='text'
                  onChange={(e) => setPostBody(e.target.value)}
                  placeholder='Enter post body'
                  name='post-body'
                  className='block'
                />
                <button
                  type='submit'
                  className='block bg-primary p-5 text-secondary rounded-lg shadow-md'
                  onClick={addPost}
                >
                  Add post
                </button>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Posts;
