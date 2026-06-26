import { ClerkProvider } from '@clerk/clerk-react';
import { shadcn } from '@clerk/ui/themes';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;

if (!publishableKey) {
  console.warn(
    'VITE_CLERK_PUBLISHABLE_KEY is not set. Add it to .env — run `clerk auth login` then `clerk env pull` after linking the app.'
  );
}

createRoot(document.getElementById('root')!).render(
  publishableKey ? (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{ theme: shadcn }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignOutUrl="/"
    >
      <App />
    </ClerkProvider>
  ) : (
    <App />
  )
);
