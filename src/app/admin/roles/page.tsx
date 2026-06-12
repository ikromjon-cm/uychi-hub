"use client";

import { useState } from "react";
import { Search, Shield } from "lucide-react";

type UserRole = 'super_admin' | 'moderator' | 'startup_owner' | 'investor' | 'viewer';
type Status = 'active' | 'inactive' | 'pending' | 'banned';
interface AdminUser { id: number; name: string; email: string; role: UserRole; status: Status; avatar: string; joined: string; lastLogin: string; startupName?: string; }

const ADMIN_USERS: AdminUser[] = [
  { id: 1, name: 'Nodira Yusupova', email: 'nodira@uychi.uz', role: 'super_admin', status: 'active', avatar: 'N', joined: '2023-01-15', lastLogin: '2026-06-11' },
  { id: 2, name: 'Sardor Mirzayev', email: 'sardor@uychi.uz', role: 'moderator', status: 'active', avatar: 'S', joined: '2023-03-20', lastLogin: '2026-06-10' },
  { id: 3, name: 'Alisher Toshmatov', email: 'alisher@agrosmartai.uz', role: 'startup_owner', status: 'active', avatar: 'A', joined: '2023-05-01', lastLogin: '2026-06-09', startupName: 'AgroSmart AI' },
  { id: 4, name: 'Dilorom Karimova', email: 'dilorom@educore.uz', role: 'startup_owner', status: 'active', avatar: 'D', joined: '2023-06-15', lastLogin: '2026-06-08', startupName: 'EduCore UZ' },
  { id: 5, name: 'Jasur Nazarov', email: 'jasur@namlogist.uz', role: 'startup_owner', status: 'pending', avatar: 'J', joined: '2024-01-10', lastLogin: '2026-06-07', startupName: 'NamLogist' },
  { id: 6, name: 'Robert Kim', email: 'r.kim@adb.org', role: 'investor', status: 'active', avatar: 'R', joined: '2024-02-20', lastLogin: '2026-06-06' },
  { id: 7, name: 'Sarah Johnson', email: 's.johnson@techstars.com', role: 'investor', status: 'active', avatar: 'S', joined: '2024-03-05', lastLogin: '2026-06-05' },
  { id: 8, name: 'Murod Xoliqov', email: 'murod@student.uz', role: 'viewer', status: 'active', avatar: 'M', joined: '2024-04-01', lastLogin: '2026-06-04' },
  { id: 9, name: 'Zulfiya Rahimova', email: 'zulfiya@uychi.uz', role: 'moderator', status: 'active', avatar: 'Z', joined: '2023-08-12', lastLogin: '2026-06-03' },
  { id: 10, name: 'Botir Askarov', email: 'botir@textileai.uz', role: 'startup_owner', status: 'inactive', avatar: 'B', joined: '2024-05-10', lastLogin: '2026-05-20', startupName: 'TextileAI' },
];

const roleColors: Record<UserRole, string> = {
  super_admin: "bg-red-500/10 text-red-400 border-red-500/20",
  moderator: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  startup_owner: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  investor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  viewer: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: ["All permissions — full access to every module"],
  moderator: ["View & edit content, news, startups", "Manage users (no delete)", "View analytics"],
  startup_owner: ["View own startup profile", "Edit own applications", "View news & events"],
  investor: ["View startup listings", "View investor portal", "Contact founders"],
  viewer: ["View-only access to public admin pages"],
};

const ALL_ROLES: UserRole[] = ["super_admin", "moderator", "startup_owner", "investor", "viewer"];

export default function AdminRoles() {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  function changeRole(id: number, role: UserRole) {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role } : u));
  }

  const roleCount = (role: UserRole) => users.filter((u) => u.role === role).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Roles</h1>
          <p className="mt-1 text-[13px] text-zinc-600">Assign and manage role-based access for all users.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-5">
        {ALL_ROLES.map((role) => (
          <div key={role} className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-4 text-center">
            <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl border ${roleColors[role]}`}>
              <Shield className="h-5 w-5" />
            </div>
            <p className="text-lg font-bold text-white">{roleCount(role)}</p>
            <p className="mt-0.5 text-[11px] capitalize text-zinc-600">{role.replace("_", " ")}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 rounded-xl border border-white/6 bg-white/2 px-3 py-2 w-fit">
            <Search className="h-4 w-4 text-zinc-600" />
            <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48 bg-transparent text-[13px] text-white outline-none placeholder:text-zinc-600" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Current Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Change Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {filtered.map((user) => (
                  <tr key={user.id} className="text-[13px] transition-colors hover:bg-white/2">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[13px] font-bold ${roleColors[user.role]}`}>{user.avatar}</div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-[12px] text-zinc-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize tracking-wider ${roleColors[user.role]}`}>{user.role.replace("_", " ")}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-[12px] ${user.status === "active" ? "text-emerald-400" : "text-yellow-400"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${user.status === "active" ? "bg-emerald-400" : "bg-yellow-400"}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => changeRole(user.id, e.target.value as UserRole)}
                        className="appearance-none rounded-lg border border-white/6 bg-white/2 px-3 py-1.5 text-[12px] text-zinc-400 outline-none transition-colors hover:border-white/10 focus:border-cyan-500/40"
                      >
                        {ALL_ROLES.map((r) => (
                          <option key={r} value={r}>{r.replace("_", " ")}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-[14px] font-bold text-white">Role Permissions</h2>
          {ALL_ROLES.map((role) => (
            <div key={role} className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${roleColors[role]}`}>
                  <Shield className="h-3.5 w-3.5" />
                </div>
                <span className="text-[13px] font-bold capitalize text-white">{role.replace("_", " ")}</span>
                <span className="ml-auto text-[11px] text-zinc-600">{roleCount(role)} users</span>
              </div>
              <ul className="space-y-1">
                {ROLE_PERMISSIONS[role].map((perm) => (
                  <li key={perm} className="text-[12px] text-zinc-500">• {perm}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
