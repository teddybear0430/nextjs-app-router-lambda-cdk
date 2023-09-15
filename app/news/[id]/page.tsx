import { Articles } from '../../../components/news/Articles';

type Props = {
  id: string;
};

async function getPost(params: Props) {
  const API = process.env.API_KEY;

  const res = await fetch(`https://newsapi.org/v2/top-headlines?country=jp&category=${params.id}&apiKey=${API}`);
  const json = await res.json();
  const articles = await json?.articles;

  return articles;
}

export default async function NewsTopic({ params }: { params: Props }) {
  const articles = await getPost(params);

  return (
    <section>
      <h1 className="text-3xl">{params.id}: news sample app</h1>
      <Articles articles={articles} />
    </section>
  );
}
