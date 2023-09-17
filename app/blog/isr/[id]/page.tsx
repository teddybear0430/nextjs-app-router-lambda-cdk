type Props = {
  id: string;
};
type Post = {
  id: string;
  title: string;
  body: string;
};

async function getPost(params: Props) {
  const res = await fetch(`https://karukichi-tech-blog.microcms.io/api/v1/blogs/${params.id}`, {
    headers: { 'X-API-KEY': process.env.CMS_API_KEY || '' },
    // ISR
    // 1, 初回アクセス時にHTMLを生成してキャッシュを生成する（挙動はSSR）
    // 2, revalidateで指定した期間内はキャッシュを返却する
    // 3, revalidateで指定した期間が経過したら、キャッシュを古くなったとみなす。
    // 一旦はキャッシュされたHTMLを返却するが、次のリクエストでキャッシュを破棄して、新しく生成したキャッシュを返却する。
    next: { revalidate: 20 },
  });
  const json = (await res.json()) as Post;
  const time = new Date().toLocaleString();

  console.log('=====================================');
  console.log(time);
  console.log(json);
  console.log('=====================================');

  return {
    time,
    post: json,
  };
}

export default async function Page({ params }: { params: Props }) {
  const res = await getPost(params);
  const { time, post } = res;

  return (
    <section id="post">
      <p className="mb-4">{time}</p>
      <h1 className="text-3xl">{post.title}</h1>
      <div className="w-full max-w-3xl" dangerouslySetInnerHTML={{ __html: post.body }} />
    </section>
  );
}
