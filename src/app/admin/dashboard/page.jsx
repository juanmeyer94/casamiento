"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardAdmin from "@/components/Modulos/DashboardAdmin";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto" />

          <p className="mt-4 text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Se redirigirá al login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con logout */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Bienvenido,
                {session.user?.name}
              </h1>
              <p className="text-sm text-gray-600">Panel de Administración</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              type="button"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <DashboardAdmin />
    </div>
  );
}
