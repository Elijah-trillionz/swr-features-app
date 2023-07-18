import useSWR, { SWRConfig } from 'swr';
import { restAPI } from '../../utils';

const url = `${restAPI}/api/post`;

const Post = () => {
  const { data: post, mutate } = useSWR(url, (url) =>
    fetch(url).then((res) => res.json())
  );

  return (
    <>
      <header className='p-7 text-center bg-primary shadow-md'>
        <h1 className='text-secondary font-bold text-xl capitalize'>
          Reading: {post.title}
        </h1>
      </header>
      <main className='max-w-[1100px] mx-auto mt-10 pb-10 px-4'>
        <div className='bg-primary p-10 rounded-lg shadow-md' key={post.id}>
          <span className='block mb-4 font-bold text-lg text-secondary capitalize'>
            {post.title}
          </span>
          <span className='text-secondary'>{post.body}</span>
          <p className='text-secondary mt-5'>
            <strong>Views</strong>: {post.views}
          </p>
        </div>
        <button
          onClick={async () => {
            await fetch(url, {
              method: 'put',
            });
            mutate();
          }}
        >
          Increment views
        </button>
      </main>
    </>
  );
};

const Index = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Post />
    </SWRConfig>
  );
};

export default Index;

export async function getStaticProps() {
  const res = await fetch(url);
  const post = await res.json();

  return {
    props: {
      fallback: {
        [url]: post,
      },
    },
    revalidate: 10,
  };
}
