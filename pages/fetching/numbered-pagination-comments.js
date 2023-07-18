import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const [pageIndex, setPageIndex] = useState(1);
  const { data: comments, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/comments?_page=${pageIndex}&_limit=6`,
    fetcher
  );

  return (
    <>
      <header className='p-7 text-center bg-primary shadow-md'>
        <h1 className='text-secondary font-bold text-xl'>Comments App</h1>
      </header>
      <main className='max-w-[1100px] mx-auto mt-10 pb-10 px-4'>
        {isLoading ? (
          <p className='text-secondary'>Loading comments</p>
        ) : (
          <ul className='grid grid-cols-3 gap-x-3 gap-y-3'>
            {comments.map((comment, index) => (
              <li className='bg-primary p-10 rounded-lg shadow-md' key={index}>
                <span className='block mb-4 font-bold text-lg text-secondary capitalize'>
                  {comment.name}
                </span>
                <span className='text-secondary'>{comment.body}</span>
              </li>
            ))}
          </ul>
        )}
        <div className='max-w-[600px] mx-auto my-10 grid grid-cols-2 gap-x-3'>
          <button
            className='block rounded-md border-2 border-secondary border-solid text-secondary bg-primary font-bold py-2 px-5'
            onClick={() => setPageIndex((_currentPage) => _currentPage - 1)}
          >
            Prev
          </button>
          <button
            className='block rounded-md border-2 border-secondary border-solid text-secondary bg-primary font-bold py-2 px-5'
            onClick={() => setPageIndex((_currentPage) => _currentPage + 1)}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}
