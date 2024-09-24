import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { SidebarNav } from '@/components/sidebar-nav';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'march',
  description: 'assignment for march (dot) cat',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head></head>
      <body>
        <div className='hidden space-y-6 p-10 pb-16 md:block'>
          <div className='space-y-0.5'>
            <h2 className='text-2xl font-bold tracking-tight'>march</h2>
            <p className='text-muted-foreground'>
              CRUD operations assignment for march (dot) cat
            </p>
          </div>
          <Separator className='my-6' />
          <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <aside className='-mx-4 lg:w-1/5'>
              <SidebarNav
                items={[
                  { title: 'posts', href: '/posts' },
                  { title: 'users', href: '/users' },
                  {
                    title: 'github',
                    href: 'https://github.com/pratikpakhale/march-assesment',
                  },
                ]}
              />
            </aside>
            <div className='flex-1 lg:max-w-full'>{children}</div>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
