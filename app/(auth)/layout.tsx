import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/actions/auth.action';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  try {
    const isUserAuthenticated = await isAuthenticated();
    
    if (isUserAuthenticated) {
      redirect('/');
    }

    return (
      <main className="auth-layout min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Authentication check failed:', error);
    // Optionally redirect to error page or return error UI
    return (
      <div className="auth-error text-center p-8">
        <h2>Authentication Service Unavailable</h2>
        <p>Please try again later</p>
      </div>
    );
  }
};

export default AuthLayout;