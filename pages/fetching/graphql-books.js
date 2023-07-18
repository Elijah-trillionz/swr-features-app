import request from 'graphql-request';
import useSWR from 'swr';
import { graphQLAPI } from '../../utils';

const graphQLFetcher = (query) => request(`${graphQLAPI}/graphql`, query);

const Books = () => {
  const {
    data,
    error: isError,
    loading: isLoading,
  } = useSWR(
    `
      {
        books {
          name
          id
          author {
            name
          }
        }
      }
    `,
    graphQLFetcher
  );

  if (isError) return <div>Error loading books</div>;

  return (
    <>
      <header className='p-7 text-center bg-primary shadow-md'>
        <h1 className='text-secondary font-bold text-xl'>Books App</h1>
      </header>
      <main className='max-w-[1100px] mx-auto mt-10 pb-10 px-4'>
        {isLoading ? (
          <p className='text-secondary'>Loading books</p>
        ) : (
          <>
            <ul className='grid grid-cols-3 gap-x-3 gap-y-3'>
              {data?.books.map((book) => (
                <li
                  className='bg-primary p-10 rounded-lg shadow-md'
                  key={book.id}
                >
                  <span className='block mb-4 font-bold text-lg text-secondary capitalize'>
                    {book.name}
                  </span>
                  <span className='text-secondary'>
                    Written by {book.author.name}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
};

export default Books;
