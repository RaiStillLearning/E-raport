import Sidebar from "../components/Sidebar"; // ✅ HARUS ADA

export default function GuruLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* Ini mungkin salah */}
      <main className="flex-1 p-4 bg-gray-100">{children}</main>
    </div>
  );
}
