import Link from 'next/link';
import { FC } from 'react';
import { LinkObjList } from '../../types/linkObjList';

export const Nav: FC = () => {
  const TOPICS: LinkObjList = [
    {
      path: '/news',
      text: 'Top stories',
    },
    {
      path: '/news/business',
      text: 'Business',
    },
    {
      path: '/news/technology',
      text: 'Techonology',
    },
    {
      path: '/news/sports',
      text: 'Sports',
    },
    {
      path: '/news/science',
      text: 'Science',
    },
    {
      path: '/news/general',
      text: 'general',
    },
  ];

  return (
    <nav className="lg:w-60 w-full">
      <h2 className="text-2xl">Nav</h2>
      <ul className="mt-2">
        {TOPICS.map((topic, index) => (
          <li className="leading-8 hover:text-blue-300 hover:underline" key={index}>
            <Link href={`${topic.path}`}>
              <span>{topic.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
