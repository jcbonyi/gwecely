/**
 * Navbar auth controls — Clerk sign-in, sign-up, user menu
 */

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'wouter';
import { isClerkConfigured } from '@/lib/clerk';

export default function NavbarAuth() {
  if (!isClerkConfigured) return null;

  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <SignInButton mode="redirect" forceRedirectUrl="/sign-in">
          <button
            type="button"
            className="hidden sm:inline-flex px-3 py-2 text-white/90 hover:text-white font-['Inter'] text-sm font-medium transition-colors rounded-md hover:bg-white/10"
          >
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="redirect" forceRedirectUrl="/sign-up">
          <button
            type="button"
            className="hidden sm:inline-flex btn-gwecely text-xs py-2 px-3"
          >
            Sign up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <Link
          href="/admin/products"
          className="hidden sm:inline-flex px-3 py-2 text-orange-100 hover:text-white font-['Inter'] text-xs font-medium transition-colors rounded-md hover:bg-white/10"
        >
          Admin
        </Link>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'w-9 h-9',
            },
          }}
        />
      </SignedIn>
    </div>
  );
}

export function MobileNavbarAuth({ onNavigate }: { onNavigate?: () => void }) {
  if (!isClerkConfigured) return null;

  return (
    <div className="pt-3 border-t border-white/10 space-y-2">
      <SignedOut>
        <SignInButton mode="redirect" forceRedirectUrl="/sign-in">
          <button
            type="button"
            onClick={onNavigate}
            className="w-full px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-['Inter'] text-base font-medium min-h-[48px]"
          >
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="redirect" forceRedirectUrl="/sign-up">
          <button
            type="button"
            onClick={onNavigate}
            className="btn-gwecely w-full justify-center text-sm py-3"
          >
            Sign up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <Link
          href="/admin/products"
          onClick={onNavigate}
          className="block px-4 py-3.5 text-orange-100 hover:text-white hover:bg-white/10 rounded-lg font-['Inter'] text-base min-h-[48px]"
        >
          Admin catalog
        </Link>
        <div className="px-4 py-2 flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <span className="text-orange-100 text-sm font-['Inter']">Your account</span>
        </div>
      </SignedIn>
    </div>
  );
}
