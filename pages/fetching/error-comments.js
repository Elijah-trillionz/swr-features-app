import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorRes = await res.json();

    const error = new Error();
    error.info = errorRes;
    error.status = res.status;
    error.message = 'An error occurred while fetching data';
    throw error;
  }
  return await res.json();
};

function Comments() {
  const {
    data: comments,
    isLoading,
    error,
  } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/commentes?_limit=6`,
    fetcher
  );

  if (error) console.log(error.info);

  return (
    <>
      <header className='p-7 text-center bg-primary shadow-md'>
        <h1 className='text-secondary font-bold text-xl'>Comments App</h1>
      </header>
      <main className='max-w-[1100px] mx-auto mt-10 pb-10 px-4'>
        {error?.status && (
          <>
            <h2 className='text-lg'>
              A {error.status} error occurred, see details below
            </h2>
            <p>{error.message}</p>
          </>
        )}
        {isLoading ? (
          <p className='text-secondary'>Loading comments</p>
        ) : (
          <ul className='grid grid-cols-3 gap-x-3 gap-y-3'>
            {comments?.map((comment, index) => (
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

export default Comments;
