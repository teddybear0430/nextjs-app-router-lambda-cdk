import Link from 'next/link';
import { Cms } from '../../types/cms';

export default async function Page() {
  const MENU_LIST: Record<'text' | 'path', string>[] = [{ text: 'isr', path: '/blog/isr' }];

  return (
    <div>
      <h1 className="text-3xl">blog menu</h1>
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
