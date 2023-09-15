import { Articles } from '../../../components/news/Articles';

type Props = {
  id: string;
};

async function getPost(params: Props) {
  const API = process.env.API_KEY;
  const topicRes = await fetch(`https://newsapi.org/v2/top-headlines?country=jp&category=${params.id}&apiKey=${API}`);
  const topicJson = await topicRes.json();

  const topicArticles = await topicJson.articles;

  return topicArticles;
}

export default async function NewsTopic({ params }: { params: Props }) {
  const title = await getPost(params);
  return (
    <div>
      <Articles articles={title} />
    </div>
  );
}
