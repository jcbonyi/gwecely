import { SignIn } from '@clerk/clerk-react';
import { Link } from 'wouter';
import BrandLogo from '@/components/BrandLogo';
import { isClerkConfigured } from '@/lib/clerk';

export default function SignInPage() {
  if (!isClerkConfigured) {
    return (
      <div className="min-h-screen bg-[#F5F3F2] flex flex-col items-center justify-center px-4">
        <p className="text-gray-600 font-['Inter'] text-sm text-center">
          Sign-in is unavailable. Configure <code className="text-xs bg-gray-100 px-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code>{' '}
          on the server and redeploy.
        </p>
        <Link href="/" className="mt-4 text-[#F05A32] font-['Inter'] text-sm hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3F2] flex flex-col">
      <header className="container py-6">
        <Link href="/">
          <BrandLogo size="nav" />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/"
        />
      </main>
    </div>
  );
}
