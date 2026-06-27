import { useAuth } from '@clerk/clerk-react';
import { useCallback, useEffect, useState } from 'react';
import type { AdminSession } from '@shared/admin';
import { adminFetch } from '@/lib/adminFetch';

export function useAdminSession() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [checking, setChecking] = useState(true);
  const [denied, setDenied] = useState(false);

  const refresh = useCallback(async () => {
    if (!isSignedIn) {
      setSession(null);
      setDenied(false);
      setChecking(false);
      return;
    }
    setChecking(true);
    try {
      const token = await getToken();
      if (!token) {
        setDenied(true);
        setSession(null);
        return;
      }
      const data = (await adminFetch('/api/admin/me', token)) as AdminSession;
      setSession(data);
      setDenied(false);
    } catch {
      setSession(null);
      setDenied(true);
    } finally {
      setChecking(false);
    }
  }, [getToken, isSignedIn]);

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
  };
}
