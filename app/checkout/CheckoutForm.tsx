/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";

// Extend the Window interface to include 'snap'
declare global {
  interface Window {
    snap?: any;
  }
}

export default function CheckoutForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [fetchingUser, setFetchingUser] = useState(true);

  // Autofill user info from API
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await fetch("/api/user-info");
        if (!res.ok) return;
        const data = await res.json();
        if (data.name || data.email || data.whatsapp) {
          setForm((prev) => ({
            ...prev,
            name: data.name || prev.name,
            email: data.email || prev.email,
            whatsapp: data.whatsapp || prev.whatsapp,
          }));
        }
      } finally {
        setFetchingUser(false);
      }
    }
    fetchUserInfo();
  }, []);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  const [loading, setLoading] = useState(false);

  // Load Midtrans Snap.js
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("midtrans-script")) {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      // script.src = "https://app.midtrans.com/snap/snap.js";
      script.id = "midtrans-script";
      script.setAttribute("data-client-key",
        process.env.MIDTRANS_CLIENT_KEY || ""
      );
      document.body.appendChild(script);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.whatsapp) {
      setError("Semua data wajib diisi.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Call API to get snapToken
      const res = await fetch("/api/checkout-midtrans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: 350000 }),
      });
      const data = await res.json();
      if (!res.ok || !data.snapToken) {
        setError(data.error || "Gagal memproses pembayaran.");
        setLoading(false);
        return;
      }
      // Open Snap popup
      function openSnap() {
        if (window.snap) {
          window.snap.pay(data.snapToken, {
            onSuccess: function () { setSuccess(true); setLoading(false); },
            onPending: function () { setSuccess(true); setLoading(false); },
            onError: function () { setError("Pembayaran gagal atau dibatalkan."); setLoading(false); },
            onClose: function () { setLoading(false); },
          });
        } else {
          setTimeout(openSnap, 300);
        }
      }
      openSnap();
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan server.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-green-400 text-center mb-4">Data berhasil dikirim! Silakan cek WhatsApp/email untuk instruksi pembayaran.</div>
    );
  }

  if (fetchingUser) {
    return (
      <div className="w-full flex flex-col gap-4 animate-pulse">
        <div className="h-10 bg-[#2D0B00] rounded-lg mb-2" />
        <div className="h-10 bg-[#2D0B00] rounded-lg mb-2" />
        <div className="h-10 bg-[#2D0B00] rounded-lg mb-2" />
        <div className="h-12 bg-gradient-to-b from-[#D44C02] to-[#E67A11] rounded-lg mt-2" />
      </div>
    );
  }

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-white font-semibold mb-1">Nama Lengkap</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-[#2D0B00] border border-[#EE6028] text-white focus:outline-none focus:ring-2 focus:ring-[#EE6028]"
          placeholder="Nama sesuai KTP"
          required
        />
      </div>
      <div>
        <label className="block text-white font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-[#2D0B00] border border-[#EE6028] text-white focus:outline-none focus:ring-2 focus:ring-[#EE6028]"
          placeholder="Alamat email aktif"
          required
        />
      </div>
      <div>
        <label className="block text-white font-semibold mb-1">No. WhatsApp</label>
        <input
          type="tel"
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-[#2D0B00] border border-[#EE6028] text-white focus:outline-none focus:ring-2 focus:ring-[#EE6028]"
          placeholder="08xxxxxxxxxx"
          required
        />
      </div>
      {/* Metode Pembayaran dihilangkan, default transfer */}
      {error && <div className="text-red-400 text-sm text-center">{error}</div>}
      <button
        type="submit"
        className="inline-block px-6 py-2 rounded-lg bg-gradient-to-b from-[#D44C02] to-[#E67A11] text-white font-semibold text-lg shadow-lg hover:brightness-110 transition w-full text-center mt-2 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Memproses..." : "Gabung Sekarang"}
      </button>
    </form>
  );
}
