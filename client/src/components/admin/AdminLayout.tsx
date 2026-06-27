import { Link, useLocation } from 'wouter';
import { SignedIn, SignedOut, UserButton, useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import BrandLogo from '@/components/BrandLogo';
import { BRAND } from '@/lib/brand';
import { isClerkConfigured } from '@/lib/clerk';
import { warmAdminApi } from '@/lib/adminApi';

function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  const allowed = (import.meta.env.VITE_CLERK_ADMIN_EMAILS ?? import.meta.env.CLERK_ADMIN_EMAILS ?? '')
    .split(',')
    .map((e: string) => e.trim().toLowerCase())
    .filter(Boolean);
  // If not configured client-side, allow signed-in users (server still enforces)
  if (allowed.length === 0) return true;
  return allowed.includes(email.toLowerCase());
}

function ClerkNotConfigured() {
  return (
    <div className="min-h-screen bg-[#F5F3F2] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-['Barlow_Condensed'] font-800 text-3xl text-[#2D2626] mb-3">Auth not configured</h1>
        <p className="text-gray-600 font-['Inter'] text-sm">
          Set <code className="text-xs bg-gray-100 px-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code> in your deployment
          environment and redeploy.
        </p>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured) return <ClerkNotConfigured />;

  return <AdminLayoutInner>{children}</AdminLayoutInner>;
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [location] = useLocation();
  const email = user?.primaryEmailAddress?.emailAddress;
  const isAdmin = isAdminEmail(email);

  useEffect(() => {
    if (!isLoaded || !isAdmin) return;
    void getToken().then((token) => {
      if (token) warmAdminApi(token);
    });
  }, [isLoaded, isAdmin, getToken]);

  return (
    <div className="min-h-screen bg-[#F5F3F2]">
      <header className="bg-[#463C3C] text-white border-b border-white/10">
        <div className="container flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-6 min-w-0">
            <Link href="/" className="flex-shrink-0">
              <BrandLogo size="nav" />
            </Link>
            <nav className="hidden sm:flex items-center gap-1">
              <Link
                href="/admin/products"
                className={`px-3 py-2 rounded-md text-sm font-['Inter'] ${
                  location.startsWith('/admin/products') ? 'bg-white/15 text-white' : 'text-orange-100 hover:text-white'
                }`}
              >
                Products
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-orange-100 hover:text-white text-sm font-['Inter'] hidden sm:inline">
              View site
            </Link>
            <SignedOut>
              <Link href="/sign-in" className="btn-gwecely text-xs py-2 px-4">
                Sign in
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="container py-8">
            <SignedOut>
              <div className="max-w-md mx-auto text-center py-16">
                <h1 className="font-['Barlow_Condensed'] font-800 text-3xl text-[#2D2626] mb-3">Admin Sign In</h1>
                <p className="text-gray-600 font-['Inter'] text-sm mb-6">
                  Sign in with an authorized {BRAND.legalName} account to manage the product catalog.
                </p>
                <Link href="/sign-in" className="btn-gwecely inline-flex">
                  Go to sign in
                </Link>
              </div>
            </SignedOut>

        <SignedIn>
          {!isLoaded ? (
            <p className="text-gray-500 font-['Inter'] text-sm">Loading…</p>
          ) : !isAdmin ? (
            <div className="max-w-lg mx-auto bg-white rounded-xl border border-red-200 p-6 text-center">
              <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-2">Access denied</h2>
              <p className="text-gray-600 text-sm font-['Inter']">
                <strong>{email}</strong> is not authorized. Contact the site owner to add your email to{' '}
                <code className="text-xs bg-gray-100 px-1 rounded">CLERK_ADMIN_EMAILS</code>.
              </p>
            </div>
          ) : (
            children
          )}
        </SignedIn>
      </main>
    </div>
  );
}
