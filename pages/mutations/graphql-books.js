import request from 'graphql-request';
import { useState } from 'react';
import useSWR from 'swr';
import { graphQLAPI } from '../../utils';

const graphQLFetcher = (query) => request(`${graphQLAPI}/graphql`, query);

const Books = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [authorId, setAuthorId] = useState(0);

  const {
    data,
    error: isError,
    loading: isLoading,
    mutate,
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
    graphQLFetcher,
    { revalidateIfStale: false }
  );
  const { data: authors } = useSWR(
    `
      {
        authors {
          name
          id
        }
      }
    `,
    graphQLFetcher,
    { revalidateIfStale: false }
  );

  const addBook = async () => {
    const createNewBook = async () => {
      const mutateQuery = `
        mutation {
          addBook (name: "${bookTitle}", authorId: ${authorId}) {
            name
            id
            author {
              name
            }
          }
        }
      `;
      return await request(`${graphQLAPI}/graphql`, mutateQuery);
    };
    // we want to make sure the mutate function does not trigger a revalidation
    mutate(createNewBook, {
      populateCache: (newBook, data) => {
        return { books: [...data.books, newBook.addBook] };
      },
      revalidate: false,
    });
  };

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
              {data?.books.map((book, index) => (
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
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder='Enter book title'
                  name='book-title'
                  className='block'
                />
                <select onChange={(e) => setAuthorId(e.target.value)}>
                  <option>Select author</option>
                  {authors?.authors.map((author) => (
                    <option value={author.id} key={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
                <button
                  type='submit'
                  className='block bg-primary p-5 text-secondary rounded-lg shadow-md'
                  onClick={addBook}
                >
                  Add book
                </button>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Books;
