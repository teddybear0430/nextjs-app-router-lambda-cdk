import Link from 'next/link';
import { Cms } from '../../../types/cms';

export default async function Page() {
  const res = await fetch(`https://karukichi-tech-blog.microcms.io/api/v1/blogs`, {
    headers: { 'X-API-KEY': process.env.CMS_API_KEY || '' },
  });
  const json = (await res.json()) as Cms;
  const contents = json.contents;

  return (
    <div>
      <h1 className="text-3xl">blog</h1>
      <ul>
        {contents.map((post) => (
          <li key={post.id} className="py-1">
            <Link href={`/blog/isr/${post.id}`} className="text-blue-500 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
