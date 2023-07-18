import Link from "next/link";

export default function Home() {
  return (
    <div className="px-3">
      <h2 className="font-bold mt-4 text-2xl">
        Navigate to the different pages of this app
      </h2>
      <Link
        href="/fetching/basic-comments"
        className="underline block my-4 pl-3"
      >
        Navigate to Basic Comments
      </Link>
      <Link
        href="/fetching/conditional-comments"
        className="underline block my-4 pl-3"
      >
        Navigate to Conditional Comments
      </Link>
      <Link
        href="/fetching/error-comments"
        className="underline block my-4 pl-3"
      >
        Navigate to Error Comments
      </Link>
      <Link
        href="/fetching/graphql-books"
        className="underline block my-4 pl-3"
      >
        Navigate to fetch/GraphQL Books
      </Link>
      <Link
        href="/fetching/infinite-loading-comments"
        className="underline block my-4 pl-3"
      >
        Navigate to Infinite loading Comments
      </Link>
      <Link
        href="/fetching/numbered-pagination-comments"
        className="underline block my-4 pl-3"
      >
        Navigate to Numbered Pagination Comments
      </Link>
      <Link href="/fetching/isg-posts" className="underline block my-4 pl-3">
        Navigate to ISG Posts
      </Link>
      <Link href="/fetching/ssg-posts" className="underline block my-4 pl-3">
        Navigate to SSG Posts
      </Link>
      <Link href="/fetching/ssr-posts" className="underline block my-4 pl-3">
        Navigate to SSR Posts
      </Link>
      <Link
        href="/mutations/graphql-books"
        className="underline block my-4 pl-3"
      >
        Navigate to mutations/GraphQL Books
      </Link>
      <Link href="/mutations/posts" className="underline block my-4 pl-3">
        Navigate to Posts
      </Link>
      <Link href="/mutation/posts-before" className="underline block my-4 pl-3">
        Navigate to Posts Before
      </Link>
      <Link
        href="/mutations/remote-posts"
        className="underline block my-4 pl-3"
      >
        Navigate to Remote Posts
      </Link>

      <p>
        This is a fully functional and interactive app showing examples of using
        SWR features
      </p>
      <p>Built by Elijah, tailored with Next.js and styled with Tailwind</p>
    </div>
  );
}
