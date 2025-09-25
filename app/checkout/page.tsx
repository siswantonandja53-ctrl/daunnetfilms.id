import Link from "next/link";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#1F0528] px-4 py-24">
      <div className="max-w-md w-full bg-gradient-to-b from-[#2D0B00] to-[#1F0528] rounded-2xl border-4 border-[#EE6028] shadow-2xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Checkout</h1>
        <p className="text-white/80 text-lg mb-8 text-center">
          Terima kasih telah memilih paket <span className="font-bold text-[#EE6028]">ADVANCE</span>! Silakan isi data berikut untuk melanjutkan pembayaran.
        </p>
        <CheckoutForm />
        <Link href="/" className="text-[#EE6028] underline text-sm mt-4">Kembali ke Beranda</Link>
      </div>
    </main>
  );
}
