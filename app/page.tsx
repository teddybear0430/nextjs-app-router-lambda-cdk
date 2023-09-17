import Link from 'next/link';

export default function Page() {
  const MENU_LIST: Record<'text' | 'path', string>[] = [
    { text: 'sample page', path: '/sample' },
    { text: 'news app page', path: '/news' },
  ];

  return (
    <div>
      <h1 className="text-3xl">Menu</h1>
      <ul className="mt-2 list-disc">
        {MENU_LIST.map((menuItem) => (
          <li key={menuItem.path}>
            <Link href={menuItem.path}>{menuItem.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
