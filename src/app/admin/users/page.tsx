"use client";

import React, { useState, useEffect } from "react";
import { adminGetUsersAction, adminToggleUserRoleAction } from "@/app/actions/adminActions";
import { Users, Search, ToggleLeft, ToggleRight, Calendar, Mail, Phone, CheckCircle, AlertTriangle } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    try {
      const list = await adminGetUsersAction();
      setUsers(list);
    } catch (err: any) {
      setErrorMsg("Failed to load user accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleRole = async (userId: string, userName: string, currentRole: string) => {
    const confirmation = confirm(
      `Are you sure you want to change ${userName}'s role from ${currentRole} to ${
        currentRole === "admin" ? "customer" : "admin"
      }?`
    );

    if (confirmation) {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");
      try {
        const res = await adminToggleUserRoleAction(userId);
        if (res.success) {
          setSuccessMsg(res.message || "User role updated successfully.");
          await loadUsers();
        } else {
          setErrorMsg(res.message || "Failed to update user role.");
          setLoading(false);
        }
      } catch (err: any) {
        setErrorMsg("Failed to change user role.");
        setLoading(false);
      }
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 text-xs">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-darkText">Customer & Accounts Console</h1>
        <p className="text-gray-500">View registered user accounts, moderate profiles, and configure access permissions.</p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold">
          ⚠️ {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-3 bg-green-50 border border-green-100 text-primary rounded-xl text-xs font-semibold">
          🌱 {successMsg}
        </div>
      )}

      {/* Control Actions & Search Bar */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search accounts by name or email address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-xs"
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading && users.length === 0 ? (
          <p className="text-gray-400 italic py-16 text-center">Loading user accounts...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-gray-400 italic py-16 text-center">No user accounts found matching query.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold bg-gray-50/50">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Contact Phone</th>
                  <th className="p-4 text-center">Role Status</th>
                  <th className="p-4 text-center">Verification Status</th>
                  <th className="p-4 text-center">Joined Date</th>
                  <th className="p-4 text-center">Toggle Admin Privileges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium text-darkText">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50/20">
                    <td className="p-4 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary-light text-primary font-bold flex items-center justify-center text-xs">
                        {u.name ? u.name.charAt(0).toUpperCase() : "?"}
                      </div>
                      <span className="font-bold text-darkText">{u.name}</span>
                    </td>
                    <td className="p-4 text-gray-600">
                      <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-300" /> {u.email}</span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {u.phone ? (
                        <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-300" /> {u.phone}</span>
                      ) : (
                        <span className="text-gray-400 italic">Not set</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        u.role === "admin"
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : "bg-gray-50 text-gray-600 border border-gray-100"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {u.isVerified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] text-green-600 bg-green-50 border border-green-100 font-bold uppercase">
                          <CheckCircle className="w-3 h-3 text-green-500" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] text-amber-600 bg-amber-50 border border-amber-100 font-bold uppercase">
                          <AlertTriangle className="w-3 h-3 text-amber-500" /> Unverified
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center text-gray-400">
                      <span className="flex items-center justify-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(u.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleRole(u._id, u.name, u.role)}
                        className={`p-1.5 rounded-lg transition-all ${
                          u.role === "admin"
                            ? "text-red-500 hover:bg-red-50"
                            : "text-primary hover:bg-primary-light"
                        }`}
                        title={u.role === "admin" ? "Remove Admin Privileges" : "Grant Admin Privileges"}
                      >
                        {u.role === "admin" ? (
                          <ToggleRight className="w-6 h-6 shrink-0" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 shrink-0" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
