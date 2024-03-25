// The root page/landing page of the application.

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LandingPage = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push('/home');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen">
        <span className="inline-block rounded-full font-bold italic p-14 text-6xl bg-sky-600 text-white animate-pulse">
          JET.AI
          <i className="fa-solid fa-plane fa-2xl pl-10"></i>
        </span>
      </div>
    </>
  );
};

export default LandingPage;
