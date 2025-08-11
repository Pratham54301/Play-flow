
import { ReactNode } from 'react';

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex justify-center items-start min-h-[calc(100vh-4rem)] p-4 md:p-8">
       <div className="w-full max-w-4xl">
        {children}
      </div>
    </main>
  );
}
