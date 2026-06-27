import { useAuth, useUser } from '@clerk/clerk-react';
import { useCallback, useEffect, useState } from 'react';
import type { AdminSession } from '@shared/admin';
import { adminFetch } from '@/lib/adminFetch';

function clientOwnerEmails(): string[] {
  return (import.meta.env.VITE_CLERK_ADMIN_EMAILS ?? '')
    .split(',')
    .map((e: string) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function useAdminSession() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [checking, setChecking] = useState(true);
  const [denied, setDenied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isSignedIn) {
      setSession(null);
      setDenied(false);
      setErrorMessage(null);
      setChecking(false);
      return;
    }
    setChecking(true);
    try {
      const token = await getToken();
      if (!token) {
        setDenied(true);
        setSession(null);
        setErrorMessage('Not signed in');
        return;
      }
      const data = (await adminFetch('/api/admin/me', token)) as AdminSession;
      setSession(data);
      setDenied(false);
      setErrorMessage(null);
    } catch (e) {
      const ownerEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
      const owners = clientOwnerEmails();
      if (ownerEmail && owners.length > 0 && owners.includes(ownerEmail)) {
        setSession({ email: ownerEmail, role: 'owner' });
        setDenied(false);
        setErrorMessage(null);
        return;
      }
      setSession(null);
      setDenied(true);
      setErrorMessage(e instanceof Error ? e.message : 'Access denied');
    } finally {
      setChecking(false);
    }
  }, [getToken, isSignedIn, user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    if (!isLoaded) return;
    void refresh();
  }, [isLoaded, refresh]);

  return {
    session,
    checking: !isLoaded || checking,
    denied,
    isAdmin: Boolean(session),
    isOwner: session?.role === 'owner',
    refresh,
    errorMessage,
  };
}
