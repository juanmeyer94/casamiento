"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardAdmin from "@/components/Modulos/DashboardAdmin";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está autenticado como admin
    const isLoggedIn = localStorage.getItem("admin_authenticated");
    const username = localStorage.getItem("admin_username");
    if (isLoggedIn === "true" && username) {
      setIsAuthenticated(true);
      setAdminUsername(username);
    } else {
      // No está autenticado, redirigir al login
      router.push("/admin/login");
      return;
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    // Limpiar localStorage y redirigir al login
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_username");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto" />
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
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
                {" "}
                <span className="text-rose-500">{adminUsername}</span>
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
