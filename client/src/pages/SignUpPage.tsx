import { SignUp } from '@clerk/clerk-react';
import { Link } from 'wouter';
import BrandLogo from '@/components/BrandLogo';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#F5F3F2] flex flex-col">
      <header className="container py-6">
        <Link href="/">
          <BrandLogo size="nav" />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/"
        />
      </main>
    </div>
  );
}
