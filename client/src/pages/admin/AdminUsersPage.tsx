import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Loader2, UserPlus, Users } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminSession } from '@/hooks/useAdminSession';
import { fetchAdminUsers, inviteAdminUser, removeAdminUser } from '@/lib/adminApi';
import type { AdminUserRecord } from '@shared/admin';
import { Redirect } from 'wouter';

export default function AdminUsersPage() {
  const { getToken } = useAuth();
  const { isOwner, checking } = useAdminSession();
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [inviting, setInviting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) throw new Error('Not signed in');
      setUsers(await fetchAdminUsers(token));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to load team');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checking && isOwner) void load();
  }, [checking, isOwner]);

  if (!checking && !isOwner) {
    return <Redirect to="/admin/products" />;
  }

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setInviting(true);
    try {
      const token = await getToken();
      if (!token) throw new Error('Not signed in');
      await inviteAdminUser(token, trimmed);
      toast.success(`Invitation sent to ${trimmed}`);
      setEmail('');
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Invite failed');
    } finally {
      setInviting(false);
    }
  };

  const handleRemove = async (targetEmail: string) => {
    if (!confirm(`Remove access for ${targetEmail}?`)) return;
    try {
      const token = await getToken();
      if (!token) throw new Error('Not signed in');
      await removeAdminUser(token, targetEmail);
      toast.success('User removed');
      setUsers((prev) => prev.filter((u) => u.email !== targetEmail));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Remove failed');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-[#F05A32]" size={28} />
          <div>
            <h1 className="font-['Barlow_Condensed'] font-800 text-3xl text-[#2D2626]">Team access</h1>
            <p className="text-gray-500 text-sm font-['Inter']">Invite staff to add and edit products</p>
          </div>
        </div>

        <form onSubmit={(e) => void handleInvite(e)} className="bg-white rounded-xl border border-gray-100 p-5 mb-6 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">Invite by email</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#F05A32]"
              required
            />
            <button type="submit" disabled={inviting} className="btn-gwecely text-sm py-2.5 px-5 justify-center">
              {inviting ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
              Send invite
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            They receive a Clerk sign-up email, then can manage products in Admin.
          </p>
        </form>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-gray-500">Loading team…</p>
          ) : (
            <table className="w-full text-sm font-['Inter']">
              <thead className="bg-[#F5F3F2] text-left text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-t border-gray-100">
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 capitalize text-gray-600">
                      {u.role}
                      {u.source === 'env' && <span className="ml-2 text-xs text-gray-400">(owner)</span>}
                    </td>
                    <td className="p-3 text-right">
                      {u.source === 'database' ? (
                        <button
                          type="button"
                          onClick={() => void handleRemove(u.email)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
