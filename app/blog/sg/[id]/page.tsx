import { Cms } from '../../../../types/cms';

type Props = {
  id: string;
};
type Post = {
  id: string;
  title: string;
  body: string;
};

// generateStaticParamsを使用すると、動的なページもSGで生成できる
// pages routerのgetStaticPathsの置き換え
export async function generateStaticParams() {
  const res = await fetch(`https://karukichi-tech-blog.microcms.io/api/v1/blogs`, {
    headers: { 'X-API-KEY': process.env.CMS_API_KEY || '' },
  });
  const json = (await res.json()) as Cms;
  const contents = json.contents;

  return contents.map((content) => ({
    id: content.id,
  }));
}

// generateStaticParamsの結果をページで受け取れる
export default async function Page({ params }: { params: Props }) {
  const res = await fetch(`https://karukichi-tech-blog.microcms.io/api/v1/blogs/${params.id}`, {
    headers: { 'X-API-KEY': process.env.CMS_API_KEY || '' },
  });
  const post = (await res.json()) as Post;

  return (
    <section id="post">
      <h1 className="text-3xl">{post.title}</h1>
      <div className="w-full max-w-3xl" dangerouslySetInnerHTML={{ __html: post.body }} />
    </section>
  );
}
