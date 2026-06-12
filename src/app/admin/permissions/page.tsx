"use client";

import { useState } from "react";
import { Search, Shield, FileText, Database, Image, Newspaper, Briefcase, TrendingUp, Handshake, BarChart2, Key } from "lucide-react";

type RoleKey = "super_admin" | "moderator" | "startup_owner" | "investor" | "viewer";
type PermKey = "view" | "create" | "edit" | "delete";

const ROLES: { key: RoleKey; label: string; color: string }[] = [
  { key: "super_admin", label: "Super Admin", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  { key: "moderator", label: "Moderator", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { key: "startup_owner", label: "Startup Owner", color: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  { key: "investor", label: "Investor", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { key: "viewer", label: "Viewer", color: "bg-card-hover text-muted border-border" },
];

const MODULES = [
  { name: "Dashboard", icon: BarChart2 },
  { name: "Content", icon: FileText },
  { name: "News", icon: Newspaper },
  { name: "Startups", icon: TrendingUp },
  { name: "Investors", icon: TrendingUp },
  { name: "Partners", icon: Handshake },
  { name: "Careers", icon: Briefcase },
  { name: "Media", icon: Image },
  { name: "SEO", icon: FileText },
  { name: "Analytics", icon: BarChart2 },
  { name: "Roles", icon: Shield },
  { name: "Permissions", icon: Key },
  { name: "Logs", icon: Database },
  { name: "Backup", icon: Database },
];

const PERMS: PermKey[] = ["view", "create", "edit", "delete"];

type Matrix = Record<RoleKey, Record<string, Record<PermKey, boolean>>>;

function buildMatrix(): Matrix {
  const result = {} as Matrix;
  for (const role of ROLES) {
    result[role.key] = {};
    for (const mod of MODULES) {
      if (role.key === "super_admin") {
        result[role.key][mod.name] = { view: true, create: true, edit: true, delete: true };
      } else if (role.key === "moderator") {
        result[role.key][mod.name] = { view: true, create: mod.name !== "Backup" && mod.name !== "Logs", edit: mod.name !== "Backup", delete: ["News", "Media", "Content"].includes(mod.name) };
      } else if (role.key === "startup_owner") {
        result[role.key][mod.name] = { view: ["Dashboard", "Startups", "News", "Careers"].includes(mod.name), create: mod.name === "Startups", edit: mod.name === "Startups", delete: false };
      } else if (role.key === "investor") {
        result[role.key][mod.name] = { view: ["Dashboard", "Startups", "Investors", "News"].includes(mod.name), create: false, edit: mod.name === "Investors", delete: false };
      } else {
        result[role.key][mod.name] = { view: true, create: false, edit: false, delete: false };
      }
    }
  }
  return result;
}

export default function AdminPermissions() {
  const [matrix, setMatrix] = useState<Matrix>(buildMatrix);
  const [selectedRole, setSelectedRole] = useState<RoleKey>("super_admin");
  const [search, setSearch] = useState("");

  const filteredModules = MODULES.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  function toggle(module: string, perm: PermKey) {
    if (selectedRole === "super_admin") return; // super_admin always has all
    setMatrix((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [module]: {
          ...prev[selectedRole][module],
          [perm]: !prev[selectedRole][module][perm],
        },
      },
    }));
  }

  const rolePerms = matrix[selectedRole];
  const selectedRoleData = ROLES.find((r) => r.key === selectedRole)!;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Permissions</h1>
          <p className="mt-1 text-[13px] text-muted">Granular permission control for every role and module.</p>
        </div>
        <button className="rounded-xl bg-accent px-4 py-2.5 text-[13px] font-semibold text-black hover:bg-accent-dark">Save Changes</button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input type="text" placeholder="Search modules..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-40 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
          {ROLES.map((r) => (
            <button key={r.key} onClick={() => setSelectedRole(r.key)} className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${selectedRole === r.key ? "bg-accent/20 text-accent" : "text-muted hover:text-foreground"}`}>{r.label}</button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-border-subtle bg-card px-5 py-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${selectedRoleData.color}`}><Shield className="h-4 w-4" /></div>
        <span className="text-[14px] font-bold text-foreground">{selectedRoleData.label}</span>
        {selectedRole === "super_admin" && <span className="text-[12px] text-muted">— All permissions are locked ON for Super Admin</span>}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4">Module</th>
              {PERMS.map((p) => (
                <th key={p} className="px-6 py-4 text-center capitalize">{p}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredModules.map((mod) => {
              const perms = rolePerms[mod.name] ?? { view: false, create: false, edit: false, delete: false };
              return (
                <tr key={mod.name} className="text-[13px] transition-colors hover:bg-card">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted"><mod.icon className="h-4 w-4" /></div>
                      <span className="font-medium text-foreground">{mod.name}</span>
                    </div>
                  </td>
                  {PERMS.map((perm) => (
                    <td key={perm} className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggle(mod.name, perm)}
                        disabled={selectedRole === "super_admin"}
                        className={`h-5 w-5 rounded border transition-all ${perms[perm] ? "border-emerald-400/50 bg-emerald-400/20" : "border-border bg-card"} ${selectedRole !== "super_admin" ? "cursor-pointer hover:border-accent/40" : "cursor-default opacity-60"}`}
                      >
                        {perms[perm] && <span className="block h-full w-full rounded text-[10px] leading-5 text-emerald-400">✓</span>}
                      </button>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
