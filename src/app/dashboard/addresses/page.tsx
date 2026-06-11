"use client";

import React, { useState, useEffect } from "react";
import { getCurrentUserAction } from "@/app/actions/authActions";
import { addAddressAction, deleteAddressAction, setDefaultAddressAction } from "@/app/actions/orderActions";
import { MapPin, Plus, Trash2, Check, User, Phone } from "lucide-react";

export default function DashboardAddressesPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const loadUser = async () => {
    setLoading(true);
    const currentUser = await getCurrentUserAction();
    setUser(currentUser);
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!newAddress.name || !newAddress.phone || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postalCode) {
      setErrorMsg("All address fields are required.");
      return;
    }

    setLoading(true);
    const res = await addAddressAction(newAddress);
    if (res.success) {
      await loadUser();
      setShowForm(false);
      setNewAddress({
        label: "Home",
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
      });
    } else {
      setErrorMsg(res.message || "Failed to save address.");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteAddressAction(id);
    await loadUser();
  };

  const handleSetDefault = async (id: string) => {
    setLoading(true);
    await setDefaultAddressAction(id);
    await loadUser();
  };

  if (loading && !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center text-xs text-gray-500 bg-white border border-gray-100 rounded-3xl">
        Loading saved addresses...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-50 pb-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-darkText">Saved Addresses</h2>
          <p className="text-xs text-gray-500 mt-1">Configure your default shipping coordinates.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline bg-primary-light px-3.5 py-2 rounded-full"
          >
            <Plus className="w-3.5 h-3.5" /> Add New
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Address Create Form */}
      {showForm && (
        <form onSubmit={handleAddAddress} className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Address Label</label>
              <input
                type="text"
                placeholder="Home, Office, Work..."
                value={newAddress.label}
                onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Recipient Name</label>
              <input
                type="text"
                placeholder="Recipient Name"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="10-digit number"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-700">PIN / Postal Code</label>
              <input
                type="text"
                placeholder="PIN Code"
                value={newAddress.postalCode}
                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Street / Area Address</label>
            <input
              type="text"
              placeholder="House, building number, area, landmark"
              value={newAddress.street}
              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">City</label>
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-700">State</label>
              <input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white hover:bg-primary-dark rounded-full font-bold"
            >
              Save Address
            </button>
          </div>
        </form>
      )}

      {/* Address List */}
      {user?.addresses && user.addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.addresses.map((addr: any) => (
            <div
              key={addr._id}
              className={`p-5 rounded-2xl border flex flex-col justify-between h-48 relative transition-all ${
                addr.isDefault
                  ? "border-primary bg-primary-light/10 shadow-sm"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider text-primary bg-primary-light px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Default
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-darkText flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" /> {addr.name}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" /> {addr.phone}
                </p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">
                  {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100/50 text-[11px] font-bold">
                {!addr.isDefault ? (
                  <button
                    onClick={() => handleSetDefault(addr._id)}
                    className="text-primary hover:underline"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-gray-400">Default Address</span>
                )}
                
                <button
                  onClick={() => handleDelete(addr._id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        !showForm && (
          <div className="text-center py-16 space-y-4 text-xs text-gray-400 border border-dashed border-gray-200 rounded-2xl">
            <MapPin className="w-10 h-10 mx-auto text-gray-300" />
            <p>You have no saved addresses yet.</p>
          </div>
        )
      )}

    </div>
  );
}
