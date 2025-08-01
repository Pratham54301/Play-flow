
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import NavigationBar from '@/components/navigation-bar';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'PlayFlow - eSports Platform',
  description: 'The ultimate platform for eSports payments and tournaments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col bg-background">
            <NavigationBar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
