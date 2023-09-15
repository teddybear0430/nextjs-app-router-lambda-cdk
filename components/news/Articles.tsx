import { FC } from 'react';

type Props = {
  articles: {
    author: string;
    title: string;
    publishedAt: string;
    url: string;
    urlToImage: string;
  }[];
};

export const Articles: FC<Props> = ({ articles }) => {
  return (
    <div className="mt-2">
      {articles.map((article) => {
        const time = new Date(article.publishedAt).toLocaleString();

        return (
          <a className="block my-8 hover:opacity-60" href={article.url} key={article.title}>
            <div className="flex">
              {article.urlToImage && (
                <div key={article.title} className="inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={article.urlToImage} alt={`${article.title} image`} className="w-24 h-24 object-cover" />
                </div>
              )}
              <div className="ml-4">
                <h2>{article.title}</h2>
                <p>{time}</p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};
