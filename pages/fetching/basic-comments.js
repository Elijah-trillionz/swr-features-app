import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const {
    data: comments,
    isLoading,
    isError: error,
  } = useSWR(
    'https://jsonplaceholder.typicode.com/comments?_limit=6',
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  if (error) {
    return <p className='text-secondary'>Failed to fetch</p>;
  }

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
      </main>
    </>
  );
}
