import type { Metadata } from 'next';
import { Nav } from '../../components/news/Nav';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="lg:flex block gap-8">
      <Nav />
      <div>{children}</div>
    </section>
  );
}