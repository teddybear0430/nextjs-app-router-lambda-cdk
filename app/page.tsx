import Link from 'next/link';

export default function Home() {
  const MENU_LIST: Record<'text' | 'path', string>[] = [
    { text: 'sample page', path: '/sample' },
    { text: 'news app page', path: '/news' },
  ];

  return (
    <div>
      <h2 className="text-lg">Menu</h2>
      <ul className="list-disc">
        {MENU_LIST.map((menuItem) => (
          <li key={menuItem.path}>
            <Link href={menuItem.path}>{menuItem.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
