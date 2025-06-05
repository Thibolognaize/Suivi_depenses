'use client';

import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    signIn('azure-ad');
  };

  useEffect(() => {
    if (session) {
      router.push('/'); // Redirige vers la page principale après la connexion
    }
  }, [session, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6">Connexion</h2>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Se connecter avec Microsoft
        </button>
        {session && (
          <p className="m-4 text-green-600">
            Vous êtes connecté <span className="font-bold">{session.user?.name}</span> !
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
