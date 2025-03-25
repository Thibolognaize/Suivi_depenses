'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);

    if (status === 'loading') return; // Do nothing while loading
    if(session) router.push('/')
    if (!session) router.push('/login');
  }, [router, session, status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return <>{session ? children : null}</>;
};

export default ProtectedRoute;
